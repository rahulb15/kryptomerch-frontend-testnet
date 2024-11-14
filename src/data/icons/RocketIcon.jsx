import React from 'react';

const RocketIcon = ({ size = 20, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 20 20"
      className={className}
      fill="none"
    >
      <path 
        d="M3.61102 7.96745L5.55417 8.78955C5.78668 8.32453 6.0275 7.87611 6.27662 7.4443C6.52574 7.01249 6.79977 6.58068 7.09872 6.14887L5.70364 5.87484L3.61102 7.96745ZM7.14854 10.0352L9.98852 12.8502C10.6861 12.5845 11.4334 12.1776 12.2306 11.6295C13.0278 11.0815 13.7752 10.4587 14.4727 9.76113C15.6353 8.59856 16.5446 7.30728 17.2006 5.88729C17.8566 4.4673 18.1431 3.15942 18.06 1.96364C16.8643 1.8806 15.5522 2.16709 14.1239 2.8231C12.6956 3.47912 11.4002 4.38841 10.2376 5.55098C9.54011 6.24852 8.9173 6.99588 8.36924 7.79307C7.82117 8.59026 7.41427 9.33762 7.14854 10.0352ZM11.5829 8.41587C11.2009 8.03389 11.0099 7.56471 11.0099 7.00834C11.0099 6.45197 11.2009 5.98279 11.5829 5.6008C11.9649 5.21882 12.4382 5.02783 13.0029 5.02783C13.5676 5.02783 14.0409 5.21882 14.4229 5.6008C14.8049 5.98279 14.9959 6.45197 14.9959 7.00834C14.9959 7.56471 14.8049 8.03389 14.4229 8.41587C14.0409 8.79786 13.5676 8.98885 13.0029 8.98885C12.4382 8.98885 11.9649 8.79786 11.5829 8.41587ZM12.0562 16.4127L14.1488 14.32L13.8748 12.925C13.443 13.2239 13.0112 13.4938 12.5794 13.7346C12.1476 13.9754 11.6992 14.2121 11.2341 14.4446L12.0562 16.4127ZM19.8537 0.145053C20.1693 2.15463 19.9741 4.11023 19.2683 6.01185C18.5624 7.91348 17.3459 9.72791 15.6187 11.4551L16.1169 13.9214C16.1833 14.2536 16.1667 14.5775 16.0671 14.893C15.9674 15.2086 15.8013 15.4826 15.5688 15.7151L11.3836 19.9004L9.29099 14.9927L5.03101 10.7327L0.12333 8.64008L4.28365 4.45485C4.51616 4.22233 4.79435 4.05625 5.11821 3.9566C5.44206 3.85696 5.77007 3.84035 6.10224 3.90678L8.56853 4.40502C10.2958 2.67778 12.1061 1.45709 13.9994 0.742943C15.8927 0.0287963 17.8441 -0.170501 19.8537 0.145053ZM1.89209 13.8965C2.47337 13.3153 3.18337 13.0205 4.02207 13.0122C4.86078 13.0039 5.57078 13.2903 6.15206 13.8716C6.73334 14.4529 7.01983 15.1629 7.01153 16.0016C7.00322 16.8403 6.70843 17.5503 6.12715 18.1316C5.71195 18.5468 5.01856 18.9039 4.04699 19.2028C3.07541 19.5018 1.73431 19.7675 0.0236816 20C0.256195 18.2894 0.521924 16.9483 0.820869 15.9767C1.11981 15.0051 1.47689 14.3117 1.89209 13.8965ZM3.31208 15.2916C3.146 15.4577 2.97992 15.7608 2.81384 16.2009C2.64776 16.641 2.5315 17.0853 2.46507 17.5337C2.91349 17.4673 3.35775 17.3552 3.79787 17.1974C4.23798 17.0396 4.54108 16.8777 4.70716 16.7116C4.90645 16.5123 5.01441 16.2715 5.03101 15.9892C5.04762 15.7068 4.95628 15.466 4.75698 15.2667C4.55768 15.0674 4.31687 14.9719 4.03453 14.9802C3.75219 14.9885 3.51138 15.0923 3.31208 15.2916Z"
        fill="url(#rocket-gradient)"
      />
      <defs>
        <linearGradient
          id="rocket-gradient"
          x1="-212.679"
          y1="19.9648"
          x2="-195.179"
          y2="68.1253"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6D7020" />
          <stop offset="1" stopColor="#DADF43" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RocketIcon;