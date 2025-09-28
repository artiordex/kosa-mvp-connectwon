/**
 * Description : Card.tsx - 📌 카드 레이아웃 컴포넌트
 * Author : Shiwoo Min
 * Date : 2025-09-09
 */
import { forwardRef, type HTMLAttributes } from 'react';
import type { CardContentProps, CardDescriptionProps, CardFooterProps, CardProps, CardTitleProps } from '@connectwon/ui/ui-types';

// Card 컴포넌트
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`cw-card ${className}`} {...props} />
));

Card.displayName = 'Card';

// CardHeader 컴포넌트
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';

// CardTitle 컴포넌트
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className = '', ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
      {...props}
    />
  ),
);

CardTitle.displayName = 'CardTitle';

// CardDescription 컴포넌트
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className = '', ...props }, ref) => (
    <p ref={ref} className={`text-sm text-text-muted ${className}`} {...props} />
  ),
);

CardDescription.displayName = 'CardDescription';

// CardContent 컴포넌트
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
  ),
);

CardContent.displayName = 'CardContent';

// CardFooter 컴포넌트
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className}`} {...props} />
  ),
);

CardFooter.displayName = 'CardFooter';
