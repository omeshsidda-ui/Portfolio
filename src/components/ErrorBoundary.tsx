import { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg text-ink flex flex-col items-center justify-center p-4 selection:bg-ink selection:text-bg font-sans">
          <div className="max-w-md text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-ink/10 rounded-full flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-ink" />
            </div>
            <h1 className="text-3xl font-heading font-bold uppercase tracking-tight">
              Oops! Something went wrong.
            </h1>
            <p className="text-ink/60">
              We've encountered an unexpected issue. Don't worry, your data is safe.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-bg font-medium rounded-full hover:bg-ink/90 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
