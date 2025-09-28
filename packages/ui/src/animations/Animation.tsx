/**
 * Description : Animation.tsx - 📌 ConnectWon UI 애니메이션 React 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */
import React, { useCallback, useEffect, useState } from 'react';
import type { AnimatedListProps, CircularProgressProps, ErrorCrossProps, FadeProps, FloatingNotificationProps, HeartbeatProps, ProgressBarProps, PulseLoaderProps, SkeletonLoaderProps, SuccessCheckProps, TypingIndicatorProps } from '@connectwon/ui/ui-types';

/**
 * 딜레이 클래스 변환 유틸
 * @param ms - 지연 시간 (밀리초 단위)
 * @returns - 변환된 CSS delay 클래스
 */
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

/**
 * 지속시간 클래스 변환 유틸
 * @param ms - 지속 시간 (밀리초 단위)
 * @returns - 변환된 CSS duration 클래스
 */
function toDurationClass(ms = 800): string {
  if (ms <= 300) return 'duration-fast';
  if (ms <= 500) return 'duration-normal';
  if (ms <= 800) return 'duration-slow';
  return 'duration-slower';
}

/**
 * CSS custom properties 생성 헬퍼
 * @param props - CSS 속성 객체
 * @returns - CSS custom property로 변환된 객체
 */
function createCSSProps(props: Record<string, string | number | undefined>): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      result[`--${key}` as string] = typeof value === 'number' ? `${value}px` : value;
    }
  });
  return result;
}

/**
 * 펄스 로더 컴포넌트
 * @param count - 점의 수 (최대 3)
 * @param color - 점 색상
 * @param className - 추가 클래스명
 */
