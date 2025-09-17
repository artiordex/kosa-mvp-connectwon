/**
 * Description : web-types - 📌 WEB 컴포넌트 관련 타입정의
 * Author : Shiwoo Min
 * Date : 2025-09-07
 */

// 공통 컴포넌트 인터페이스
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 버튼, 카드, 폼 필드 등 주요 컴포넌트 인터페이스
export interface ButtonProps extends ComponentProps {
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

// 카드 컴포넌트 인터페이스
export interface CardProps extends ComponentProps {
  title?: string;
  description?: string;
}

// 폼 필드 컴포넌트 인터페이스
export interface FormFieldProps extends ComponentProps {
  label: string;
  error?: string;
  required?: boolean;
}

// 페이지 관련 타입
export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
