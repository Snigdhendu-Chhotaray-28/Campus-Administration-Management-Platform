import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  ...props
}) => {
  const baseStyles = 'bg-slate-200 dark:bg-slate-800 animate-pulse-slow';
  
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="h-10 w-10" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="text" className="w-1/2 h-3" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton variant="text" className="w-full h-3.5" />
        <Skeleton variant="text" className="w-5/6 h-3.5" />
        <Skeleton variant="text" className="w-2/3 h-3.5" />
      </div>
      <div className="flex justify-between items-center mt-4">
        <Skeleton variant="text" className="w-1/4 h-8" />
        <Skeleton variant="text" className="w-1/5 h-8" />
      </div>
    </div>
  );
};
