/**
 * UI 컴포넌트 관련 타입
 */

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps extends ComponentProps {
  variant?: 'default' | 'outline' | 'secondary'
  size?: 'default' | 'sm' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

export interface CardProps extends ComponentProps {
  title?: string
  description?: string
}

export interface FormFieldProps extends ComponentProps {
  label: string
  error?: string
  required?: boolean
}

// 페이지 관련 타입
export interface PageProps {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
