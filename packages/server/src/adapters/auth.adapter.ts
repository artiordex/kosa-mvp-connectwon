import type { Id, User } from '@connectwon/core/core-types.js';
import type { AuthResult, AuthService, AuthUserSession, GoogleTokenPayload, JWTService, TokenPayload, UserRepository } from '@connectwon/core/ports/user.port.js';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { createClient } from 'redis';

// Redis 클라이언트 설정 개선
const redis = createClient({
  url: process.env['REDIS_URL'] || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: retries => Math.min(retries * 50, 1000),
    connectTimeout: 5000
  },
});

// Redis 연결 에러 핸들링
redis.on('error', err => {
  console.error('Redis Client Error:', err);
});

// 연결이 끊어지지 않았을 때만 연결 시도
if (!redis.isOpen) {
  await redis.connect();
}

const googleClient = new OAuth2Client(process.env['GOOGLE_CLIENT_ID']);

export class AuthRedisAdapter implements AuthService {
  constructor(
    private jwt: JWTService,
    private users: UserRepository,
  ) {}

  private sessionKey(userId: Id, sessionId: string): string {
    return `session:${userId}:${sessionId}`;
  }

  private userSessionsKey(userId: Id): string {
    return `user_sessions:${userId}`;
  }

  /** Google OAuth 로그인 */
  async authenticateWithGoogle(googleToken: string): Promise<AuthResult> {
    try {
      const payload = await this.verifyGoogleToken(googleToken);
      if (!payload) {
        return { success: false, error: 'invalid_google_token' };
      }

      // 이메일 인증 확인
      if (!payload.email_verified) {
        return { success: false, error: 'email_not_verified' };
      }

      let user = await this.users.findByGoogleSub(payload.sub);
      if (!user) {
        user = await this.users.findByEmail(payload.email);
        if (!user) {
          // 새 사용자 생성
          user = await this.users.create({
            email: payload.email,
            name: payload.name,
            preferences: {},
            googleSub: payload.sub,
            profileImageUrl: payload.picture,
          } as any);
        } else {
          // 기존 사용자에 Google Sub 연결
          user = await this.users.update(user.id, {
            googleSub: payload.sub,
            profileImageUrl: payload.picture,
          } as any);
        }
      }

      // 최근 로그인 시각 업데이트
      await this.users.updateLastLoginAt(user.id, new Date());

      const session = await this.createSession(user);
      return {
        success: true,
        user,
        session,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    } catch (error) {
      console.error('Google authentication error:', error);
      return { success: false, error: 'authentication_failed' };
    }
  }

 /** Google ID 토큰 검증 */
  async verifyGoogleToken(token: string): Promise<GoogleTokenPayload | null> {
    try {
      const clientId = process.env['GOOGLE_CLIENT_ID'];
      if (!clientId) {
        console.error('GOOGLE_CLIENT_ID environment variable is not set');
        return null;
      }

      const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: clientId,
      });

      const payload = ticket.getPayload();
      if (!payload) return null;

      const result: GoogleTokenPayload = {
        sub: payload.sub,
        email: payload.email!,
        name: payload.name!,
        email_verified: payload.email_verified!,
      };

      if (payload.picture) {
        result.picture = payload.picture;
      }

      return result;
    } catch (error) {
      console.error('Google token verification error:', error);
      return null;
    }
  }

  /** 사용자 등록 (비밀번호 포함) */
  async registerUser(userData: Partial<User> & { password?: string }): Promise<User> {
    try {
      // 이메일 중복 확인
      const existingUser = await this.users.findByEmail(userData.email!);
      if (existingUser) {
        throw new Error('email_already_exists');
      }

      const hashed = userData.password ? await bcrypt.hash(userData.password, 12) : undefined;

      const user = await this.users.create({
        email: userData.email!,
        name: userData.name || 'Unknown User',
        preferences: userData.preferences || {},
        passwordHash: hashed,
      } as any);

      return user;
    } catch (error) {
      console.error('User registration error:', error);
      throw error;
    }
  }

  /** 이메일+비밀번호 로그인 */
  async loginUser(email: string, password?: string): Promise<AuthResult> {
    try {
      const user = await this.users.findByEmail(email);
      if (!user) {
        return { success: false, error: 'user_not_found' };
      }

      const userWithPassword = user as any;
      if (!userWithPassword.passwordHash) {
        return { success: false, error: 'no_password_login' };
      }

      if (!password) {
        return { success: false, error: 'password_required' };
      }

      const valid = await bcrypt.compare(password, userWithPassword.passwordHash);
      if (!valid) {
        return { success: false, error: 'invalid_password' };
      }

      // 최근 로그인 시각 업데이트
      await this.users.updateLastLoginAt(user.id, new Date());

      const session = await this.createSession(user);
      return {
        success: true,
        user,
        session,
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      };
    } catch (error) {
      console.error('User login error:', error);
      return { success: false, error: 'login_failed' };
    }
  }

  /** 세션 생성 (Redis 저장) */
  async createSession(user: User): Promise<AuthUserSession> {
    try {
      const sessionId = crypto.randomUUID();
      const accessToken = await this.generateAccessToken(user);
      const refreshToken = await this.generateRefreshToken(user);

      const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1시간
      const session: AuthUserSession = {
        id: sessionId,
        userId: user.id,
        accessToken,
        refreshToken,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
      };

      // 세션 저장 (7일 TTL)
      await redis.set(this.sessionKey(user.id, sessionId), JSON.stringify(session), { EX: 60 * 60 * 24 * 7 });

      // 사용자별 세션 목록에 추가
      await redis.sAdd(this.userSessionsKey(user.id), sessionId);
      await redis.expire(this.userSessionsKey(user.id), 60 * 60 * 24 * 7);

      return session;
    } catch (error) {
      console.error('Session creation error:', error);
      throw new Error('session_creation_failed');
    }
  }

  /** 세션 검증 - 개선된 성능 */
  async verifySession(sessionToken: string): Promise<AuthUserSession | null> {
    try {
      // JWT 토큰에서 userId 추출하여 성능 개선
      const payload = await this.jwt.verify<TokenPayload>(sessionToken).catch(() => null);
      if (!payload) return null;

      const userSessionIds = await redis.sMembers(this.userSessionsKey(payload.userId));

      for (const sessionId of userSessionIds) {
        const sessionKey = this.sessionKey(payload.userId, sessionId);
        const raw = await redis.get(sessionKey);
        if (!raw) continue;

        const session = JSON.parse(raw) as AuthUserSession;
        if (session.accessToken === sessionToken || session.refreshToken === sessionToken) {
          // 세션이 만료되었는지 확인
          if (new Date() > new Date(session.expiresAt)) {
            await this.cleanupExpiredSession(payload.userId, sessionId);
            return null;
          }
          return session;
        }
      }

      return null;
    } catch (error) {
      console.error('Session verification error:', error);
      return null;
    }
  }

  /** 세션 갱신 */
  async refreshSession(refreshToken: string): Promise<AuthUserSession> {
    try {
      const session = await this.verifySession(refreshToken);
      if (!session) {
        throw new Error('invalid_refresh_token');
      }

      const user = await this.users.findById(session.userId);
      if (!user) {
        throw new Error('user_not_found');
      }

      // 기존 세션 삭제
      await this.revokeSession(refreshToken);

      // 새 세션 생성
      return await this.createSession(user);
    } catch (error) {
      console.error('Session refresh error:', error);
      throw error;
    }
  }

  /** 특정 세션 해제 */
  async revokeSession(sessionToken: string): Promise<void> {
    try {
      const session = await this.verifySession(sessionToken);
      if (!session) return;

      await this.cleanupExpiredSession(session.userId, session.id);
    } catch (error) {
      console.error('Session revocation error:', error);
    }
  }

  /** 사용자의 모든 세션 해제 */
  async revokeAllSessions(userId: Id): Promise<void> {
    try {
      const sessionIds = await redis.sMembers(this.userSessionsKey(userId));

      const pipeline = redis.multi();
      for (const sessionId of sessionIds) {
        pipeline.del(this.sessionKey(userId, sessionId));
      }
      pipeline.del(this.userSessionsKey(userId));

      await pipeline.exec();
    } catch (error) {
      console.error('All sessions revocation error:', error);
    }
  }

  /** 만료된 세션 정리 */
  private async cleanupExpiredSession(userId: Id, sessionId: string): Promise<void> {
    try {
      await redis.del(this.sessionKey(userId, sessionId));
      await redis.sRem(this.userSessionsKey(userId), sessionId);
    } catch (error) {
      console.error('Session cleanup error:', error);
    }
  }

  /** 액세스 토큰 생성 */
  async generateAccessToken(user: User): Promise<string> {
    return this.jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleFlags: user.roleFlags,
        type: 'access',
      },
      { expiresIn: '1h' },
    );
  }

  /** 리프레시 토큰 생성 */
  async generateRefreshToken(user: User): Promise<string> {
    return this.jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleFlags: user.roleFlags,
        type: 'refresh',
      },
      { expiresIn: '7d' },
    );
  }

  /** 액세스 토큰 검증 */
  async verifyAccessToken(token: string): Promise<TokenPayload | null> {
    try {
      const payload = await this.jwt.verify<TokenPayload & { type?: string }>(token);

      // 토큰 타입 검증
      if (payload.type && payload.type !== 'access') {
        return null;
      }

      return payload;
    } catch (error) {
      console.error('Access token verification error:', error);
      return null;
    }
  }

  /** 리프레시 토큰 검증 */
  async verifyRefreshToken(token: string): Promise<TokenPayload | null> {
    try {
      const payload = await this.jwt.verify<TokenPayload & { type?: string }>(token);

      // 토큰 타입 검증
      if (payload.type && payload.type !== 'refresh') {
        return null;
      }

      return payload;
    } catch (error) {
      console.error('Refresh token verification error:', error);
      return null;
    }
  }

  /** Redis 연결 상태 확인 */
  async isHealthy(): Promise<boolean> {
    try {
      await redis.ping();
      return true;
    } catch {
      return false;
    }
  }

  /** 리소스 정리 */
  async cleanup(): Promise<void> {
    try {
      await redis.quit();
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}
