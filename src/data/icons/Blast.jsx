import React from 'react';

const BlastIcon = ({ className, width = 21, height = 14 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 21 14" 
      className={`ethereum-icon ${className || ''}`}
    >
      <path 
        className="ethereum-icon-path"
        d="M0.177917 2.87365L3.48229 0.406002C8.29314 0.325287 13.128 0.396143 17.9475 0.370265L18.0565 0.411547L20.1779 1.96977L19.0904 5.31358L15.9419 6.88228L18.0479 8.50089L16.9333 12.0178L13.7269 13.634H1.50386L4.75956 3.32529L6.95919 4.96608L5.00047 11.0714H14.555L15.64 7.72578H8.79776L9.48106 5.67464L16.3005 5.67279L17.1779 2.87304H0.177917V2.87365Z" 
      />
    </svg>
  );
};

export default BlastIcon;