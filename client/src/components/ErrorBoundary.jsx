import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚠</div>
            <h2>Something went wrong</h2>
            <p style={{ color: 'var(--text-muted)', margin: '8px 0 16px' }}>Please refresh the page and try again.</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh Page</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
