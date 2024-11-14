const WalletIcon = () => {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 20 20" 
        fill="none"
        className="wallet-icon" // You can add className for styling
      >
        <g clipPath="url(#clip0_139_210)">
          <path 
            d="M16.0002 6.5009H12.841C12.4514 6.5009 11.7357 6.85958 11.4195 7.10705C9.7467 8.41905 9.97988 11.1778 11.8358 12.1692C12.0494 12.2834 12.6174 12.5003 12.8415 12.5003H16.0007V14.2065C16.0007 14.7896 15.2563 15.5005 14.6974 15.4995H2.09743C1.10365 15.3983 0.282506 14.6464 0.0612438 13.6264C-0.0594012 9.99354 0.0421695 6.33759 0.00926631 2.69567C0.11799 1.52044 1.01067 0.59468 2.13128 0.5L13.0108 0.51052C13.9483 0.753983 13.9445 2.05546 13.0108 2.29241L2.23953 2.30142C1.53616 2.40662 1.54761 3.43157 2.27386 3.50271L14.6965 3.5017C15.2554 3.5007 15.9997 4.21155 15.9997 4.79466V6.5009H16.0002Z" 
            fill="currentColor" // This allows the color to be controlled by CSS
          />
          <path 
            d="M16 7.70117V11.301H12.9123C12.0635 11.301 11.364 10.1754 11.4317 9.33277C11.4884 8.62443 12.2037 7.70117 12.9123 7.70117H16Z" 
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_139_210">
            <rect width="16" height="15" fill="white" transform="translate(0 0.5)"/>
          </clipPath>
        </defs>
      </svg>
    );
  };
  
  export default WalletIcon;