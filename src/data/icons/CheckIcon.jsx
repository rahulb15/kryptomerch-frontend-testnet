import React from 'react';

const CheckIcon = ({ size = 2, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 12 12" 
      fill="none"
      className={className}
    >
      <g clipPath="url(#check-clip)">
        <path 
          d="M3.31084 1.39353C3.54066 1.39353 3.77047 1.39001 3.99999 1.39529C4.08482 1.39706 4.14499 1.37299 4.20428 1.31077C4.48369 1.01638 4.7681 0.727275 5.05016 0.43553C5.60459 -0.137688 6.36712 -0.1462 6.93271 0.416158C7.22739 0.709077 7.52207 1.002 7.81293 1.29902C7.87927 1.36682 7.9456 1.39706 8.04216 1.39588C8.46745 1.3906 8.89274 1.39236 9.31803 1.39383C10.0632 1.39676 10.6015 1.93447 10.6054 2.67997C10.6074 3.11994 10.6077 3.5599 10.6039 3.99987C10.603 4.08469 10.6265 4.14486 10.6887 4.20386C10.9793 4.47975 11.2652 4.76093 11.5534 5.03976C12.1407 5.60828 12.1489 6.36142 11.5719 6.94403C11.2795 7.2393 10.986 7.53339 10.6896 7.82455C10.6291 7.88384 10.603 7.94312 10.6036 8.02883C10.6077 8.45911 10.6071 8.88909 10.6051 9.31937C10.6015 10.0649 10.063 10.6032 9.31833 10.6064C8.88805 10.6082 8.45806 10.609 8.02778 10.6049C7.94208 10.6041 7.88279 10.6305 7.8235 10.6909C7.52882 10.9909 7.23091 11.2873 6.93271 11.5838C6.36683 12.1461 5.60401 12.1379 5.04987 11.565C4.76781 11.2732 4.48311 10.9841 4.20398 10.6898C4.14469 10.6272 4.08452 10.6043 3.9997 10.6052C3.55974 10.609 3.11977 10.6085 2.6798 10.6067C1.93577 10.6038 1.3966 10.0643 1.39337 9.31937C1.39131 8.88909 1.39073 8.45881 1.39483 8.02883C1.39571 7.94342 1.37018 7.88354 1.30972 7.82425C1.00975 7.52957 0.713019 7.23166 0.416872 6.93346C-0.146954 6.36582 -0.138442 5.60652 0.435656 5.05179C0.727401 4.76974 1.01621 4.48474 1.3103 4.20532C1.37253 4.14603 1.39571 4.08587 1.39483 4.00104C1.39102 3.56108 1.39131 3.12111 1.39337 2.68115C1.39689 1.93593 1.93547 1.39794 2.6798 1.39412C2.88995 1.39295 3.10011 1.39412 3.31026 1.39412L3.31084 1.39353Z" 
          fill="white"
        />
        <path 
          d="M5.54402 7.56157C5.3641 7.56832 5.21031 7.50404 5.08146 7.3793C4.76594 7.07288 4.44836 6.76852 4.13695 6.45799C3.87456 6.19618 3.87368 5.802 4.1261 5.55281C4.37293 5.3092 4.76007 5.31449 5.02158 5.56778C5.15131 5.6937 5.28368 5.81814 5.40138 5.95462C5.48562 6.05236 5.53316 6.03475 5.61535 5.95052C6.04885 5.50615 6.48911 5.06882 6.92644 4.62827C7.09696 4.45657 7.30007 4.3785 7.53898 4.43015C8.03354 4.5367 8.2208 5.11842 7.88151 5.49763C7.74473 5.65026 7.59387 5.79026 7.44858 5.93555C6.9822 6.40222 6.51494 6.86802 6.04973 7.33586C5.90944 7.47704 5.75036 7.57008 5.54373 7.56186L5.54402 7.56157Z" 
          fill="#7D7D7D"
        />
      </g>
      <defs>
        <clipPath id="check-clip">
          <rect width="11.9997" height="12" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckIcon;