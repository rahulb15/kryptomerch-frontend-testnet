// Create a new component: src/components/FooterMusicStatus.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useAudioPlayer } from "src/contexts/AudioPlayerContext";
import { useUI } from "src/contexts/UIContext";

const MusicStatusContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 4px 12px;
    background: rgba(26, 26, 26, 0.6);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    cursor: pointer;
`;

const AlbumCover = styled(motion.div)`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const TrackInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 150px;
`;

const TrackTitle = styled(motion.span)`
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TrackArtist = styled(motion.span)`
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const WaveContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    height: 20px;
`;

const WaveLine = styled(motion.div)`
    width: 2px;
    background: #b2b500;
    border-radius: 2px;
`;

const FooterMusicStatus = () => {
    const { setIsPanelOpen } = useUI();
    const { isPlaying, tracks, currentTrackIndex } = useAudioPlayer();
    const currentTrack = tracks[currentTrackIndex];

    const waveVariants = {
        playing: (i) => ({
            height: [8, 16, 8],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.1,
            },
        }),
        stopped: {
            height: 8,
        },
    };

    const rotateVariants = {
        playing: {
            rotate: 360,
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "linear",
            },
        },
        stopped: {
            rotate: 0,
        },
    };

    if (!currentTrack) return null;

    return (
        <AnimatePresence>
            <MusicStatusContainer
                onClick={() => setIsPanelOpen(true)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <AlbumCover
                    animate={isPlaying ? "playing" : "stopped"}
                    variants={rotateVariants}
                >
                    <img
                        src={
                            currentTrack.coverUrl ||
                            "/assets-images/default-cover.jpg"
                        }
                        alt={currentTrack.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets-images/default-cover.jpg";
                        }}
                    />
                </AlbumCover>

                <TrackInfo>
                    <TrackTitle>{currentTrack.title}</TrackTitle>
                    <TrackArtist>{currentTrack.artist}</TrackArtist>
                </TrackInfo>

                <WaveContainer>
                    {[...Array(3)].map((_, i) => (
                        <WaveLine
                            key={i}
                            animate={isPlaying ? "playing" : "stopped"}
                            variants={waveVariants}
                            custom={i}
                            initial="stopped"
                        />
                    ))}
                </WaveContainer>
            </MusicStatusContainer>
        </AnimatePresence>
    );
};

export default FooterMusicStatus;
