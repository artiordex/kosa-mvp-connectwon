/**
 * Description : Animation.tsx - 📌 ConnectWon UI 애니메이션 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import React, { useCallback, useEffect, useState } from 'react';

import type {
  AnimatedListProps,
  AnimationModalProps,
  CircularProgressProps,
  ErrorCrossProps,
  FadeProps,
  FloatingNotificationProps,
  HeartbeatProps,
  LoadingSpinnerProps,
  ProgressBarProps,
  PulseLoaderProps,
  SkeletonLoaderProps,
  SuccessCheckProps,
  TypingIndicatorProps,
} from '../../ui-types.js';

// 딜레이 클래스 변환 유틸
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

// 지속시간 클래스 변환 유틸
function toDurationClass(ms = 800): string {
  if (ms <= 300) return 'duration-fast';
  if (ms <= 500) return 'duration-normal';
  if (ms <= 800) return 'duration-slow';
  return 'duration-slower';
}

// CSS custom properties 생성 헬퍼
function createCSSProps(
  props: Record<string, string | number | undefined>,
): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      result[`--${key}` as string] = typeof value === 'number' ? `${value}px` : value;
    }
  });
  return result;
}

// 로딩 스피너 컴포넌트
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color,
  thickness,
  className = '',
  ...props
}) => {
  const sizeCls =
    typeof size === 'string'
      ? size === 'small'
        ? 'w-4 h-4'
        : size === 'large'
          ? 'w-12 h-12'
          : 'w-8 h-8'
      : 'w-8 h-8';

  const customProps = createCSSProps({
    'spinner-size': typeof size === 'number' ? size : undefined,
    'spinner-color': color,
    'spinner-thickness': thickness,
  });

  return <div className={`loading-spinner ${sizeCls} ${className}`} {...customProps} {...props} />;
};

// 펄스 로더 컴포넌트
export const PulseLoader: React.FC<PulseLoaderProps> = ({
  count = 3,
  color,
  className = '',
  ...props
}) => {
  const dots = Math.max(1, Math.min(3, count));
  const customProps = createCSSProps({ 'dot-color': color });

  return (
    <div className={`pulse-loader ${className}`} {...customProps} {...props}>
      {Array.from({ length: dots }, (_, i) => (
        <div key={i} className="pulse-dot" />
      ))}
    </div>
  );
};

// 스켈레톤 로더 컴포넌트
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'rectangular',
  lines = 1,
  width,
  height,
  className = '',
  ...props
}) => {
  const itemCls = `skeleton-loader skeleton-loader--${variant}`;
  const customProps = createCSSProps({
    'skeleton-width': width,
    'skeleton-height': height,
  });

  if (lines > 1) {
    return (
      <div className={className} {...customProps} {...props}>
        {Array.from({ length: lines }, (_, i) => (
          <div key={i} className={itemCls} />
        ))}
      </div>
    );
  }

  return <div className={`${itemCls} ${className}`} {...customProps} {...props} />;
};

// 성공 체크 컴포넌트
export const SuccessCheck: React.FC<SuccessCheckProps> = ({
  size = 'medium',
  color,
  onAnimationEnd,
  className = '',
  ...props
}) => {
  const sizeCls =
    typeof size === 'string' ? (size === 'small' ? 'w-6 h-6' : 'w-10 h-10') : 'w-10 h-10';

  const customProps = createCSSProps({
    'check-size': typeof size === 'number' ? size : undefined,
    'check-color': color,
  });

  return (
    <div
      className={`success-check ${sizeCls} ${className}`}
      onAnimationEnd={onAnimationEnd}
      {...customProps}
      {...props}
    />
  );
};

// 에러 크로스 컴포넌트
export const ErrorCross: React.FC<ErrorCrossProps> = ({
  size = 'medium',
  color,
  onAnimationEnd,
  className = '',
  ...props
}) => {
  const sizeCls =
    typeof size === 'string' ? (size === 'small' ? 'w-6 h-6' : 'w-10 h-10') : 'w-10 h-10';

  const customProps = createCSSProps({
    'cross-size': typeof size === 'number' ? size : undefined,
    'cross-color': color,
  });

  return (
    <div
      className={`error-cross ${sizeCls} ${className}`}
      onAnimationEnd={onAnimationEnd}
      {...customProps}
      {...props}
    />
  );
};

// 플로팅 알림 컴포넌트
export function FloatingNotification({
  children,
  type = 'success',
  duration = 3000,
  position = 'top-right',
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
    return undefined;
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      className={`floating-notification floating-notification--${type} floating-notification--${position} ${className}`}
      {...props}
    >
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

// 애니메이션 래퍼
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

// 애니메이션 리스트 컴포넌트
export const AnimatedList: React.FC<AnimatedListProps> = ({
  children,
  direction = 'left',
  stagger,
  className = '',
  ...props
}) => {
  const dirCls = `fade-in-${direction}`;

  return (
    <div className={className} {...props}>
      {React.Children.map(children, child => (
        <div className={`list-item-animate ${dirCls}`}>{child}</div>
      ))}
    </div>
  );
};

// 프로그레스 바 컴포넌트
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  animated = true,
  color,
  backgroundColor,
  height,
  showLabel = false,
  className = '',
  ...props
}) => {
  const customProps = createCSSProps({
    'progress-height': height,
    'progress-bg': backgroundColor,
    'progress-color': color,
    'progress-value': progress ? `${progress}%` : undefined,
  });

  return (
    <div className={className} {...customProps} {...props}>
      {showLabel && <div className="progress-label">Loading…</div>}
      <div className="progress-container h-2 bg-gray-200 rounded">
        <div className={`progress-bar ${animated ? 'animate' : ''} bg-blue-500 h-full rounded`} />
      </div>
    </div>
  );
};

// 원형 프로그레스 컴포넌트
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 60,
  strokeWidth = 4,
  color,
  backgroundColor,
  showLabel = false,
  className = '',
  ...props
}) => {
  const radius = (size - strokeWidth) / 2;
  const customProps = createCSSProps({
    'circle-color': color,
    'circle-bg': backgroundColor,
  });

  return (
    <div className={className} {...customProps} {...props}>
      <svg
        width={size}
        height={size}
        className="circular-progress"
        role="progressbar"
        aria-label={showLabel ? 'Loading…' : undefined}
      >
        <circle
          className="track stroke-gray-200"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress stroke-blue-500"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
      </svg>
      {showLabel && <div className="circular-progress-label">Loading…</div>}
    </div>
  );
};

// 하트비트 애니메이션 컴포넌트
export const Heartbeat: React.FC<HeartbeatProps> = ({
  children,
  fast = false,
  active = true,
  className = '',
  ...props
}) => {
  const heartbeatClass = active ? (fast ? 'heartbeat-fast' : 'heartbeat') : '';

  return (
    <div className={`${heartbeatClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

// 타이핑 인디케이터 컴포넌트
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  dotCount = 3,
  dotColor,
  className = '',
  ...props
}) => {
  const dots = Math.max(1, Math.min(3, dotCount));
  const customProps = createCSSProps({ 'dot-color': dotColor });

  return (
    <div className={`typing-indicator ${className}`} {...customProps} {...props}>
      {Array.from({ length: dots }, (_, i) => (
        <div key={i} className="typing-dot" />
      ))}
    </div>
  );
};

// 모달 컴포넌트
export const Modal: React.FC<AnimationModalProps> = ({
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

// HOC & 훅
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
      return undefined;
    }, [trigger]);

    return (
      <div className={`${active ? animationClass : ''} ${delayCls} ${durationCls}`}>
        <Component ref={ref} {...(rest as P)} />
      </div>
    );
  });
};

// 인터섹션 옵저버 훅
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

// 내보내기
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
