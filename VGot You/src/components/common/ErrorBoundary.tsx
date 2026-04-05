import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
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
        <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-6 border border-red-600/20">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">System Diagnostic: Error Detected</h1>
          <p className="text-zinc-500 max-w-md mb-8 text-sm leading-relaxed">
            The application encountered an unexpected exception. Our technical team has been notified.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-red-600 text-white font-bold text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-red-700 transition-all"
          >
            Reboot System
          </button>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-12 p-4 bg-zinc-900 rounded border border-zinc-800 text-left max-w-2xl overflow-auto">
              <p className="text-red-400 font-mono text-[10px] mb-2">DEBUG_LOG:</p>
              <pre className="text-zinc-400 font-mono text-[10px] whitespace-pre-wrap">
                {this.state.error?.toString()}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
