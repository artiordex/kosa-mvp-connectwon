/**
 * Description : component-types.ts - 📌 UI 컴포넌트 타입 정의
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */

import { type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes, type HTMLAttributes, type FormHTMLAttributes, type ReactNode } from 'react';

// 공통 타입들
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type ComponentSize = 'default' | 'sm' | 'lg';
export type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type InputVariant = 'default' | 'error' | 'success';

// Button 컴포넌트 타입
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: ComponentSize | 'icon';
  loading?: boolean;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: ComponentSize;
  error?: string;
  label?: string;
  helperText?: string;
}

// Select 컴포넌트 타입
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  variant?: InputVariant;
  size?: ComponentSize;
  error?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
}

// Textarea 컴포넌트 타입
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  error?: string;
  label?: string;
  helperText?: string;
}

// Checkbox 컴포넌트 타입
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ComponentSize;
  label?: string;
  description?: string;
  error?: string;
}

// RadioGroup 컴포넌트 타입
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  options: RadioOption[];
  size?: ComponentSize;
  value?: string;
  defaultValue?: string;
  error?: string;
  label?: string;
  helperText?: string;
  orientation?: 'horizontal' | 'vertical';
  onValueChange?: (value: string) => void;
}

// Card 컴포넌트 타입들
export interface CardProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

// Modal 컴포넌트 타입
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: Size;
  showCloseButton?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
  children: ReactNode;
}

// ===== Drawer 컴포넌트 타입 =====
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  side?: 'left' | 'right';
  size?: Size;
  children: ReactNode;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
}

// ===== Container 컴포넌트 타입 =====
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

// ===== Grid 컴포넌트 타입 =====
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

// ===== Stack 컴포넌트 타입 =====
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

// ===== Divider 컴포넌트 타입 =====
export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string;
}

// ===== Field 컴포넌트 타입 =====
export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}

// ===== Form 컴포넌트 타입 =====
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  loading?: boolean;
  children: ReactNode;
}

// ===== PageHeader 컴포넌트 타입 =====
export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

// ===== Section 컴포넌트 타입 =====
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'muted' | 'soft';
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

// ===== Toolbar 컴포넌트 타입 =====
export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  size?: ComponentSize;
  variant?: 'default' | 'muted' | 'transparent';
  position?: 'static' | 'sticky' | 'fixed';
  title?: string;
  subtitle?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  centerContent?: ReactNode;
}

// ===== 이벤트 핸들러 타입들 =====
export type ClickHandler = () => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

// ===== 유틸리티 타입들 =====
export type WithLoading<T> = T & { loading?: boolean };
export type WithError<T> = T & { error?: string };
export type WithClassName<T> = T & { className?: string };

// ===== 접근성 관련 타입들 =====
export interface AriaProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-disabled'?: boolean;
  role?: string;
}
