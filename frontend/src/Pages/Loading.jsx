import React from 'react';
import './Loading.css'; // Import styles (optional)

const Loading = ({ message = "Loading...", size = "50px", color = "#007bff" }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid ${color}`,
    borderTop: `4px solid transparent`,
  };

  return (
    <div className="loading-container">
      <div className="loading-spinner" style={spinnerStyle}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default Loading;
