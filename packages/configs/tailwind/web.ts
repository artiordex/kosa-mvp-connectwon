/**
 * Description : web.ts - 📌 tailwindcss 설정 (웹 전용)
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import type { Config } from 'tailwindcss';
import base from './base.js';

const web: Partial<Config> = {
  ...base,
  theme: {
    ...base.theme,
    extend: {
      ...(base.theme && base.theme.extend),
      colors: {
        ...(base.theme?.extend as any)?.colors,
        brand: {
          DEFAULT: '#1D4ED8',
          light:   '#3B82F6',
          dark:    '#1E40AF',
          fg:      '#FFFFFF'
        }
      },
      borderRadius: {
        ...(base.theme?.extend as any)?.borderRadius,
        xl: '1rem',
        '2xl': '1.25rem'
      }
    }
  }
};

export default web;
