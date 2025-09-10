/**
 * Description : auth.ts - 📌 인증 서비스 포트 인터페이스
 * Author      : Shiwoo Min
 * Date        : 2025-09-10
 */
import type { CreateUser, Id, User } from '../../core-types.js';

// ============== 인증 서비스 포트 ==============

export interface AuthService {
  // Google OAuth 인증
  authenticateWithGoogle(googleToken: string): Promise<AuthResult>;
  verifyGoogleToken(token: string): Promise<GoogleTokenPayload | null>;

  // 이메일 인증
  sendVerificationCode(email: string, purpose: VerificationPurpose): Promise<void>;
  verifyCode(email: string, code: string, purpose: VerificationPurpose): Promise<boolean>;

  // 사용자 등록/로그인
  registerUser(userData: CreateUser): Promise<User>;
  loginUser(email: string): Promise<AuthResult>;

  // 세션 관리
  createSession(user: User): Promise<UserSession>;
  verifySession(sessionToken: string): Promise<UserSession | null>;
  refreshSession(sessionToken: string): Promise<UserSession>;
  revokeSession(sessionToken: string): Promise<void>;
  revokeAllSessions(userId: Id): Promise<void>;

  // 토큰 관리
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<string>;
  verifyAccessToken(token: string): Promise<TokenPayload | null>;
  verifyRefreshToken(token: string): Promise<TokenPayload | null>;

  // 보안 기능
  checkRateLimit(identifier: string, action: string): Promise<RateLimitResult>;
  logSecurityEvent(event: SecurityEvent): Promise<void>;

  // 사용자 상태 관리
  activateUser(userId: Id): Promise<void>;
  deactivateUser(userId: Id): Promise<void>;
  changeUserRole(userId: Id, roleFlags: number): Promise<void>;
}

// ============== JWT 서비스 포트 ==============

export interface JWTService {
  // 토큰 생성
  sign(payload: Record<string, unknown>, options?: JWTSignOptions): Promise<string>;

  // 토큰 검증
  verify<T = Record<string, unknown>>(token: string): Promise<T>;

  // 토큰 디코딩 (검증 없이)
  decode<T = Record<string, unknown>>(token: string): T | null;

  // 토큰 갱신
  refresh(refreshToken: string): Promise<TokenPair>;

  // 토큰 무효화
  revoke(token: string): Promise<void>;

  // 블랙리스트 확인
  isRevoked(token: string): Promise<boolean>;
}

// ============== 패스워드 서비스 포트 ==============

export interface PasswordService {
  // 해시 생성
  hash(password: string): Promise<string>;

  // 패스워드 검증
  verify(password: string, hash: string): Promise<boolean>;

  // 패스워드 강도 검사
  validateStrength(password: string): PasswordStrengthResult;

  // 임시 패스워드 생성
  generateTemporaryPassword(): string;
}

// ============== 2FA 서비스 포트 ==============

export interface TwoFactorService {
  // TOTP 설정
  generateTOTPSecret(userId: Id): Promise<TOTPSetup>;
  verifyTOTPSetup(userId: Id, secret: string, token: string): Promise<boolean>;
  enableTOTP(userId: Id, secret: string): Promise<string[]>; // 백업 코드 반환

  // TOTP 검증
  verifyTOTP(userId: Id, token: string): Promise<boolean>;

  // 백업 코드
  generateBackupCodes(userId: Id): Promise<string[]>;
  verifyBackupCode(userId: Id, code: string): Promise<boolean>;

  // 2FA 관리
  disable2FA(userId: Id): Promise<void>;
  get2FAStatus(userId: Id): Promise<TwoFactorStatus>;
}

// ============== 타입 정의 ==============

export interface AuthResult {
  success: boolean;
  user?: User;
  session?: UserSession;
  tokens?: TokenPair;
  error?: string;
  requiresVerification?: boolean;
}

export interface UserSession {
  id: string;
  userId: Id;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  createdAt: string;
  lastActivityAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
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

export type VerificationPurpose = 'signup' | 'login' | 'email_change' | 'password_reset';

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: string;
  retryAfter?: number;
}

export interface SecurityEvent {
  type: SecurityEventType;
  userId?: Id;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export type SecurityEventType =
  | 'login_success'
  | 'login_failure'
  | 'logout'
  | 'token_refresh'
  | 'password_change'
  | 'email_change'
  | 'role_change'
  | 'account_locked'
  | 'suspicious_activity'
  | '2fa_enabled'
  | '2fa_disabled';

export interface JWTSignOptions {
  expiresIn?: string | number;
  audience?: string;
  issuer?: string;
  subject?: string;
  algorithm?: string;
}

export interface PasswordStrengthResult {
  isValid: boolean;
  score: number; // 0-4
  feedback: string[];
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
  };
}

export interface TOTPSetup {
  secret: string;
  qrCodeUrl: string;
  manualEntryKey: string;
}

export interface TwoFactorStatus {
  enabled: boolean;
  backupCodesCount: number;
  lastUsed?: string;
}

// ============== 권한 관리 포트 ==============

export interface PermissionService {
  // 역할 관리
  hasRole(userId: Id, role: string): Promise<boolean>;
  addRole(userId: Id, role: string): Promise<void>;
  removeRole(userId: Id, role: string): Promise<void>;
  getUserRoles(userId: Id): Promise<string[]>;

  // 권한 확인
  hasPermission(userId: Id, permission: string): Promise<boolean>;
  hasAnyPermission(userId: Id, permissions: string[]): Promise<boolean>;
  hasAllPermissions(userId: Id, permissions: string[]): Promise<boolean>;

  // 권한 부여/제거
  grantPermission(userId: Id, permission: string): Promise<void>;
  revokePermission(userId: Id, permission: string): Promise<void>;
  getUserPermissions(userId: Id): Promise<string[]>;

  // 리소스 기반 권한
  canAccessResource(
    userId: Id,
    resourceType: string,
    resourceId: string,
    action: string,
  ): Promise<boolean>;
  grantResourceAccess(
    userId: Id,
    resourceType: string,
    resourceId: string,
    actions: string[],
  ): Promise<void>;
  revokeResourceAccess(
    userId: Id,
    resourceType: string,
    resourceId: string,
    actions?: string[],
  ): Promise<void>;
}

// ============== 감사 로그 포트 ==============

export interface AuditLogService {
  // 로그 기록
  log(event: AuditEvent): Promise<void>;

  // 로그 조회
  getAuditLogs(filters: AuditLogFilters): Promise<AuditEvent[]>;
  getUserAuditLogs(userId: Id, filters?: AuditLogFilters): Promise<AuditEvent[]>;
  getResourceAuditLogs(
    resourceType: string,
    resourceId: string,
    filters?: AuditLogFilters,
  ): Promise<AuditEvent[]>;

  // 로그 통계
  getAuditStats(timeRange: TimeRange): Promise<AuditStats>;
}

export interface AuditEvent {
  id: string;
  userId?: Id;
  action: string;
  resourceType?: string;
  resourceId?: string;
  oldValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

export interface AuditLogFilters {
  startDate?: string;
  endDate?: string;
  action?: string;
  resourceType?: string;
  userId?: Id;
  limit?: number;
  offset?: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface AuditStats {
  totalEvents: number;
  eventsByAction: Record<string, number>;
  eventsByUser: Record<string, number>;
  eventsByResource: Record<string, number>;
}
