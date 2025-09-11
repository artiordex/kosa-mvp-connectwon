/**
 * Description : public.ts - 📌 공개 엔드포인트 데코레이터
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * 인증이 필요하지 않은 공개 엔드포인트 표시
 *
 * @example
 * ```typescript
 * @Public()
 * @Get('/health')
 * getHealth() {
 *   return { status: 'ok' };
 * }
 *
 * @Public()
 * @Post('/auth/login')
 * login(@Body() loginDto: LoginDto) {
 *   return this.authService.login(loginDto);
 * }
 *
 * @Public()
 * @Get('/venues')
 * getVenues() {
 *   // 로그인 없이도 장소 목록 조회 가능
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
