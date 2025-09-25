/**
 * Description : auth.interface.ts - 📌 SSO 인증 서비스 인터페이스 정의
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */

// Placeholder 타입들 (나중에 packages/api-contract/schemas 로 대체 예정)
type SSOLoginRequest = any;
type SSOCallbackRequest = any;
type SSOTokenResponse = any;
type SSOUserInfo = any;
type SSOProviderConfig = any;
type LogoutRequest = any;
type TokenValidationResult = any;
type UserProfile = any;
type AdminProfile = any;
type SSOProvider = 'naver' | 'kakao' | 'google';
type UserRole = 'user' | 'admin' | 'super_admin';

/**
 * @description SSO 인증 서비스 인터페이스
 */
export interface IAuthService {
  // SSO 인증
  initiateSSOLogin(provider: SSOProvider, redirectUrl?: string): Promise<string>;
  handleSSOCallback(provider: SSOProvider, callbackData: SSOCallbackRequest): Promise<SSOTokenResponse>;
  refreshSSOToken(refreshToken: string): Promise<SSOTokenResponse>;
  validateSSOToken(token: string): Promise<TokenValidationResult>;

  // SSO 제공자 관리
  getSSOProviderConfig(provider: SSOProvider): Promise<SSOProviderConfig>;
  updateSSOProviderConfig(provider: SSOProvider, config: SSOProviderConfig): Promise<void>;
  getAvailableSSOProviders(): Promise<SSOProvider[]>;

  // 사용자 정보 (SSO 기반)
  getSSOUserInfo(token: string): Promise<SSOUserInfo>;
  syncUserProfile(ssoUserInfo: SSOUserInfo): Promise<UserProfile>;
  linkSSOAccount(userId: string, provider: SSOProvider, ssoData: any): Promise<void>;
  unlinkSSOAccount(userId: string, provider: SSOProvider): Promise<void>;

  // 세션 관리 (SSO)
  createSSOSession(ssoUserInfo: SSOUserInfo, provider: SSOProvider): Promise<any>;
  validateSSOSession(sessionId: string): Promise<boolean>;
  terminateSSOSession(sessionId: string): Promise<void>;
  globalSSOLogout(userId: string): Promise<void>; // 모든 SSO 제공자에서 로그아웃

  // 어드민 SSO
  initiateAdminSSOLogin(provider: SSOProvider): Promise<string>;
  handleAdminSSOCallback(provider: SSOProvider, callbackData: SSOCallbackRequest): Promise<SSOTokenResponse>;
  validateAdminSSOAccess(ssoUserInfo: SSOUserInfo): Promise<boolean>;

  // 권한 관리 (SSO 연동)
  mapSSOToUserRole(ssoUserInfo: SSOUserInfo, provider: SSOProvider): Promise<UserRole>;
  checkSSOPermission(token: string, permission: string): Promise<boolean>;
  syncSSOPermissions(userId: string, ssoData: any): Promise<void>;

  // SSO 토큰 관리
  revokeSSOToken(token: string, provider: SSOProvider): Promise<void>;
  revokeSSOTokens(userId: string, provider?: SSOProvider): Promise<void>;
  getSSOTokenInfo(token: string): Promise<any>;

  // 계정 연동 관리
  getLinkedSSOAccounts(userId: string): Promise<any[]>;
  isPrimarySSO(userId: string, provider: SSOProvider): Promise<boolean>;
  setPrimarySSO(userId: string, provider: SSOProvider): Promise<void>;

  // SSO 보안
  validateSSOState(state: string): Promise<boolean>;
  generateSSOState(): Promise<string>;
  checkSSOSecurityPolicy(ssoData: any): Promise<boolean>;
}
