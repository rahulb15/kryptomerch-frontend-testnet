import React from 'react';

const FantomLogo = ({ className, width = 16, height = 20 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 16 20" 
      className={`fantom-logo ${className || ''}`}
    >
      <path 
        className="fantom-logo-path"
        d="M6.96641 0.191732C7.4495 -0.0639106 8.18824 -0.0639106 8.67133 0.191732L13.615 2.79813C13.9072 2.95254 14.0674 3.17999 14.0956 3.41897H14.1013V16.5195C14.0956 16.7777 13.9328 17.0334 13.6157 17.2019L8.67197 19.8083C8.18888 20.0639 7.45014 20.0639 6.96705 19.8083L2.02335 17.2019C1.70877 17.0359 1.55692 16.7777 1.54859 16.5195V3.42218H1.55115C1.57358 3.18319 1.72542 2.95895 2.02335 2.80133L6.96641 0.191732ZM13.3145 10.7032L8.66877 13.1609C8.18568 13.4166 7.4495 13.4166 6.96385 13.1609L2.32897 10.7089V16.4811L6.96385 18.919C7.23935 19.065 7.52254 19.2086 7.80061 19.2137H7.81727C8.09534 19.2137 8.36251 19.0734 8.63481 18.9414L13.3145 16.458V10.7025V10.7032ZM0.769489 16.2363C0.769489 16.7393 0.828435 17.068 0.940558 17.3012C1.03602 17.4953 1.17954 17.6408 1.44031 17.8208L1.45441 17.8323C1.51079 17.8714 1.5755 17.9111 1.6511 17.9585L1.7408 18.0149L2.01887 18.1834L1.62291 18.8491L1.31089 18.6608L1.25771 18.6268C1.16801 18.5704 1.09177 18.523 1.02449 18.475C0.28063 17.9694 0.00576637 17.4191 0 16.2703V16.2363H0.769489ZM7.44374 7.21965C7.40722 7.23118 7.37326 7.24784 7.34251 7.26194L2.40714 9.8773C2.40137 9.87987 2.3956 9.88307 2.39304 9.88563L2.38728 9.8882L2.3956 9.89396L2.40714 9.89973L7.34251 12.5151C7.37326 12.5318 7.40722 12.5459 7.44374 12.5574V7.22029V7.21965ZM8.22989 7.21965V12.5567C8.26641 12.5452 8.30036 12.5286 8.33112 12.5145L13.2665 9.89909C13.2723 9.89653 13.278 9.89332 13.2806 9.89076L13.2831 9.8882L13.2748 9.88243L13.2633 9.87666L8.32791 7.2613C8.29972 7.2472 8.26641 7.23054 8.22989 7.21901V7.21965ZM13.3145 4.35441L8.87636 6.68594L13.3145 9.01748V4.35441ZM2.33153 4.35441V9.01748L6.76971 6.68594L2.33153 4.35441ZM8.32535 0.88818C8.06971 0.753632 7.60327 0.753632 7.34763 0.88818L2.40714 3.50098C2.40137 3.50355 2.3956 3.50675 2.39304 3.50931L2.38728 3.51188L2.3956 3.51764L2.40714 3.52341L7.34827 6.13557C7.60391 6.27012 8.07035 6.27012 8.32599 6.13557L13.2671 3.52341C13.2729 3.52085 13.2787 3.51764 13.2812 3.51508L13.2838 3.51252L13.2755 3.50675L13.2639 3.50098L8.32535 0.88818ZM14.0501 1.15279L14.3621 1.34116L14.4153 1.37512C14.505 1.4315 14.5812 1.47891 14.6485 1.52697C15.393 2.03248 15.6679 2.58285 15.6736 3.73228V3.76624H14.9041C14.9041 3.26328 14.8452 2.9346 14.7331 2.70138C14.6376 2.50725 14.4941 2.36181 14.2333 2.18177L14.2192 2.17024C14.1628 2.13115 14.0981 2.09143 14.0225 2.04402L13.9328 1.98763L13.6548 1.81913L14.0507 1.15343L14.0501 1.15279Z" 
      />
    </svg>
  );
};

export default FantomLogo;