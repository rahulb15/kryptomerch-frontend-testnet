import React from 'react';

const PolygonLogo = ({ className, width = 23, height = 20 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 23 20" 
      className={`polygon-logo ${className || ''}`}
    >
      <path 
        className="polygon-logo-path"
        d="M9.07627 6.79064L7.00277 5.58632L0.782959 9.19928V16.4L7.00277 20L13.2226 16.4V5.20214L16.6741 3.20357L20.1256 5.20214V9.19996L16.6741 11.1985L14.6006 9.99421V13.1971L16.6741 14.4014L22.8939 10.8014V3.60001L16.6741 0L10.4543 3.60001V14.7985L7.00277 16.7971L3.55126 14.7985V10.7885L7.00277 8.78989L9.07627 9.99421V6.79132V6.79064Z" 
      />
    </svg>
  );
};

export default PolygonLogo;