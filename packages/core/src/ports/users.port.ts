/**
 * Description : users.port.ts - 📌 인증/사용자 관리 포트 인터페이스
 * Author : Shiwoo Min
 * Date : 2025-09-28
 */
import type { CreateUser, CursorPaginatedResponse, CursorPaginationQuery, Id, UpdateUser, User } from '../core-types.js';
import type { TimeRange } from '../domain/value-objects.js';

/**
 * @description 인증 서비스 포트
 */
export interface AuthService {
  authenticateWithGoogle(googleToken: string): Promise<AuthResult>;
  verifyGoogleToken(token: string): Promise<GoogleTokenPayload | null>;
  sendVerificationCode(email: string, purpose: VerificationPurpose): Promise<void>;
  verifyCode(email: string, code: string, purpose: VerificationPurpose): Promise<boolean>;
  registerUser(userData: CreateUser): Promise<User>;
  loginUser(email: string): Promise<AuthResult>;
  createSession(user: User): Promise<UserSession>;
  verifySession(sessionToken: string): Promise<UserSession | null>;
  refreshSession(sessionToken: string): Promise<UserSession>;
  revokeSession(sessionToken: string): Promise<void>;
  revokeAllSessions(userId: Id): Promise<void>;
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<string>;
  verifyAccessToken(token: string): Promise<TokenPayload | null>;
  verifyRefreshToken(token: string): Promise<TokenPayload | null>;
  checkRateLimit(identifier: string, action: string): Promise<RateLimitResult>;
  logSecurityEvent(event: SecurityEvent): Promise<void>;
  activateUser(userId: Id): Promise<void>;
  deactivateUser(userId: Id): Promise<void>;
  changeUserRole(userId: Id, roleFlags: number): Promise<void>;
}

/**
 * @description JWT 서비스 포트
 */
export interface JWTService {
  sign(payload: Record<string, unknown>, options?: JWTSignOptions): Promise<string>;
  verify<T = Record<string, unknown>>(token: string): Promise<T>;
  decode<T = Record<string, unknown>>(token: string): T | null;
  refresh(refreshToken: string): Promise<TokenPair>;
  revoke(token: string): Promise<void>;
  isRevoked(token: string): Promise<boolean>;
}

/**
 * @description 비밀번호 서비스 포트
 */
export interface PasswordService {
  hash(password: string): Promise<string>;
  verify(password: string, hash: string): Promise<boolean>;
  validateStrength(password: string): PasswordStrengthResult;
  generateTemporaryPassword(): string;
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
 * @description 사용자 리포지토리 포트
 */
export interface UserRepository {
  findById(id: Id): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByGoogleSub(googleSub: string): Promise<User | null>;
  create(user: CreateUser): Promise<User>;
  update(id: Id, updates: UpdateUser): Promise<User>;
  delete(id: Id): Promise<boolean>;
  findMany(query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;
  search(
    term: string,
    query: CursorPaginationQuery & {
      orderBy?: 'createdAt' | 'name' | 'email';
      orderDir?: 'asc' | 'desc';
    },
  ): Promise<CursorPaginatedResponse<User>>;
  findByRoleFlags(roleFlags: number, query: CursorPaginationQuery): Promise<CursorPaginatedResponse<User>>;
  updateLastLoginAt(id: Id, atISO: string): Promise<void>;
  exists(id: Id): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByGoogleSub(googleSub: string): Promise<boolean>;
  count(): Promise<number>;
  countByRoleFlags(roleFlags: number): Promise<number>;
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
 * @description 액세스/리프레시 토큰 페어
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
 * @description 구글 토큰 페이로드
 */
export interface GoogleTokenPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
}

/**
 * @description 이메일 인증 용도
 */
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

/**
 * @description 보안 이벤트 유형
 */
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
 * @description 비밀번호 강도 검사 결과
 */
export interface PasswordStrengthResult {
  isValid: boolean;
  score: number; // 0~4
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
 * @description 2단계 인증 상태
 */
export interface TwoFactorStatus {
  enabled: boolean;
  backupCodesCount: number;
  lastUsed?: string;
}

/**
 * @description 감사 로그 이벤트
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

/**
 * @description 감사 로그 통계
 */
export interface AuditStats {
  totalEvents: number;
  eventsByAction: Record<string, number>;
  eventsByUser: Record<string, number>;
  eventsByResource: Record<string, number>;
}
