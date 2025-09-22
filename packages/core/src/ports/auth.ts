/**
 * Description : auth.ts - 📌
 * @description 인증/인가/세션/JWT 관련 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-10
 */
import type { CreateUser, Id, User } from '../../core-types.js';

/**
 * @description 인증 서비스 포트
 */
export interface AuthService {
  /** @description Google OAuth 인증 */
  authenticateWithGoogle(googleToken: string): Promise<AuthResult>;
  /** @description Google 토큰 검증 */
  verifyGoogleToken(token: string): Promise<GoogleTokenPayload | null>;

  /** @description 이메일 인증코드 발송 */
  sendVerificationCode(email: string, purpose: VerificationPurpose): Promise<void>;
  /** @description 인증코드 검증 */
  verifyCode(email: string, code: string, purpose: VerificationPurpose): Promise<boolean>;

  /** @description 사용자 등록 */
  registerUser(userData: CreateUser): Promise<User>;
  /** @description 이메일 기반 로그인(패스워드 없는 플로우 가정) */
  loginUser(email: string): Promise<AuthResult>;

  /** @description 세션 생성 */
  createSession(user: User): Promise<UserSession>;
  /** @description 세션 검증 */
  verifySession(sessionToken: string): Promise<UserSession | null>;
  /** @description 세션 갱신 */
  refreshSession(sessionToken: string): Promise<UserSession>;
  /** @description 세션 무효화 */
  revokeSession(sessionToken: string): Promise<void>;
  /** @description 해당 사용자 모든 세션 무효화 */
  revokeAllSessions(userId: Id): Promise<void>;

  /** @description 액세스 토큰 생성 */
  generateAccessToken(user: User): Promise<string>;
  /** @description 리프레시 토큰 생성 */
  generateRefreshToken(user: User): Promise<string>;
  /** @description 액세스 토큰 검증 */
  verifyAccessToken(token: string): Promise<TokenPayload | null>;
  /** @description 리프레시 토큰 검증 */
  verifyRefreshToken(token: string): Promise<TokenPayload | null>;

  /** @description 레이트 리밋 확인 */
  checkRateLimit(identifier: string, action: string): Promise<RateLimitResult>;
  /** @description 보안 이벤트 로깅 */
  logSecurityEvent(event: SecurityEvent): Promise<void>;

  /** @description 사용자 활성화/비활성화/역할 변경 */
  activateUser(userId: Id): Promise<void>;
  deactivateUser(userId: Id): Promise<void>;
  changeUserRole(userId: Id, roleFlags: number): Promise<void>;
}

/**
 * @description JWT 서비스 포트
 */
export interface JWTService {
  /** @description 토큰 서명 */
  sign(payload: Record<string, unknown>, options?: JWTSignOptions): Promise<string>;
  /** @description 토큰 검증 */
  verify<T = Record<string, unknown>>(token: string): Promise<T>;
  /** @description 검증 없이 디코딩 */
  decode<T = Record<string, unknown>>(token: string): T | null;
  /** @description 리프레시 토큰을 통한 갱신 */
  refresh(refreshToken: string): Promise<TokenPair>;
  /** @description 토큰 무효화(블랙리스트) */
  revoke(token: string): Promise<void>;
  /** @description 블랙리스트 여부 */
  isRevoked(token: string): Promise<boolean>;
}

/**
 * @description 패스워드 유틸리티 서비스 포트
 */
export interface PasswordService {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
  validateStrength(password: string): PasswordStrengthResult;
  generateTemporaryPassword(): string;
}

/**
 * @description 2단계 인증 서비스 포트
 */
export interface TwoFactorService {
  generateTOTPSecret(userId: Id): Promise<TOTPSetup>;
  verifyTOTPSetup(userId: Id, secret: string, token: string): Promise<boolean>;
  enableTOTP(userId: Id, secret: string): Promise<string[]>;
  verifyTOTP(userId: Id, token: string): Promise<boolean>;
  generateBackupCodes(userId: Id): Promise<string[]>;
  verifyBackupCode(userId: Id, code: string): Promise<boolean>;
  disable2FA(userId: Id): Promise<void>;
  get2FAStatus(userId: Id): Promise<TwoFactorStatus>;
}

