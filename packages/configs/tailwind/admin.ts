/**
 * Description : admin.ts - 📌 tailwindcss 설정 (관리자 전용)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import type { Config } from 'tailwindcss';
import base from './base.js';

const admin: Partial<Config> = {
  ...base,
  theme: {
    ...base.theme,
    extend: {
      ...(base.theme && base.theme.extend),
      colors: {
        ...(base.theme?.extend as any)?.colors,
        neutral: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1F2937',
          900: '#0F172A'
        }
      }
    }
  }
};

export default admin;
