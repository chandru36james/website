import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-10 max-w-md w-full text-center space-y-5">
            <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-black text-slate-900 tracking-tight">
                Application Error
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                An unexpected error occurred. Your data is safe. Please refresh the page to continue.
              </p>
              {this.state.error && (
                <code className="block text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono mt-3 text-left break-words">
                  {this.state.error.message}
                </code>
              )}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Application
            </button>
            <p className="text-[10px] text-slate-400 font-mono">
              VGot You Finance v2.0.0 — Error captured in boundary
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
