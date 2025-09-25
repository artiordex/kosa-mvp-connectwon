/**
 * Description : auth.controller.ts - 📌 SSO 인증 컨트롤러
 * Author : Shiwoo Min
 * Date : 2025-09-26
 */
import { Body, Controller, Get, Param, Post, Put, Query, Redirect , Delete} from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * @description 소셜 로그인 기반의 Single Sign-On 인증 시스템을 제공하는 REST API 엔드포인트
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description SSO 로그인 시작
   * @param provider - SSO 제공자 (naver, kakao, google)
   * @param redirectUrl - 로그인 완료 후 리다이렉트할 URL
   * @returns SSO 제공자의 인증 URL
   * @description SSO 제공자의 로그인 페이지로 리다이렉트할 URL을 생성
   */
  @Get('sso/:provider/login')
  async initiateSSOLogin(@Param('provider') provider: 'naver' | 'kakao' | 'google', @Query('redirectUrl') redirectUrl?: string) {
    return this.authService.initiateSSOLogin(provider, redirectUrl);
  }

  /**
   * @description SSO 콜백 처리
   * @param provider - SSO 제공자
   * @param callbackData - SSO 제공자로부터 받은 콜백 데이터
   * @returns 인증 토큰과 사용자 정보
   * @description SSO 제공자로부터 받은 인증 코드를 처리하고 토큰 발급
   */
  @Post('sso/:provider/callback')
  async handleSSOCallback(@Param('provider') provider: 'naver' | 'kakao' | 'google', @Body() callbackData: any) {
    return this.authService.handleSSOCallback(provider, callbackData);
  }

  /**
   * @description SSO 토큰 갱신
   * @param refreshToken - 갱신용 토큰
   * @returns 새로운 액세스 토큰과 리프레시 토큰
   * @description 만료된 액세스 토큰을 리프레시 토큰으로 갱신
   */
  @Post('sso/refresh')
  async refreshSSOToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshSSOToken(refreshToken);
  }

  /**
   * @description SSO 토큰 검증
   * @param token - 검증할 토큰
   * @returns 토큰 유효성 검증 결과
   * @description 현재 토큰의 유효성을 검증
   */
  @Post('sso/validate')
  async validateSSOToken(@Body('token') token: string) {
    return this.authService.validateSSOToken(token);
  }

  /**
   * @description SSO 제공자 설정 조회
   * @param provider - 조회할 SSO 제공자
   * @returns SSO 제공자 설정 정보
   * @description 특정 SSO 제공자의 설정 정보를 조회
   */
  @Get('sso/:provider/config')
  async getSSOProviderConfig(@Param('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.getSSOProviderConfig(provider);
  }

  /**
   * @description SSO 제공자 설정 업데이트
   * @param provider - 업데이트할 SSO 제공자
   * @param config - 새로운 설정 정보
   * @description SSO 제공자의 설정을 업데이트 (관리자만 가능)
   */
  @Post('sso/:provider/config')
  async updateSSOProviderConfig(@Param('provider') provider: 'naver' | 'kakao' | 'google', @Body() config: any) {
    return this.authService.updateSSOProviderConfig(provider, config);
  }

  /**
   * @description 사용 가능한 SSO 제공자 목록 조회
   * @returns 현재 활성화된 SSO 제공자 목록
   * @description 현재 서비스에서 지원하는 SSO 제공자들의 목록
   */
  @Get('sso/providers')
  async getAvailableSSOProviders() {
    return this.authService.getAvailableSSOProviders();
  }

  /**
   * @description SSO 사용자 정보 조회
   * @param token - 인증 토큰
   * @returns SSO로부터 받은 사용자 정보
   * @description 현재 로그인된 사용자의 SSO 정보 조회
   */
  @Get('sso/userinfo')
  async getSSOUserInfo(@Query('token') token: string) {
    return this.authService.getSSOUserInfo(token);
  }

  /**
   * @description 사용자 프로필 동기화
   * @param ssoUserInfo - SSO로부터 받은 사용자 정보
   * @returns 동기화된 사용자 프로필
   * @description SSO 정보를 기반으로 로컬 사용자 프로필을 업데이트
   */
  @Post('sso/sync-profile')
  async syncUserProfile(@Body() ssoUserInfo: any) {
    return this.authService.syncUserProfile(ssoUserInfo);
  }

  /**
   * @description SSO 계정 연결
   * @param userId - 연결할 사용자 ID
   * @param provider - 연결할 SSO 제공자
   * @param ssoData - SSO 연결 정보
   * @description 기존 사용자 계정에 새로운 SSO 계정을 연결
   */
  @Post('users/:userId/sso/:provider/link')
  async linkSSOAccount(@Param('userId') userId: string, @Param('provider') provider: 'naver' | 'kakao' | 'google', @Body() ssoData: any) {
    return this.authService.linkSSOAccount(userId, provider, ssoData);
  }

  /**
   * @description SSO 계정 연결 해제
   * @param userId - 사용자 ID
   * @param provider - 연결 해제할 SSO 제공자
   * @description 사용자 계정에서 특정 SSO 계정 연결을 해제
   */
  @Delete('users/:userId/sso/:provider/unlink')
  async unlinkSSOAccount(@Param('userId') userId: string, @Param('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.unlinkSSOAccount(userId, provider);
  }

  /**
   * @description SSO 세션 생성
   * @param ssoUserInfo - SSO 사용자 정보
   * @param provider - SSO 제공자
   * @returns 생성된 세션 정보
   * @description 새로운 SSO 세션을 생성
   */
  @Post('sso/session')
  async createSSOSession(@Body('ssoUserInfo') ssoUserInfo: any, @Body('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.createSSOSession(ssoUserInfo, provider);
  }

  /**
   * @description SSO 세션 검증
   * @param sessionId - 검증할 세션 ID
   * @returns 세션 유효성 검증 결과
   * @description 현재 세션의 유효성을 검증
   */
  @Get('sso/session/:sessionId/validate')
  async validateSSOSession(@Param('sessionId') sessionId: string) {
    return this.authService.validateSSOSession(sessionId);
  }

  /**
   * @description SSO 세션 종료
   * @param sessionId - 종료할 세션 ID
   * @description 특정 SSO 세션을 종료
   */
  @Delete('sso/session/:sessionId')
  async terminateSSOSession(@Param('sessionId') sessionId: string) {
    return this.authService.terminateSSOSession(sessionId);
  }

  /**
   * @description 전체 SSO 로그아웃
   * @param userId - 로그아웃할 사용자 ID
   * @description 모든 SSO 제공자에서 동시에 로그아웃
   */
  @Post('users/:userId/sso/global-logout')
  async globalSSOLogout(@Param('userId') userId: string) {
    return this.authService.globalSSOLogout(userId);
  }

  /**
   * @description 어드민 SSO 로그인 시작
   * @param provider - SSO 제공자
   * @returns 어드민용 SSO 로그인 URL
   * @description 관리자용 SSO 로그인 프로세스 시작
   */
  @Get('admin/sso/:provider/login')
  async initiateAdminSSOLogin(@Param('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.initiateAdminSSOLogin(provider);
  }

  /**
   * @description 어드민 SSO 콜백 처리
   * @param provider - SSO 제공자
   * @param callbackData - 콜백 데이터
   * @returns 어드민 인증 토큰
   * @description 관리자용 SSO 콜백 처리 및 권한 검증
   */
  @Post('admin/sso/:provider/callback')
  async handleAdminSSOCallback(@Param('provider') provider: 'naver' | 'kakao' | 'google', @Body() callbackData: any) {
    return this.authService.handleAdminSSOCallback(provider, callbackData);
  }

  /**
   * @description 어드민 SSO 권한 검증
   * @param ssoUserInfo - SSO 사용자 정보
   * @returns 관리자 권한 검증 결과
   * @description SSO 사용자가 관리자 권한을 가지고 있는지 검증
   */
  @Post('admin/sso/validate-access')
  async validateAdminSSOAccess(@Body() ssoUserInfo: any) {
    return this.authService.validateAdminSSOAccess(ssoUserInfo);
  }

  /**
   * @description SSO 사용자 역할 매핑
   * @param ssoUserInfo - SSO 사용자 정보
   * @param provider - SSO 제공자
   * @returns 매핑된 사용자 역할
   * @description SSO 정보를 기반으로 내부 사용자 역할을 결정
   */
  @Post('sso/map-role')
  async mapSSOToUserRole(@Body('ssoUserInfo') ssoUserInfo: any, @Body('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.mapSSOToUserRole(ssoUserInfo, provider);
  }

  /**
   * SSO 권한 확인
   * @param token - 인증 토큰
   * @param permission - 확인할 권한
   * @returns 권한 보유 여부
   * @description 특정 권한을 가지고 있는지 확인
   */
  @Get('sso/check-permission')
  async checkSSOPermission(@Query('token') token: string, @Query('permission') permission: string) {
    return this.authService.checkSSOPermission(token, permission);
  }

  /**
   * @description SSO 권한 동기화
   * @param userId - 사용자 ID
   * @param ssoData - SSO 데이터
   * @description SSO 정보를 기반으로 사용자 권한을 업데이트
   */
  @Post('users/:userId/sso/sync-permissions')
  async syncSSOPermissions(@Param('userId') userId: string, @Body() ssoData: any) {
    return this.authService.syncSSOPermissions(userId, ssoData);
  }

  /**
   * @description SSO 토큰 폐기
   * @param token - 폐기할 토큰
   * @param provider - SSO 제공자
   * @description 특정 SSO 토큰을 무효화
   */
  @Delete('sso/:provider/token')
  async revokeSSOToken(@Param('provider') provider: 'naver' | 'kakao' | 'google', @Body('token') token: string) {
    return this.authService.revokeSSOToken(token, provider);
  }

  /**
   * @description 사용자의 SSO 토큰 일괄 폐기
   * @param userId - 사용자 ID
   * @param provider - 특정 SSO 제공자 (선택사항)
   * @description 사용자의 모든 또는 특정 제공자의 SSO 토큰을 폐기
   */
  @Delete('users/:userId/sso/tokens')
  async revokeSSOTokens(@Param('userId') userId: string, @Query('provider') provider?: 'naver' | 'kakao' | 'google') {
    return this.authService.revokeSSOTokens(userId, provider);
  }

  /**
   * @description SSO 토큰 정보 조회
   * @param token - 조회할 토큰
   * @returns 토큰 정보
   * @description 토큰의 상세 정보를 조회
   */
  @Get('sso/token-info')
  async getSSOTokenInfo(@Query('token') token: string) {
    return this.authService.getSSOTokenInfo(token);
  }

  /**
   * @description 연결된 SSO 계정 목록 조회
   * @param userId - 사용자 ID
   * @returns 연결된 SSO 계정 목록
   * @description 사용자에게 연결된 모든 SSO 계정 조회
   */
  @Get('users/:userId/sso/linked-accounts')
  async getLinkedSSOAccounts(@Param('userId') userId: string) {
    return this.authService.getLinkedSSOAccounts(userId);
  }

  /**
   * @description 주 SSO 계정 확인
   * @param userId - 사용자 ID
   * @param provider - SSO 제공자
   * @returns 주 SSO 계정 여부
   * @description 특정 SSO 계정이 주 계정인지 확인
   */
  @Get('users/:userId/sso/:provider/is-primary')
  async isPrimarySSO(@Param('userId') userId: string, @Param('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.isPrimarySSO(userId, provider);
  }

  /**
   * @description 주 SSO 계정 설정
   * @param userId - 사용자 ID
   * @param provider - 주 계정으로 설정할 SSO 제공자
   * @description 특정 SSO 계정을 주 계정으로 설정
   */
  @Put('users/:userId/sso/:provider/set-primary')
  async setPrimarySSO(@Param('userId') userId: string, @Param('provider') provider: 'naver' | 'kakao' | 'google') {
    return this.authService.setPrimarySSO(userId, provider);
  }

  /**
   * @description SSO State 매개변수 검증
   * @param state - 검증할 state 값
   * @returns State 유효성 검증 결과
   * @description CSRF 공격 방지를 위한 state 매개변수 검증
   */
  @Post('sso/validate-state')
  async validateSSOState(@Body('state') state: string) {
    return this.authService.validateSSOState(state);
  }

  /**
   * @description SSO State 생성
   * @returns 생성된 state 값
   * @description 새로운 SSO state 매개변수 생성
   */
  @Post('sso/generate-state')
  async generateSSOState() {
    return this.authService.generateSSOState();
  }

  /**
   * @description SSO 보안 정책 확인
   * @param ssoData - 검증할 SSO 데이터
   * @returns 보안 정책 준수 여부
   * @description SSO 데이터가 보안 정책을 준수하는지 확인
   */
  @Post('sso/check-security-policy')
  async checkSSOSecurityPolicy(@Body() ssoData: any) {
    return this.authService.checkSSOSecurityPolicy(ssoData);
  }
}