export const PulseLoader: React.FC<PulseLoaderProps> = ({ count = 3, color, className = '', ...props }) => {
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

/**
 * 스켈레톤 로더 컴포넌트
 * @param variant - 형태 ('rectangular' 또는 'circle')
 * @param lines - 라인 수
 * @param width - 너비
 * @param height - 높이
 * @param className - 추가 클래스명
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant = 'rectangular', lines = 1, width, height, className = '', ...props }) => {
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

/**
 * 성공 체크 컴포넌트
 * @param size - 크기 ('small' 또는 'large' 또는 숫자)
 * @param color - 색상
 * @param onAnimationEnd - 애니메이션 종료 콜백
 * @param className - 추가 클래스명
 */
export const SuccessCheck: React.FC<SuccessCheckProps> = ({ size = 'medium', color, onAnimationEnd, className = '', ...props }) => {
  const sizeCls = typeof size === 'string' ? (size === 'small' ? 'w-6 h-6' : 'w-10 h-10') : 'w-10 h-10';

  const customProps = createCSSProps({
    'check-size': typeof size === 'number' ? size : undefined,
    'check-color': color,
  });

  return <div className={`success-check ${sizeCls} ${className}`} onAnimationEnd={onAnimationEnd} {...customProps} {...props} />;
};

/**
 * 에러 크로스 컴포넌트
 * @param size - 크기 ('small' 또는 'large' 또는 숫자)
 * @param color - 색상
 * @param onAnimationEnd - 애니메이션 종료 콜백
 * @param className - 추가 클래스명
 */
export const ErrorCross: React.FC<ErrorCrossProps> = ({ size = 'medium', color, onAnimationEnd, className = '', ...props }) => {
  const sizeCls = typeof size === 'string' ? (size === 'small' ? 'w-6 h-6' : 'w-10 h-10') : 'w-10 h-10';

  const customProps = createCSSProps({
    'cross-size': typeof size === 'number' ? size : undefined,
    'cross-color': color,
  });

  return <div className={`error-cross ${sizeCls} ${className}`} onAnimationEnd={onAnimationEnd} {...customProps} {...props} />;
};

/**
 * 플로팅 알림 컴포넌트
 * @param children - 알림 내용
 * @param type - 알림 유형 ('success', 'error', 'info', 'warning')
 * @param duration - 알림 지속 시간 (밀리초 단위)
 * @param position - 알림 위치 ('top-right', 'top-left', 'bottom-right', 'bottom-left')
 * @param onClose - 알림 닫기 콜백
 * @param autoClose - 자동 닫기 여부
 * @param className - 추가 클래스명
 */
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
    <div className={`floating-notification floating-notification--${type} floating-notification--${position} ${className}`} {...props}>
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

/**
 * 애니메이션 래퍼 컴포넌트
 * @param children - 애니메이션을 적용할 자식 컴포넌트
 * @param direction - 페이드 방향 ('up', 'down', 'left', 'right')
 * @param delay - 지연 시간 (밀리초 단위)
 * @param duration - 지속 시간 (밀리초 단위)
 * @param trigger - 애니메이션 트리거
 * @param className - 추가 클래스명
 */
export const Fade: React.FC<FadeProps> = ({ children, direction = 'up', delay = 0, duration = 800, trigger = true, className = '', ...props }) => {
  const delayCls = toDelayClass(delay);
  const durationCls = toDurationClass(duration);
  const dirCls = trigger ? `fade-in-${direction}` : '';

  return (
    <div className={`${dirCls} ${delayCls} ${durationCls} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * 애니메이션 리스트 컴포넌트
 * @param children - 애니메이션을 적용할 자식 요소들
 * @param direction - 애니메이션 방향 ('left', 'right', 'up', 'down')
 * @param stagger - 지연 효과
 * @param className - 추가 클래스명
 */
export const AnimatedList: React.FC<AnimatedListProps> = ({ children, direction = 'left', stagger, className = '', ...props }) => {
  const dirCls = `fade-in-${direction}`;

  return (
    <div className={className} {...props}>
      {React.Children.map(children, child => (
        <div className={`list-item-animate ${dirCls}`}>{child}</div>
      ))}
    </div>
  );
};

/**
 * 프로그레스 바 컴포넌트
 * @param progress - 진행률 (0-100)
 * @param animated - 애니메이션 적용 여부
 * @param color - 색상
 * @param backgroundColor - 배경 색상
 * @param height - 높이
 * @param showLabel - 진행률 표시 여부
 * @param className - 추가 클래스명
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  animated = true,
  color = '#3b82f6', // Tailwind blue-500
  backgroundColor = '#e5e7eb', // Tailwind gray-200
  height = 8,
  showLabel = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`progress-wrapper ${className}`} style={{ backgroundColor, height }} {...props}>
      <div
        className={`progress-bar ${animated ? 'animate' : ''}`}
        style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          backgroundColor: color,
          height: '100%',
          borderRadius: 'inherit',
          transition: animated ? 'width 0.3s ease' : undefined,
        }}
      />
      {showLabel && <span className="progress-label">{Math.round(progress)}%</span>}
    </div>
  );
};

/**
 * 원형 프로그레스 컴포넌트
 * @param progress - 진행률 (0-100)
 * @param size - 크기
 * @param strokeWidth - 두께
 * @param color - 색상
 * @param backgroundColor - 배경 색상
 * @param showLabel - 진행률 표시 여부
 * @param className - 추가 클래스명
 */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress = 0,
  size = 60,
  strokeWidth = 4,
  color = '#3b82f6', // blue-500
  backgroundColor = '#e5e7eb', // gray-200
  showLabel = false,
  className = '',
  ...props
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`circular-progress-wrapper ${className}`} {...props}>
      <svg width={size} height={size}>
        {/* background track */}
        <circle className="track" cx={size / 2} cy={size / 2} r={radius} stroke={backgroundColor} strokeWidth={strokeWidth} fill="transparent" />
        {/* progress */}
        <circle
          className="progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      {showLabel && <div className="circular-progress-label">{Math.round(progress)}%</div>}
    </div>
  );
};

/**
 * 하트비트 애니메이션 컴포넌트
 * @param children - 애니메이션을 적용할 자식 컴포넌트
 * @param fast - 빠른 애니메이션 여부
 * @param active - 애니메이션 활성화 여부
 * @param className - 추가 클래스명
 */
export const Heartbeat: React.FC<HeartbeatProps> = ({ children, fast = false, active = true, className = '', ...props }) => {
  const heartbeatClass = active ? (fast ? 'heartbeat-fast' : 'heartbeat') : '';

  return (
    <div className={`${heartbeatClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * 타이핑 인디케이터 컴포넌트
 * @param dotCount - 점의 수 (최대 3)
 * @param dotColor - 점 색상
 * @param className - 추가 클래스명
 */
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ dotCount = 3, dotColor, className = '', ...props }) => {
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

/**
 * HOC & 훅 - 애니메이션을 추가한 고차 컴포넌트
 * @param Component - 애니메이션을 추가할 컴포넌트
 * @param animationClass - 애니메이션 클래스
 * @param options - 애니메이션 설정
 * @returns - 애니메이션이 적용된 컴포넌트
 */
export const withAnimation = <P extends object>(
  Component: React.ComponentType<P>,
  animationClass: string,
  options: { delay?: number; duration?: number } = {},
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & { trigger?: boolean }> & React.RefAttributes<any>> => {
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

/**
 * 인터섹션 옵저버 훅 - 스크롤 시 애니메이션을 위한 인터섹션 옵저버
 * @param options - IntersectionObserver 옵션
 * @returns - ref와 visibility 상태
 */
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

export default {
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
  withAnimation,
  useIntersectionAnimation,
};
