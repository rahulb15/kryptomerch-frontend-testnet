import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Paper 
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const LikeDislikePage = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Like or Dislike
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
          <Box sx={{ textAlign: 'center' }}>
            <IconButton 
              color="primary" 
              onClick={handleLike} 
              aria-label="like"
            >
              <ThumbUpIcon fontSize="large" />
            </IconButton>
            <Typography>{likes}</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <IconButton 
              color="secondary" 
              onClick={handleDislike} 
              aria-label="dislike"
            >
              <ThumbDownIcon fontSize="large" />
            </IconButton>
            <Typography>{dislikes}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LikeDislikePage;