import React from 'react';
import './Loading.css';
import spinner from './spinner.gif';

function LoadingPage() {
  return (
    <div className="loading-page">
      <img src={spinner} alt="Loading..." />

    </div>
  );
}

export default LoadingPage;
