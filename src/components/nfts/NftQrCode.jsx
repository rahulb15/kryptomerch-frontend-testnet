import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { QRCode } from 'react-qrcode-logo';
import CloseIcon from '@mui/icons-material/Close';

const NftQrCode = ({ data, qrSize, setIsFlipped, isFlipped }) => {
  return (
    <Box
      className="qr-code-container"
      sx={{
        width: '100%',
        height: '400px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          display: 'flex',
          gap: '10px',
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setIsFlipped(!isFlipped);
          }}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box 
        sx={{ 
          width: '80%', 
          maxWidth: '300px', 
          aspectRatio: '1/1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <QRCode
          value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/nft/${data.tokenId}`}
          size={Math.min(qrSize.width, qrSize.height) * 0.8}
          qrStyle="dots"
          eyeRadius={8}
          quietZone={10}
          bgColor="#f5f5f5"
          fgColor="#333333"
          logoImage="/assets-images/prodOwner2.png"
          logoWidth={50}
          logoHeight={50}
          logoPadding={2}
          logoPaddingStyle="circle"
          removeQrCodeBehindLogo={true}
        />
      </Box>
      <Typography variant="caption" sx={{ mt: 2, textAlign: 'center' }}>
        Scan to view NFT details
      </Typography>
    </Box>
  );
};

export default NftQrCode;