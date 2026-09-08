import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive';
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hoverGlow = false,
  ...props
}) => {
  const baseStyles = 'rounded-xl border transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm',
    glass: 'glass-panel border-white/40 dark:border-white/5 shadow-glass',
    interactive: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm interactive-card'
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-6 pb-4 border-b border-slate-100 dark:border-slate-800/60 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3 className={`text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p className={`text-sm text-slate-500 dark:text-slate-400 mt-1.5 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-6 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center ${className}`} {...props}>
    {children}
  </div>
);
