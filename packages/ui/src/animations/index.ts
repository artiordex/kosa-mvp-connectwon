/**
 * Description : AnimationComponents.tsx - 📌 Barrel file for animation components & types.
 * Author : Shiwoo Min
 * Date : 2025-09-16
 */

// Re-export components & hooks
export {
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
} from './Animation';

// Re-export types
export type {
  BaseAnimationProps,
  LoadingSpinnerProps,
  PulseLoaderProps,
  SuccessCheckProps,
  ErrorCrossProps,
  SkeletonLoaderProps,
  FloatingNotificationProps,
  AnimatedListProps,
  ProgressBarProps,
  CircularProgressProps,
  TypingIndicatorProps,
  ModalProps,
  FadeProps,
  HeartbeatProps,
} from './Animation';

// Optional: default namespace export
export { default as animations } from './Animation';
