import React from "react";

function LoadingSpinner() {
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        flexDirection: "column"
      }}
    >
      <div 
        className="loading-spinner"
        style={{
          width: "50px",
          height: "50px",
          border: "3px solid #f3f3f3",
          borderTop: "3px solid #c770f0",
          borderRadius: "50%"
        }}
      />
      <p style={{ color: "#c770f0", marginTop: "20px", fontSize: "16px" }}>
        Loading...
      </p>
    </div>
  );
}

export default LoadingSpinner;