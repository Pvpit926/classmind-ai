import { useToast } from '../hooks/useToast';
import { HiCheckCircle, HiXCircle, HiExclamation, HiInformationCircle, HiX } from 'react-icons/hi';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const icons = {
    success: <HiCheckCircle className="w-5 h-5 text-success-500" />,
    error: <HiXCircle className="w-5 h-5 text-danger-500" />,
    warning: <HiExclamation className="w-5 h-5 text-warning-500" />,
    info: <HiInformationCircle className="w-5 h-5 text-accent-500" />,
  };

  const bgColors = {
    success: 'bg-success-50 border-success-200',
    error: 'bg-danger-50 border-danger-200',
    warning: 'bg-warning-50 border-warning-200',
    info: 'bg-accent-50 border-accent-200',
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2 max-w-sm w-full" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-soft animate-slide-in-left ${bgColors[toast.type]}`}
        >
          {icons[toast.type]}
          <p className="flex-1 text-sm font-medium text-navy-800">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Dismiss"
          >
            <HiX className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
