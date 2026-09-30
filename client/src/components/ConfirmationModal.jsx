import Button from './Button';
import Modal from './Modal';
import { HiExclamation } from 'react-icons/hi';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={false}>
      <div className="text-center">
        <div className={`w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center ${
          variant === 'danger' ? 'bg-danger-50' : 'bg-warning-50'
        }`}>
          <HiExclamation className={`w-7 h-7 ${variant === 'danger' ? 'text-danger-500' : 'text-warning-500'}`} />
        </div>
        <h3 className="text-lg font-bold text-navy-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
