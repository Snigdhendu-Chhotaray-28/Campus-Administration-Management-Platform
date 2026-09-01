import React, { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', type = 'text', label, error, helperText, icon, id, ...props }, ref) => {
    const defaultId = useId();
    const inputId = id || defaultId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={`w-full rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sm py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-950 ${
              icon ? 'pl-11' : ''
            } ${
              error
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-500/50'
                : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-rose-500 font-medium">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <label
    className={`text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 uppercase ${className}`}
    {...props}
  >
    {children}
  </label>
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }
>(({ className = '', label, error, ...props }, ref) => {
  const defaultId = useId();
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={defaultId}
          className="text-xs font-semibold tracking-wide text-slate-700 dark:text-slate-300 uppercase"
        >
          {label}
        </label>
      )}
      <textarea
        id={defaultId}
        ref={ref}
        className={`w-full rounded-lg border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-sm py-2.5 px-3.5 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-slate-100 disabled:opacity-50 ${
          error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-500/50'
            : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-rose-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
