import React from 'react';
import Image from 'next/image';

const ChainIcon = ({ chainId, icon, name, isActive, size = 20 }) => {
    console.log(chainId, "chainId");
  // Define color schemes for different states
  const colorSchemes = {
    default: {
      filter: 'grayscale(100%) opacity(0.5)',
      transition: 'filter 0.3s ease'
    },
    active: {
      filter: 'none',
      transition: 'filter 0.3s ease'
    },
    // Custom color filters for specific chains
    kadena: {
      filter: 'invert(43%) sepia(99%) saturate(1265%) hue-rotate(210deg) brightness(101%) contrast(101%)',
    },
    ethereum: {
      filter: 'invert(48%) sepia(99%) saturate(2779%) hue-rotate(215deg) brightness(97%) contrast(94%)',
    },
    solana: {
      filter: 'invert(59%) sepia(82%) saturate(473%) hue-rotate(108deg) brightness(96%) contrast(98%)',
    }
  };

  return (
    <div 
      className="chain-icon-wrapper"
      style={{
        position: 'relative',
        width: size,
        height: size,
        ...(!isActive ? colorSchemes.default : 
          colorSchemes[chainId] || colorSchemes.active)
      }}
    >
      <Image
        src={icon}
        alt={name}
        width={size}
        height={size}
        style={{
          filter: 'inherit',
          transition: 'inherit'
        }}
      />
    </div>
  );
};

export default ChainIcon;