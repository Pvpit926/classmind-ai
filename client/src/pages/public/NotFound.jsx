import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { HiHome } from 'react-icons/hi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
        <div className="text-8xl font-bold text-accent-100 mb-6 font-display">404</div>
        <h1 className="text-2xl font-bold text-navy-800 font-display mb-2">Page Not Found</h1>
        <p className="text-gray-500 text-sm mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/')} icon={HiHome} className="w-full justify-center">
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
