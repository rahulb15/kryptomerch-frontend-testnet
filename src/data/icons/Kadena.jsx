import React from 'react';

const KadenaLogo = ({ className, width = 21, height = 20 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 21 20" 
      className={`kadena-logo ${className || ''}`}
    >
      <path 
        className="kadena-logo-path"
        d="M20.1714 19.6241H13.1967L13.1905 19.618L13.1351 19.5748L4.50293 12.8342L8.03959 9.99997L20.116 19.5748L20.1714 19.6241Z" 
      />
      <path 
        className="kadena-logo-path"
        d="M20.1714 0.375824H13.1967L13.1905 0.381985L13.1351 0.425115L4.50293 7.16572L8.03959 9.99998L20.116 0.425115L20.1714 0.375824Z" 
      />
      <path 
        className="kadena-logo-path"
        d="M4.5029 10.4251V19.618L4.49674 19.6118L4.44129 19.5687L0.245354 16.2538L0.233032 16.2477L0.171417 16.1984V3.80158L0.233032 3.75229L0.245354 3.74613L4.44745 0.418954L4.5029 0.375824V10.4251Z" 
      />
    </svg>
  );
};

export default KadenaLogo;