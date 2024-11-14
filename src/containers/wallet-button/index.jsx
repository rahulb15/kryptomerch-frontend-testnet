/* eslint-disable */
import { useState } from "react";
import Link from "next/link";

const ConnectButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  console.log('isPressed', isPressed);

  return (
    <Link 
      href="/connect" 
      className="custom-connect-wrapper"
    >
      <button
        className={`custom-connect-button ${isPressed ? 'custom-connect-button--pressed' : ''}`}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
      >
        <span className="custom-connect-text">
          Connect Wallet
        </span>
      </button>
    </Link>
  );
};

export default ConnectButton;