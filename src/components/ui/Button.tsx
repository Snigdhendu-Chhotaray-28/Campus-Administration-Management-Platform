import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 focus:ring-brand-primary',
    secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:ring-slate-400',
    accent: 'bg-brand-secondary text-white hover:bg-brand-secondary-hover shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/35 focus:ring-brand-secondary',
    outline: 'border-2 border-brand-primary/20 hover:border-brand-primary/60 text-brand-primary bg-transparent focus:ring-brand-primary',
    ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500',
    link: 'text-brand-primary hover:underline bg-transparent border-0 p-0 focus:ring-transparent focus:ring-offset-0 active:scale-100'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
      {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
    </button>
  );
};

Button.displayName = 'Button';
