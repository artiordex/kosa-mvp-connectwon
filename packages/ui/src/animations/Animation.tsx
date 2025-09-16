/**
 * Description : AnimationComponents.tsx - 📌 ConnectWon UI 애니메이션 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import React, { useCallback, useEffect, useState } from 'react';

// =================== 공통 타입 ===================

export interface BaseAnimationProps {
  className?: string;
}

export interface LoadingSpinnerProps extends BaseAnimationProps {
  /** 프리셋만 지원 (숫자 미지원) */
  size?: 'small' | 'medium' | 'large';
}

export interface PulseLoaderProps extends BaseAnimationProps {
  /** 1~3만 권장 (nth-child 딜레이 프리셋과 일치) */
  count?: 1 | 2 | 3;
}

export interface SuccessCheckProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large';
  onAnimationEnd?: () => void;
}

export interface ErrorCrossProps extends BaseAnimationProps {
  size?: 'small' | 'medium' | 'large';
  onAnimationEnd?: () => void;
}

export interface SkeletonLoaderProps extends BaseAnimationProps {
  /** 텍스트/타이틀/아바타/직사각 */
  variant?: 'text' | 'title' | 'avatar' | 'rectangular';
  /** 줄 수 (각 줄은 CSS 프리셋 높이/마진 사용) */
  lines?: number;
}

export interface FloatingNotificationProps extends BaseAnimationProps {
  children: React.ReactNode;
  /** 색상 프리셋 */
  type?: 'success' | 'error' | 'warning' | 'info';
  /** 자동 닫힘 ms (0 또는 생략 시 자동 닫힘 안 함) */
  duration?: number;
  onClose?: () => void;
  /** true면 자동 닫힘 */
  autoClose?: boolean;
}

export interface AnimatedListProps extends BaseAnimationProps {
  children: React.ReactNode[];
  /** CSS에 정의된 nth-child 딜레이(0.1~0.8s) 사용 → 이 값은 무시됨 */
  stagger?: number;
  /** 방향 프리셋 */
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface ProgressBarProps extends BaseAnimationProps {
  /** indeterminate 전용. true면 자동 애니메이션 */
  animated?: boolean;
  /** 라벨 표시 여부(고정 텍스트) */
  showLabel?: boolean;
  /** 라벨 텍스트(예: "Loading..." ) */
  labelText?: string;
}

export interface CircularProgressProps extends BaseAnimationProps {
  /** indeterminate 전용 */
  showLabel?: boolean;
  /** 라벨 텍스트 */
  labelText?: string;
}

export interface TypingIndicatorProps extends BaseAnimationProps {
  /** 점 개수 (1~3 권장) */
  dotCount?: 1 | 2 | 3;
}

export interface ModalProps extends BaseAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export interface FadeProps extends BaseAnimationProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  /** 0 | 100 | 200 | 300 | 500 | 700 | 1000(ms) 중 가장 근접한 프리셋 클래스로 맵핑 */
  delay?: number;
  /** fast(0.3s) / normal(0.5s) / slow(0.8s) / slower(1.2s) 프리셋으로 맵핑 */
  duration?: number;
  trigger?: boolean;
}

export interface HeartbeatProps extends BaseAnimationProps {
  children: React.ReactNode;
  /** 활성/비활성 (활성 시 .heartbeat 클래스 적용) */
  active?: boolean;
}

// =================== 유틸: 프리셋 클래스 맵핑 ===================

function toDelayClass(ms: number = 0): string {
  const presets = [0, 100, 200, 300, 500, 700, 1000] as const;
  let nearest: (typeof presets)[number] = 0;

  for (const p of presets) {
    if (Math.abs(ms - p) < Math.abs(ms - nearest)) {
      nearest = p;
    }
  }
  return nearest === 0 ? '' : `delay-${nearest}`;
}

function toDurationClass(ms = 800): string {
  if (ms <= 300) return 'duration-fast';
  if (ms <= 500) return 'duration-normal';
  if (ms <= 800) return 'duration-slow';
  return 'duration-slower';
}

// =================== 로딩 컴포넌트 ===================

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  className = '',
  ...props
}) => {
  // size 프리셋만 사용 (CSS: .loading-spinner, .loading-spinner--small, .loading-spinner--large)
  const sizeCls = size !== 'medium' ? `loading-spinner--${size}` : '';
  return <div className={`loading-spinner ${sizeCls} ${className}`} {...props} />;
};

export const PulseLoader: React.FC<PulseLoaderProps> = ({
  count = 3,
  className = '',
  ...props
}) => {
  const dots = Math.max(1, Math.min(3, count));
  return (
    <div className={`pulse-loader ${className}`} {...props}>
      {Array.from({ length: dots }, (_, i) => (
        <div key={i} className="pulse-dot" />
      ))}
    </div>
  );
};

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rectangular',
  lines = 1,
  className = '',
  ...props
}) => {
  const itemCls = `skeleton-loader skeleton-loader--${variant}`;
  if (lines > 1) {
    return (
      <div className={className} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={itemCls} />
        ))}
      </div>
    );
  }
  return <div className={`${itemCls} ${className}`} {...props} />;
};

// =================== 피드백 컴포넌트 ===================

export const SuccessCheck: React.FC<SuccessCheckProps> = ({
  size = 'medium',
  onAnimationEnd,
  className = '',
  ...props
}) => {
  const sizeCls = size === 'small' ? 'success-check--small' : '';
  return (
    <div
      className={`success-check ${sizeCls} ${className}`}
      onAnimationEnd={onAnimationEnd}
      {...props}
    />
  );
};

