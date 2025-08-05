import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "20px",
          textAlign: "center",
          color: "#c770f0"
        }}>
          <h2 style={{ marginBottom: "20px", color: "#c770f0" }}>
            Oops! Something went wrong
          </h2>
          <p style={{ marginBottom: "20px", maxWidth: "600px", color: "#fff" }}>
            We apologize for the inconvenience. The page encountered an unexpected error.
            Please try refreshing the page or navigate back to the home page.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "10px 20px",
                backgroundColor: "#c770f0",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Refresh Page
            </button>
            <button
              onClick={() => window.location.href = "/"}
              style={{
                padding: "10px 20px",
                backgroundColor: "transparent",
                color: "#c770f0",
                border: "2px solid #c770f0",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Go Home
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ 
              marginTop: "20px", 
              padding: "10px", 
              backgroundColor: "#f1f1f1", 
              borderRadius: "5px",
              maxWidth: "800px",
              overflow: "auto"
            }}>
              <summary style={{ cursor: "pointer", color: "#333" }}>
                Error Details (Development Mode)
              </summary>
              <pre style={{ 
                marginTop: "10px", 
                fontSize: "12px", 
                color: "#666",
                whiteSpace: "pre-wrap"
              }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;