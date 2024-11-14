import React from 'react';
import Image from 'next/image';
import { Box, IconButton } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import QrCodeIcon from '@mui/icons-material/QrCode';

const NftImageContainer = ({ data, handleImageClick, setIsFlipped, isFlipped }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '400px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Image
        src={data.tokenImage}
        alt={data.collectionName}
        layout="fill"
        objectFit="contain"
        onClick={handleImageClick}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderBottomLeftRadius: 8,
          transition: 'opacity 0.3s',
          opacity: 0.7,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleImageClick();
          }}
          sx={{ color: 'white' }}
        >
          <FullscreenIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderTopLeftRadius: 8,
          transition: 'opacity 0.3s',
          opacity: 0.7,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <IconButton
          sx={{ color: 'white' }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
        >
          <QrCodeIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NftImageContainer;