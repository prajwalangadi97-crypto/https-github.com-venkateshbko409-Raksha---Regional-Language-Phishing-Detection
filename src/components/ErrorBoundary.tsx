import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ShieldAlert, RefreshCw, Bug } from 'lucide-react';

/**
 * ErrorBoundary — Catches runtime React errors and shows a branded fallback
 * instead of a white screen of death. Essential for production apps.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[Raksha AI] Runtime Error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 cyber-grid p-6">
          <div className="max-w-md w-full figma-card p-8 text-center space-y-6">
            {/* Shield icon */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20">
              <ShieldAlert className="h-8 w-8 text-red-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                System Protection Activated
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Raksha AI detected an unexpected error and has safely contained it.
                Your data is secure.
              </p>
            </div>

            {/* Error details (collapsed) */}
            {this.state.error && (
              <details className="text-left">
                <summary className="cursor-pointer text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5">
                  <Bug className="h-3 w-3" />
                  Technical Details
                </summary>
                <pre className="mt-2 rounded-lg bg-slate-900 border border-slate-800 p-3 text-[11px] font-mono text-red-400 overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
              >
                <RefreshCw className="h-4 w-4" />
                Reload Application
              </button>
              <a
                href="tel:1930"
                className="flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-2 text-xs font-bold text-red-300 transition-all hover:bg-red-900/40"
              >
                If you are in danger, call 1930 immediately
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
