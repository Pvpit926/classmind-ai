import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-accent-600 text-white hover:bg-accent-700 shadow-sm hover:shadow-md focus:ring-accent-500',
    secondary: 'bg-white text-navy-800 border border-gray-200 hover:bg-gray-50 shadow-sm focus:ring-accent-500',
    ghost: 'text-accent-600 hover:bg-accent-50 focus:ring-accent-500',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 shadow-sm focus:ring-danger-500',
    success: 'bg-success-500 text-white hover:bg-success-600 shadow-sm focus:ring-success-500',
    outline: 'border-2 border-accent-600 text-accent-600 hover:bg-accent-50 focus:ring-accent-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
      {IconRight && !loading && <IconRight className="w-4 h-4" />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
