import Button from './Button';
import { HiRefresh } from 'react-icons/hi';

const ErrorState = ({ title = 'Something went wrong', message = 'An error occurred. Please try again.', onRetry, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-danger-50 flex items-center justify-center mb-4">
        <span className="text-3xl">⚠️</span>
      </div>
      <h3 className="text-lg font-semibold text-navy-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm mb-6">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} icon={HiRefresh}>
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
