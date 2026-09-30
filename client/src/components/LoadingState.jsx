const LoadingState = ({ message = 'Loading...', size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className={`${sizes[size]} border-3 border-gray-200 border-t-accent-600 rounded-full animate-spin mb-4`}
        style={{ borderWidth: '3px' }}
      />
      <p className="text-gray-500 text-sm animate-pulse-soft">{message}</p>
    </div>
  );
};

export default LoadingState;
