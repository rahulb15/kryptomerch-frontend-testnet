// Create a new file: src/components/PersistentAudioPlayer.js
import React, { useEffect } from 'react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import musicService from 'src/services/music.service';

export function PersistentAudioPlayer() {
    const {
        isPlaying,
        setIsPlaying,
        tracks,
        setTracks,
        currentTrackIndex,
        setCurrentTrackIndex,
        audioRef
    } = useAudioPlayer();

    // Fetch tracks only once when component mounts
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await musicService.getMusics();
                if (response.data.status === "success" && response.data.data.data.length > 0) {
                    const formattedTracks = response.data.data.data.map((track) => ({
                        id: track._id,
                        title: track.title || "Untitled",
                        artist: track.artist || "Unknown Artist",
                        coverUrl: track.coverImage?.ipfsUrl || "/assets-images/default-cover.jpg",
                        file: track.ipfsUrl,
                    }));
                    setTracks(formattedTracks);
                }
            } catch (error) {
                console.error("Error fetching music tracks:", error);
            }
        };

        fetchTracks();
    }, []);

    // Handle track ending
    useEffect(() => {
        if (!audioRef.current) return;

        const handleEnded = () => {
            const nextIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
            setCurrentTrackIndex(nextIndex);
        };

        audioRef.current.addEventListener('ended', handleEnded);
        return () => audioRef.current?.removeEventListener('ended', handleEnded);
    }, [currentTrackIndex, tracks.length]);

    // Update audio source when track changes
    useEffect(() => {
        if (!audioRef.current || !tracks.length) return;

        const currentTrack = tracks[currentTrackIndex];
        audioRef.current.src = currentTrack.file;
        
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
        }
    }, [currentTrackIndex, tracks]);

    return (
        <audio
            ref={audioRef}
            style={{ display: 'none' }}
        />
    );
}