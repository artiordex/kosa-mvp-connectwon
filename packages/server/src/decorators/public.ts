/**
 * Description : public.ts - 📌 공개 엔드포인트 데코레이터
 * Author : Shiwoo Min
 * Date : 2025-09-12
 */
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// 공개 엔드포인트 데코레이터
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
