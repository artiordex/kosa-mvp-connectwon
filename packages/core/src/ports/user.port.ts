/**
 * Description : user.port.ts - 📌 사용자/인증/활동 관리 포트
 * Author : Shiwoo Min
 * Date : 2025-09-29
 */
import type {
  CreateUser,
  CursorPaginatedResponse,
  CursorPaginationQuery,
  Id,
  ISODateTime,
  JsonObject,
  UpdateUser,
  User,
} from '../core-types.js';

/**
 * @description 사용자 저장소 포트
 */
export interface UserRepository {
  /** ID로 조회 */
  findById(id: Id): Promise<User | null>;
  /** 이메일로 조회 */
  findByEmail(email: string): Promise<User | null>;
  /** Google Sub로 조회 */
  findByGoogleSub(googleSub: string): Promise<User | null>;

  /** 신규 생성 */
  create(user: CreateUser): Promise<User>;
  /** 수정 */
  update(id: Id, updates: UpdateUser): Promise<User>;
  /** 삭제 */
  delete(id: Id): Promise<boolean>;

  /** 페이지네이션 조회 */
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;
  /** roleFlags 기준 조회 */
  findByRoleFlags(roleFlags: number, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;

  /** 최근 로그인 시각 업데이트 */
  updateLastLoginAt(id: Id, at: Date): Promise<void>;

  /** 존재 여부 확인 */
  exists(id: Id): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByGoogleSub(googleSub: string): Promise<boolean>;

  /** 통계 */
  count(): Promise<number>;
  countByRoleFlags(roleFlags: number): Promise<number>;
}

/**
 * @description 인증 서비스 포트
 */
export interface AuthService {
  authenticateWithGoogle(googleToken: string): Promise<AuthResult>;
  verifyGoogleToken(token: string): Promise<GoogleTokenPayload | null>;

  registerUser(userData: Partial<User>): Promise<User>;
  loginUser(email: string, password?: string): Promise<AuthResult>;

  createSession(user: User): Promise<AuthUserSession>;
  verifySession(sessionToken: string): Promise<AuthUserSession | null>;
  refreshSession(sessionToken: string): Promise<AuthUserSession>;
  revokeSession(sessionToken: string): Promise<void>;
  revokeAllSessions(userId: Id): Promise<void>;

  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<string>;
  verifyAccessToken(token: string): Promise<TokenPayload | null>;
  verifyRefreshToken(token: string): Promise<TokenPayload | null>;
}

/**
 * @description JWT 서비스 포트
 */
export interface JWTService {
  sign(payload: Record<string, unknown>, options?: JWTSignOptions): Promise<string>;
  verify<T = Record<string, unknown>>(token: string): Promise<T>;
  decode<T = Record<string, unknown>>(token: string): T | null;
}

/**
 * @description 사용자 활동 로그 엔터티
 */
export interface UserActivity {
  id: Id;
  userId: Id | null;
  action: string;
  entityType?: string;
  entityId?: Id;
  meta?: JsonObject;
  createdAt: ISODateTime;
}

/**
 * @description 사용자 활동 로그 저장소 포트
 */
export interface UserActivityRepository {
  /** 활동 기록 추가 */
  create(activity: Omit<UserActivity, 'id' | 'createdAt'>): Promise<UserActivity>;
  /** 사용자별 활동 조회 */
  findByUserId(userId: Id, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<UserActivity>>;
  /** 최근 N개 활동 조회 */
  findRecent(limit: number): Promise<UserActivity[]>;
  /** 통계 */
  countByUser(userId: Id): Promise<number>;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  session?: AuthUserSession;
  accessToken?: string;
  refreshToken?: string;
  error?: string;
}

export interface AuthUserSession {
  id: string;
  userId: Id;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  createdAt: string;
}

export interface TokenPayload {
  userId: Id;
  email: string;
  roleFlags: number;
  iat: number;
  exp: number;
  sessionId?: string;
}

export interface GoogleTokenPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
}

export interface JWTSignOptions {
  expiresIn?: string | number;
  audience?: string;
  issuer?: string;
  subject?: string;
  algorithm?: string;
}
