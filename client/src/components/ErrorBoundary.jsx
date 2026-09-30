import { Component } from 'react';
import Button from './Button';
import { HiExclamation } from 'react-icons/hi';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
            <div className="w-16 h-16 bg-danger-50 text-danger-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <HiExclamation className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-navy-800 font-display mb-2">Something went wrong.</h1>
            <p className="text-gray-500 text-sm mb-6">
              An unexpected error occurred. Please try refreshing the page or returning to your dashboard.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
              <Button onClick={() => window.location.href = '/'}>
                Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
