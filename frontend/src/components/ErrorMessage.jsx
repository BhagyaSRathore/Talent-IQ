import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="bg-error/10 border-l-4 border-error p-4 rounded-lg shadow-sm animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-error flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-error">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-error hover:text-error/80 transition-colors focus-ring rounded"
            aria-label="Close error message"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

