import React from 'react';

const ArbitrumLogo = ({ className, width = 19, height = 20 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={width} 
      height={height} 
      viewBox="0 0 19 20" 
      className={`arbitrum-logo ${className || ''}`}
    >
      <path 
        className="arbitrum-logo-path"
        d="M17.4102 4.44313L10.0521 0.199645C9.82144 0.0639469 9.55844 -2.5204e-05 9.29545 -0.000671387C9.03245 -0.000671387 8.77785 0.0639469 8.53877 0.199645L1.18908 4.44313C0.716725 4.71517 0.428528 5.21144 0.428528 5.75617V14.2431C0.428528 14.7879 0.716725 15.2841 1.18908 15.5562L2.50536 16.3161L2.50213 16.3245L4.43163 17.4372L4.43421 17.4295L4.4368 17.4308L4.8678 16.2541L4.86393 16.2521L8.83472 5.37169C8.87478 5.2599 8.79465 5.14747 8.68287 5.14747L8.67511 5.15522H6.80958C6.67324 5.15522 6.54529 5.2431 6.49748 5.37169L2.93507 15.1381L1.81394 14.4906C1.72606 14.4428 1.6776 14.3465 1.6776 14.2502V5.75617C1.6776 5.65989 1.73382 5.56425 1.81394 5.51579L9.16362 1.27231C9.20369 1.2484 9.25151 1.23225 9.29997 1.23225V1.24C9.34779 1.24 9.39625 1.25615 9.43631 1.28006L16.786 5.52354C16.8739 5.57136 16.9223 5.66764 16.9223 5.76392V14.2509C16.9223 14.3472 16.8661 14.4428 16.786 14.4913L15.6713 15.1349L12.7267 7.06921V7.06146C12.6705 6.91736 12.4708 6.91736 12.4146 7.06146L11.4459 9.71985C11.422 9.79223 11.422 9.87171 11.4459 9.95183L13.7425 16.2489L12.9755 16.6922L11.0938 11.5298C11.0376 11.3857 10.8379 11.3857 10.7817 11.5298L9.81304 14.1882C9.78913 14.2606 9.78913 14.3401 9.81304 14.4202L11.0466 17.8062L9.43696 18.7354C9.3969 18.7593 9.34908 18.7755 9.30062 18.7755C9.25215 18.7755 9.20434 18.7593 9.16427 18.7354L7.56109 17.8101L12.0941 5.37298C12.1341 5.26119 12.054 5.14876 11.9422 5.14876V5.15651H10.0767C9.94034 5.15651 9.81239 5.24439 9.76458 5.37298L5.20123 17.8786L7.13073 18.9913L7.13203 18.9874L8.53941 19.8003C8.77139 19.9366 9.03568 20.0006 9.29997 20.0006C9.56426 20.0006 9.82015 19.9366 10.0605 19.8003L11.475 18.9835L11.4776 18.9913L13.4071 17.8786L13.4039 17.8695L14.1715 17.4262L14.1761 17.4379L16.1056 16.3251L16.101 16.3129L17.4109 15.5568C17.8832 15.2848 18.1714 14.7885 18.1714 14.2438V5.75617C18.1714 5.21144 17.8832 4.71517 17.4109 4.44313H17.4102Z" 
      />
    </svg>
  );
};

export default ArbitrumLogo;