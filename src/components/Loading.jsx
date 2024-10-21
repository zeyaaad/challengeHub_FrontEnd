import React from 'react';
import './css/loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden"></span>
      </div>
      <p className="loading-text"></p>
    </div>
  );
};

export default Loading;
