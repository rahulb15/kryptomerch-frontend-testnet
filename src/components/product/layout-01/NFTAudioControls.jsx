import React from 'react';
import { IconButton, Box, Tooltip } from '@mui/material';
import { FaPlay, FaPause, FaPlus } from 'react-icons/fa';
import { useAudioPlayer } from 'src/contexts/AudioPlayerContext';
import { motion } from 'framer-motion';

const NFTAudioControls = ({ nft }) => {
    const {
        isPlaying,
        getCurrentTrack,
        activePlaylist,
        handlePlayPause,
        playNftTrack,
        addNftTrack,
    } = useAudioPlayer();

    if (!nft?.nftData?.audio) return null;

    const currentTrack = getCurrentTrack();
    const isCurrentTrack = currentTrack?.id === nft._id && activePlaylist === 'nft';

    const handlePlay = (e) => {
        e.stopPropagation();
        
        if (isCurrentTrack) {
            handlePlayPause();
        } else {
            playNftTrack(nft);
        }
    };

    const handleAddToPlaylist = (e) => {
        e.stopPropagation();
        addNftTrack(nft);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                zIndex: 10,
                display: 'flex',
                gap: '8px',
            }}
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Tooltip title={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}>
                    <IconButton
                        onClick={handlePlay}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: isCurrentTrack ? '#b2b500' : '#fff',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                            width: '36px',
                            height: '36px',
                        }}
                    >
                        {isCurrentTrack && isPlaying ? (
                            <FaPause size={16} />
                        ) : (
                            <FaPlay size={16} />
                        )}
                    </IconButton>
                </Tooltip>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Tooltip title="Add to Playlist">
                    <IconButton
                        onClick={handleAddToPlaylist}
                        sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                            width: '36px',
                            height: '36px',
                        }}
                    >
                        <FaPlus size={16} />
                    </IconButton>
                </Tooltip>
            </motion.div>
        </Box>
    );
};

export default NFTAudioControls;