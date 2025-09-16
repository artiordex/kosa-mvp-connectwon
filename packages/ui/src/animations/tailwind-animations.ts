/**
 * Description : tailwind-animations.ts - 📌 ConnectWon UI Tailwind 애니메이션 확장 (TypeScript)
 * Author : Shiwoo Min
 * Date : 2025-09-16
 * Usage : import { connectwonAnimations } from '@connectwon/ui/animations/tailwind-animations'
 */

// 타입 정의
export interface AnimationConfig {
  [key: string]: string;
}

export interface KeyframeConfig {
  [key: string]: {
    [key: string]: string | { [property: string]: string };
  };
}

export interface TimingConfig {
  [key: string]: string;
}

export interface ConnectWonAnimations {
  animation: AnimationConfig;
  keyframes: KeyframeConfig;
  animationDelay: TimingConfig;
  animationDuration: TimingConfig;
  transitionTimingFunction: TimingConfig;
}

// 애니메이션 설정
export const connectwonAnimations: ConnectWonAnimations = {
  animation: {
    // 로딩 애니메이션
    'spin-slow': 'spin 1s linear infinite',
    'spin-fast': 'spin 0.5s linear infinite',
    'pulse-dots': 'pulse 1.4s ease-in-out infinite both',
    skeleton: 'skeleton 1.5s infinite',

    // 상태 피드백
    'success-scale': 'successScale 0.6s ease-out',
    checkmark: 'checkmark 0.4s ease-out 0.2s both',
    crossmark: 'crossmark 0.4s ease-out 0.2s both',

    // 페이지 전환
    'fade-in-up': 'fadeInUp 0.8s ease-out',
    'fade-in-down': 'fadeInDown 0.8s ease-out',
    'fade-in-left': 'fadeInLeft 0.8s ease-out',
    'fade-in-right': 'fadeInRight 0.8s ease-out',
    'slide-in-list': 'slideInList 0.5s ease-out forwards',

    // 알림
    'float-in': 'floatIn 0.5s ease-out',
    'float-out': 'floatOut 0.5s ease-in forwards',
    'float-notification': 'floatIn 0.5s ease-out, floatOut 0.5s ease-in 2.5s forwards',

    // 모달
    'modal-backdrop': 'modalBackdrop 0.3s ease-out',
    'modal-backdrop-out': 'modalBackdropOut 0.3s ease-out',
    'modal-slide': 'modalSlide 0.4s ease-out',
    'modal-slide-out': 'modalSlideOut 0.3s ease-out',

    // 진행 표시
    'progress-fill': 'progressFill 3s ease-out',
    'circular-progress': 'circularProgress 1s ease-out',

    // 인터랙션
    heartbeat: 'heartbeat 1.5s ease-in-out infinite',
    'heartbeat-fast': 'heartbeatFast 0.8s ease-in-out infinite',
    'bounce-soft': 'bounce 2s infinite',
    shake: 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
    'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',

    // 타이핑
    typing: 'typing 1.4s infinite ease-in-out',

    // 유틸리티
    'scale-in': 'scaleIn 0.3s ease-out',
    'scale-out': 'scaleOut 0.3s ease-out',
    'rotate-in': 'rotateIn 0.5s ease-out',
    flip: 'flip 0.6s ease-in-out',
  },

  keyframes: {
    // 기본 애니메이션
    successScale: {
      '0%': { transform: 'scale(0)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' },
    },

    checkmark: {
      '0%': { height: '0' },
      '100%': { height: '16px' },
    },

    crossmark: {
      '0%': { height: '0' },
      '100%': { height: '30px' },
    },

    // 페이드 애니메이션
    fadeInUp: {
      '0%': {
        opacity: '0',
        transform: 'translateY(30px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)',
      },
    },

    fadeInDown: {
      '0%': {
        opacity: '0',
        transform: 'translateY(-30px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateY(0)',
      },
    },

    fadeInLeft: {
      '0%': {
        opacity: '0',
        transform: 'translateX(-30px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },

    fadeInRight: {
      '0%': {
        opacity: '0',
        transform: 'translateX(30px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },

    // 스켈레톤 로더
    skeleton: {
      '0%': { backgroundPosition: '200% 0' },
      '100%': { backgroundPosition: '-200% 0' },
    },

    // 알림 애니메이션
    floatIn: {
      '0%': {
        opacity: '0',
        transform: 'translateX(100px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },

    floatOut: {
      '0%': {
        opacity: '1',
        transform: 'translateX(0)',
      },
      '100%': {
        opacity: '0',
        transform: 'translateX(-100px)',
      },
    },

    // 리스트 애니메이션
    slideInList: {
      '0%': {
        opacity: '0',
        transform: 'translateX(-30px)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateX(0)',
      },
    },

    // 모달 애니메이션
    modalBackdrop: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },

    modalBackdropOut: {
      '0%': { opacity: '1' },
      '100%': { opacity: '0' },
    },

    modalSlide: {
      '0%': {
        transform: 'scale(0.7) translateY(-20px)',
        opacity: '0',
      },
      '100%': {
        transform: 'scale(1) translateY(0)',
        opacity: '1',
      },
    },

    modalSlideOut: {
      '0%': {
        transform: 'scale(1) translateY(0)',
        opacity: '1',
      },
      '100%': {
        transform: 'scale(0.7) translateY(-20px)',
        opacity: '0',
      },
    },

    // 진행 바
    progressFill: {
      '0%': { width: '0%' },
      '100%': { width: '100%' },
    },

    circularProgress: {
      '0%': { strokeDasharray: '0 251.2' },
      '100%': { strokeDasharray: '251.2 0' },
    },

    // 하트비트
    heartbeat: {
      '0%, 100%': { transform: 'scale(1)' },
      '25%, 75%': { transform: 'scale(1.1)' },
      '50%': { transform: 'scale(1.2)' },
    },

    heartbeatFast: {
      '0%, 100%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.3)' },
    },

    // 바운스
    bounce: {
      '0%, 20%, 53%, 80%, 100%': {
        animationTimingFunction: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
        transform: 'translate3d(0, 0, 0)',
      },
      '40%, 43%': {
        animationTimingFunction: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
        transform: 'translate3d(0, -15px, 0)',
      },
      '70%': {
        animationTimingFunction: 'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
        transform: 'translate3d(0, -7px, 0)',
      },
      '90%': {
        transform: 'translate3d(0, -2px, 0)',
      },
    },

    // 흔들기
    shake: {
      '10%, 90%': {
        transform: 'translate3d(-1px, 0, 0)',
      },
      '20%, 80%': {
        transform: 'translate3d(2px, 0, 0)',
      },
      '30%, 50%, 70%': {
        transform: 'translate3d(-4px, 0, 0)',
      },
      '40%, 60%': {
        transform: 'translate3d(4px, 0, 0)',
      },
    },

    // 펄스 글로우
    pulseGlow: {
      from: {
        boxShadow: '0 0 5px rgba(52, 152, 219, 0.4)',
      },
      to: {
        boxShadow: '0 0 20px rgba(52, 152, 219, 0.8)',
      },
    },

    // 타이핑
    typing: {
      '0%, 60%, 100%': {
        transform: 'translateY(0)',
        opacity: '0.4',
      },
      '30%': {
        transform: 'translateY(-10px)',
        opacity: '1',
      },
    },

    // 유틸리티 애니메이션
    scaleIn: {
      '0%': {
        transform: 'scale(0)',
        opacity: '0',
      },
      '100%': {
        transform: 'scale(1)',
        opacity: '1',
      },
    },

    scaleOut: {
      '0%': {
        transform: 'scale(1)',
        opacity: '1',
      },
      '100%': {
        transform: 'scale(0)',
        opacity: '0',
      },
    },

    rotateIn: {
      '0%': {
        transform: 'rotate(-180deg)',
        opacity: '0',
      },
      '100%': {
        transform: 'rotate(0deg)',
        opacity: '1',
      },
    },

    flip: {
      '0%': {
        transform: 'perspective(400px) rotateY(0)',
      },
      '40%': {
        transform: 'perspective(400px) translateZ(150px) rotateY(170deg)',
        animationTimingFunction: 'ease-out',
      },
      '50%': {
        transform: 'perspective(400px) translateZ(150px) rotateY(190deg) scale(1)',
        animationTimingFunction: 'ease-in',
      },
      '80%': {
        transform: 'perspective(400px) rotateY(360deg) scale(0.95)',
        animationTimingFunction: 'ease-in',
      },
      '100%': {
        transform: 'perspective(400px) scale(1)',
        animationTimingFunction: 'ease-in',
      },
    },
  },

  // 애니메이션 지연 시간
  animationDelay: {
    '75': '75ms',
    '100': '100ms',
    '150': '150ms',
    '200': '200ms',
    '300': '300ms',
    '500': '500ms',
    '700': '700ms',
    '1000': '1000ms',
  },

  // 애니메이션 지속 시간
  animationDuration: {
    '250': '250ms',
    '400': '400ms',
    '600': '600ms',
    '800': '800ms',
    '1200': '1200ms',
    '1500': '1500ms',
    '2000': '2000ms',
    '3000': '3000ms',
  },

  // 트랜지션 타이밍 함수
  transitionTimingFunction: {
    'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    snappy: 'cubic-bezier(0.4, 0, 1, 1)',
  },
};

// 애니메이션 클래스 이름 타입 (자동완성을 위한)
export type AnimationName = keyof typeof connectwonAnimations.animation;
export type KeyframeName = keyof typeof connectwonAnimations.keyframes;
export type DelayName = keyof typeof connectwonAnimations.animationDelay;
export type DurationName = keyof typeof connectwonAnimations.animationDuration;
export type TimingFunctionName = keyof typeof connectwonAnimations.transitionTimingFunction;

// 헬퍼 함수들
export const getAnimationClass = (name: AnimationName): string => `animate-${name}`;
export const getDelayClass = (delay: DelayName): string => `delay-${delay}`;
export const getDurationClass = (duration: DurationName): string => `duration-${duration}`;

// Tailwind 설정을 위한 타입
export interface TailwindConfig {
  theme: {
    extend: ConnectWonAnimations;
  };
}

// 기본 내보내기
export default connectwonAnimations;