/**
 * @description 인증 결과
 */
export interface AuthResult {
  success: boolean;
  user?: User;
  session?: UserSession;
  tokens?: TokenPair;
  error?: string;
  requiresVerification?: boolean;
}

/**
 * @description 사용자 세션
 */
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

/**
 * @description 액세스/리프레시 토큰 쌍
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * @description JWT 페이로드
 */
export interface TokenPayload {
  userId: Id;
  email: string;
  roleFlags: number;
  iat: number;
  exp: number;
  sessionId?: string;
}

/**
 * @description Google ID 토큰 페이로드(요약)
 */
export interface GoogleTokenPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
}

/** @description 이메일 인증 목적 */
export type VerificationPurpose = 'signup' | 'login' | 'email_change' | 'password_reset';

/**
 * @description 레이트 리밋 결과
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: string;
  retryAfter?: number;
}

/**
 * @description 보안 이벤트
 */
export interface SecurityEvent {
  type: SecurityEventType;
  userId?: Id;
  ipAddress?: string;
  userAgent?: string;
  details: Record<string, unknown>;
  timestamp: string;
}

/** @description 보안 이벤트 타입 */
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

/**
 * @description JWT 서명 옵션
 */
export interface JWTSignOptions {
  expiresIn?: string | number;
  audience?: string;
  issuer?: string;
  subject?: string;
  algorithm?: string;
}

/**
 * @description 패스워드 강도 평가 결과
 */
export interface PasswordStrengthResult {
  isValid: boolean;
  /** @description 0~4 */
  score: number;
  feedback: string[];
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
  };
}

/**
 * @description TOTP 설정 정보
 */
export interface TOTPSetup {
  secret: string;
  qrCodeUrl: string;
  manualEntryKey: string;
}

/**
 * @description 2FA 상태
 */
export interface TwoFactorStatus {
  enabled: boolean;
  backupCodesCount: number;
  lastUsed?: string;
}

/**
 * @description 권한/역할 서비스 포트
 */
export interface PermissionService {
  hasRole(userId: Id, role: string): Promise<boolean>;
  addRole(userId: Id, role: string): Promise<void>;
  removeRole(userId: Id, role: string): Promise<void>;
  getUserRoles(userId: Id): Promise<string[]>;
  hasPermission(userId: Id, permission: string): Promise<boolean>;
  hasAnyPermission(userId: Id, permissions: string[]): Promise<boolean>;
  hasAllPermissions(userId: Id, permissions: string[]): Promise<boolean>;
  grantPermission(userId: Id, permission: string): Promise<void>;
  revokePermission(userId: Id, permission: string): Promise<void>;
  getUserPermissions(userId: Id): Promise<string[]>;
  canAccessResource(userId: Id, resourceType: string, resourceId: string, action: string): Promise<boolean>;
  grantResourceAccess(userId: Id, resourceType: string, resourceId: string, actions: string[]): Promise<void>;
  revokeResourceAccess(userId: Id, resourceType: string, resourceId: string, actions?: string[]): Promise<void>;
}

/**
 * @description 감사 로그 서비스 포트
 */
export interface AuditLogService {
  log(event: AuditEvent): Promise<void>;
  getAuditLogs(filters: AuditLogFilters): Promise<AuditEvent[]>;
  getUserAuditLogs(userId: Id, filters?: AuditLogFilters): Promise<AuditEvent[]>;
  getResourceAuditLogs(resourceType: string, resourceId: string, filters?: AuditLogFilters): Promise<AuditEvent[]>;
  getAuditStats(timeRange: TimeRange): Promise<AuditStats>;
}

/**
 * @description 감사 이벤트
 */
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

/**
 * @description 감사 로그 조회 필터
 */
export interface AuditLogFilters {
  startDate?: string;
  endDate?: string;
  action?: string;
  resourceType?: string;
  userId?: Id;
  limit?: number;
  offset?: number;
}

/** @description 시간 범위 */
export interface TimeRange {
  start: string;
  end: string;
}

/**
 * @description 감사 통계
 */
export interface AuditStats {
  totalEvents: number;
  eventsByAction: Record<string, number>;
  eventsByUser: Record<string, number>;
  eventsByResource: Record<string, number>;
}