export const ErrorCross: React.FC<ErrorCrossProps> = ({
  // CSS는 기본(60px) 프리셋만 있으므로 small/large는 시각적 차이 없음
  size = 'medium',
  onAnimationEnd,
  className = '',
  ...props
}) => {
  return <div className={`error-cross ${className}`} onAnimationEnd={onAnimationEnd} {...props} />;
};

// =================== 알림 컴포넌트 ===================

export function FloatingNotification({
  children,
  type = 'success',
  duration = 3000,
  onClose,
  autoClose = true,
  className = '',
  ...props
}: FloatingNotificationProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && duration > 0) {
      const t = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(t);
    }
    // cleanup이 없는 경로도 명시적으로 반환
    return undefined;
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`floating-notification floating-notification--${type} ${className}`} {...props}>
      {children}
      {onClose && (
        <button
          className="floating-notification__close"
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          aria-label="Close notification"
        >
          ×
        </button>
      )}
    </div>
  );
}

// =================== 애니메이션 래퍼 ===================

export const Fade: React.FC<FadeProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  trigger = true,
  className = '',
  ...props
}) => {
  const delayCls = toDelayClass(delay);
  const durationCls = toDurationClass(duration);
  const dirCls = trigger ? `fade-in-${direction}` : '';
  return (
    <div className={`${dirCls} ${delayCls} ${durationCls} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  direction = 'left',
  className = '',
  ...props
}) => {
  // nth-child 딜레이는 CSS에 고정(0.1~0.8s). 방향은 Fade와 독립.
  const dirCls = `fade-in-${direction}`;
  return (
    <div className={className} {...props}>
      {React.Children.map(children, child => (
        <div className={`list-item-animate ${dirCls}`}>{child}</div>
      ))}
    </div>
  );
};

// =================== 진행 표시 ===================

/**
 * ProgressBar: 인라인 없이 구현 → indeterminate 전용
 * - 막대는 CSS keyframes(progressFill)로 0→100% 애니메이션
 * - 정확한 % 표현이 필요하면 유틸 클래스(w-pct-0~100) 추가 또는 인라인 사용 필요
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  animated = true,
  showLabel = false,
  labelText = 'Loading…',
  className = '',
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {showLabel && <div className="progress-label">{labelText}</div>}
      <div className="progress-container">
        <div className={`progress-bar ${animated ? 'animate' : ''}`} />
      </div>
    </div>
  );
};

/**
 * CircularProgress: 인라인 없이 구현 → indeterminate 전용
 * - 원호는 CSS keyframes(circularProgress)로 진행
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  showLabel = false,
  labelText = 'Loading…',
  className = '',
  ...props
}) => {
  return (
    <div className={className} {...props}>
      <svg
        width={60}
        height={60}
        className="circular-progress"
        role="progressbar"
        aria-label={labelText}
      >
        <circle className="track" cx={30} cy={30} r={28} />
        <circle className="progress" cx={30} cy={30} r={28} />
      </svg>
      {showLabel && <div className="circular-progress-label">{labelText}</div>}
    </div>
  );
};

// =================== 인터랙션 ===================

export const Heartbeat: React.FC<HeartbeatProps> = ({
  children,
  active = true,
  className = '',
  ...props
}) => {
  return (
    <div className={`${active ? 'heartbeat' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  dotCount = 3,
  className = '',
  ...props
}) => {
  const dots = Math.max(1, Math.min(3, dotCount));
  return (
    <div className={`typing-indicator ${className}`} {...props}>
      {Array.from({ length: dots }, (_, i) => (
        <div key={i} className="typing-dot" />
      ))}
    </div>
  );
};

// =================== 모달 ===================

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  className = '',
  ...props
}) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal-backdrop ${isClosing ? 'closing' : ''}`}
      onClick={closeOnBackdrop ? handleClose : undefined}
      {...props}
    >
      <div
        className={`modal-content ${isClosing ? 'closing' : ''} ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// =================== HOC & 훅 ===================

export const withAnimation = <P extends object>(
  Component: React.ComponentType<P>,
  animationClass: string,
  options: { delay?: number; duration?: number } = {},
): React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P & { trigger?: boolean }> & React.RefAttributes<any>
> => {
  const delayCls = toDelayClass(options.delay);
  const durationCls = toDurationClass(options.duration);

  return React.forwardRef<any, P & { trigger?: boolean }>((props, ref) => {
    const { trigger = true, ...rest } = props;
    const [active, setActive] = useState(false);

    useEffect(() => {
      if (trigger) {
        const t = setTimeout(() => setActive(true), 0);
        return () => clearTimeout(t);
      }
      // cleanup이 없는 경로도 명시적으로 반환
      return undefined;
    }, [trigger]);

    return (
      <div className={`${active ? animationClass : ''} ${delayCls} ${durationCls}`}>
        <Component ref={ref} {...(rest as P)} />
      </div>
    );
  });
};

export const useIntersectionAnimation = (options: IntersectionObserverInit = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState<Element | null>(null);

  const ref = useCallback((node: Element | null) => {
    setElementRef(node);
  }, []);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first && first.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(elementRef);
        }
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return [ref, isVisible] as const;
};

// =================== 내보내기 ===================

export default {
  LoadingSpinner,
  PulseLoader,
  SkeletonLoader,
  SuccessCheck,
  ErrorCross,
  FloatingNotification,
  Fade,
  AnimatedList,
  ProgressBar,
  CircularProgress,
  Heartbeat,
  TypingIndicator,
  Modal,
  withAnimation,
  useIntersectionAnimation,
};
