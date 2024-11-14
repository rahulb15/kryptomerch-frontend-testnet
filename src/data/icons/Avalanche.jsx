import React from 'react';

const AvalancheLogo = ({ className, width = 24, height = 20 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 24 20" 
      className={`avalanche-logo ${className || ''}`}
    >
      <path 
        className="avalanche-logo-path"
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M6.54965 20H2.76069C1.96444 20 1.57152 20 1.33133 19.8466C1.07239 19.6786 0.914112 19.4002 0.894674 19.0934C0.880096 18.8108 1.07725 18.4651 1.47017 17.7744L10.8259 1.28428C11.2237 0.583825 11.4257 0.233947 11.6798 0.104131C11.9533 -0.0347102 12.2796 -0.0347102 12.5524 0.104131C12.8065 0.233947 13.0078 0.583825 13.4063 1.28428L15.3292 4.64144L15.339 4.6588C15.7687 5.40993 15.9867 5.79104 16.0825 6.19091C16.188 6.62756 16.188 7.08782 16.0825 7.52447C15.9867 7.92711 15.7708 8.311 15.3341 9.07393L10.4198 17.7605L10.4073 17.7827C9.97485 18.5401 9.75549 18.924 9.45142 19.2135C9.12029 19.53 8.72251 19.7605 8.28586 19.8896C7.88808 20 7.44171 20 6.54965 20Z" 
      />
      <path 
        className="avalanche-logo-path"
        fillRule="evenodd" 
        clipRule="evenodd"
        d="M16.118 20H21.5473C22.3484 20 22.7511 20 22.9913 19.8417C23.2502 19.6737 23.4133 19.3905 23.4279 19.0836C23.4418 18.8101 23.2495 18.4776 22.8726 17.8271C22.8594 17.8049 22.8469 17.7827 22.833 17.7598L20.1138 13.1072L20.0826 13.0552C19.7007 12.4089 19.5078 12.0826 19.2599 11.9562C18.9864 11.8174 18.665 11.8174 18.3922 11.9562C18.1429 12.0861 17.9416 12.4262 17.5432 13.1121L14.833 17.7646L14.824 17.7806C14.4276 18.4651 14.229 18.8073 14.2436 19.0885C14.263 19.3953 14.4213 19.6786 14.6803 19.8466C14.9156 20 15.3182 20 16.1193 20H16.118Z" 
      />
    </svg>
  );
};

export default AvalancheLogo;