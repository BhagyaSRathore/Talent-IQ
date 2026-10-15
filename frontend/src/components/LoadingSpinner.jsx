import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Loader2 className={`${sizes[size]} text-primary animate-spin`} />
      {text && <p className="text-text-secondary font-medium">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;

