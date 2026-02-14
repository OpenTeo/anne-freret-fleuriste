import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-accent text-primary hover:bg-accent/90 focus:ring-accent',
    secondary: 'bg-secondary text-primary hover:bg-secondary/90 focus:ring-secondary',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-primary focus:ring-accent',
    ghost: 'text-primary hover:bg-primary/10 focus:ring-primary',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-6 py-2.5 text-base rounded-lg',
    lg: 'px-8 py-3.5 text-lg rounded-xl',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}