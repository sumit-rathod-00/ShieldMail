import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback?: string }>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{ fallback?: string }>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface the error in dev without leaking secrets
    console.error('[ShieldMail] Component crashed:', error);
    console.error('[ShieldMail] Component stack:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
          <div className="max-w-lg w-full bg-gray-900 border border-red-800 rounded-xl p-8 space-y-4">
            <h1 className="text-2xl font-bold text-red-400">ShieldMail failed to load this page</h1>
            <p className="text-gray-400 text-sm">An unexpected error occurred in a React component.</p>
            <pre className="bg-gray-950 border border-gray-800 rounded p-4 text-xs text-red-300 overflow-auto max-h-48 whitespace-pre-wrap">
              {this.state.error?.message ?? 'Unknown error'}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
            >
              Try refreshing this section
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
