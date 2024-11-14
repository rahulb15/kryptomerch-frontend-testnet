import React from 'react';

const EthereumLogo = ({ className, width = 13, height = 20 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 13 20" 
      className={`ethereum-logo ${className || ''}`}
    >
      <path 
        className="ethereum-logo-path"
        d="M6.3168 0L6.18216 0.456075V13.6803L6.3168 13.8143L12.455 10.1855L6.3168 0Z" 
      />
      <path 
        className="ethereum-logo-path"
        d="M6.31679 0L0.177917 10.1855L6.31679 13.8143V7.39555V0Z" 
      />
      <path 
        className="ethereum-logo-path"
        d="M6.31679 14.9766L6.24089 15.0683V19.7789L6.31679 20L12.459 11.3497L6.31679 14.9766Z" 
      />
      <path 
        className="ethereum-logo-path"
        d="M6.31679 20V14.9766L0.177917 11.3497L6.31679 20Z" 
      />
      <path 
        className="ethereum-logo-path"
        d="M6.31679 13.8143L12.455 10.1855L6.31679 7.39554V13.8143Z" 
      />
      <path 
        className="ethereum-logo-path"
        d="M0.177917 10.1855L6.31679 13.8143V7.39554L0.177917 10.1855Z" 
      />
    </svg>
  );
};

export default EthereumLogo;