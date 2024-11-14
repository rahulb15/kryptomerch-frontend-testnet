import React from 'react';
import { Box } from '@mui/material';

const MusicWaveEffect = ({ isPlaying, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        ml: 1,
      }}
    >
      {[1, 2, 3].map((bar) => (
        <Box
          key={bar}
          component="span"
          sx={{
            display: 'inline-block',
            width: 2,
            height: isPlaying ? 16 : 4,
            backgroundColor: '#b2b500',
            mx: 0.5,
            transition: 'height 0.3s ease',
            animation: isPlaying ? `waveAnimation${bar} 0.8s infinite` : 'none',
            '@keyframes waveAnimation1': {
              '0%, 100%': { height: 4 },
              '50%': { height: 16 },
            },
            '@keyframes waveAnimation2': {
              '0%, 100%': { height: 16 },
              '50%': { height: 4 },
            },
            '@keyframes waveAnimation3': {
              '0%, 100%': { height: 8 },
              '50%': { height: 12 },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default MusicWaveEffect;