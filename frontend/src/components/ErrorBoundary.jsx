import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // In production, send to error tracking service (e.g., Sentry)
    if (import.meta.env.PROD) {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-2xl w-full">
            <div className="card p-8 md:p-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-red-100 text-red-600 mb-6">
                <AlertTriangle className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl font-bold text-slate-800 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-lg text-slate-600 mb-6">
                We encountered an unexpected error. Don't worry, your data is safe.
              </p>

              {!import.meta.env.PROD && this.state.error && (
                <div className="mb-6 p-4 bg-slate-100 rounded-lg text-left overflow-auto max-h-64">
                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    Error Details (Development Mode):
                  </p>
                  <pre className="text-xs text-red-600 whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={this.handleReset}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  <span>Try Again</span>
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>Go to Homepage</span>
                </button>
              </div>

              <p className="mt-6 text-sm text-slate-500">
                If this problem persists, please contact support
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
