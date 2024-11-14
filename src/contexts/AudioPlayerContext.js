// // // src/contexts/AudioPlayerContext.js
// // import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
// // import musicService from 'src/services/music.service';

// // const AudioPlayerContext = createContext();

// // export function AudioPlayerProvider({ children }) {
// //     const [isPlaying, setIsPlaying] = useState(false);
// //     const [tracks, setTracks] = useState([]);
// //     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
// //     const [currentTime, setCurrentTime] = useState(0);
// //     const [duration, setDuration] = useState(0);
// //     const [volume, setVolume] = useState(1);
// //     const [isMuted, setIsMuted] = useState(false);
// //     const [isLoading, setIsLoading] = useState(true);
// //     const audioRef = useRef(null);

// //     // Fetch tracks when provider mounts
// //     useEffect(() => {
// //         const fetchTracks = async () => {
// //             try {
// //                 const response = await musicService.getMusics();
// //                 if (response.data.status === "success" && response.data.data.data.length > 0) {
// //                     const formattedTracks = response.data.data.data.map((track) => ({
// //                         id: track._id,
// //                         title: track.title || "Untitled",
// //                         artist: track.artist || "Unknown Artist",
// //                         coverUrl: track.coverImage?.ipfsUrl || "/assets-images/default-cover.jpg",
// //                         file: track.ipfsUrl,
// //                     }));
// //                     setTracks(formattedTracks);
// //                 }
// //             } catch (error) {
// //                 console.error("Error fetching music tracks:", error);
// //             } finally {
// //                 setIsLoading(false);
// //             }
// //         };

// //         fetchTracks();
// //     }, []);

// //     // Handle time updates
// //     useEffect(() => {
// //         if (!audioRef.current) return;

// //         const handleTimeUpdate = () => {
// //             setCurrentTime(audioRef.current.currentTime || 0);
// //             setDuration(audioRef.current.duration || 0);
// //         };

// //         const handleEnded = () => {
// //             handleNext();
// //         };

// //         audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
// //         audioRef.current.addEventListener('ended', handleEnded);
// //         audioRef.current.addEventListener('loadedmetadata', handleTimeUpdate);

// //         return () => {
// //             if (audioRef.current) {
// //                 audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
// //                 audioRef.current.removeEventListener('ended', handleEnded);
// //                 audioRef.current.removeEventListener('loadedmetadata', handleTimeUpdate);
// //             }
// //         };
// //     }, []);

// //     // Update audio source when track changes
// //     useEffect(() => {
// //         if (!audioRef.current || !tracks.length) return;

// //         const currentTrack = tracks[currentTrackIndex];
// //         audioRef.current.src = currentTrack.file;
        
// //         if (isPlaying) {
// //             audioRef.current.play().catch(error => {
// //                 console.error("Error playing audio:", error);
// //                 setIsPlaying(false);
// //             });
// //         }
// //     }, [currentTrackIndex, tracks]);

// //     const handlePlayPause = () => {
// //         if (!audioRef.current || !tracks.length) return;

// //         if (isPlaying) {
// //             audioRef.current.pause();
// //         } else {
// //             audioRef.current.play().catch(error => {
// //                 console.error("Error playing audio:", error);
// //                 setIsPlaying(false);
// //             });
// //         }
// //         setIsPlaying(!isPlaying);
// //     };

// //     const handleNext = () => {
// //         setCurrentTrackIndex(prev => 
// //             prev < tracks.length - 1 ? prev + 1 : 0
// //         );
// //     };

// //     const handlePrevious = () => {
// //         setCurrentTrackIndex(prev => 
// //             prev > 0 ? prev - 1 : tracks.length - 1
// //         );
// //     };

// //     const handleSeek = (newTime) => {
// //         if (!audioRef.current) return;
// //         audioRef.current.currentTime = newTime;
// //         setCurrentTime(newTime);
// //     };

// //     const toggleMute = () => {
// //         if (!audioRef.current) return;
// //         const newMutedState = !isMuted;
// //         setIsMuted(newMutedState);
// //         audioRef.current.volume = newMutedState ? 0 : volume;
// //     };

// //     const value = {
// //         isPlaying,
// //         setIsPlaying,
// //         tracks,
// //         currentTrackIndex,
// //         currentTime,
// //         duration,
// //         volume,
// //         isMuted,
// //         isLoading,
// //         audioRef,
// //         handlePlayPause,
// //         handleNext,
// //         handlePrevious,
// //         handleSeek,
// //         toggleMute,
// //     };

// //     return (
// //         <AudioPlayerContext.Provider value={value}>
// //             {children}
// //             <audio
// //                 ref={audioRef}
// //                 style={{ display: 'none' }}
// //             />
// //         </AudioPlayerContext.Provider>
// //     );
// // }

// // export function useAudioPlayer() {
// //     const context = useContext(AudioPlayerContext);
// //     if (!context) {
// //         throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
// //     }
// //     return context;
// // }



// // src/contexts/AudioPlayerContext.js
// import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
// import musicService from 'src/services/music.service';

// const AudioPlayerContext = createContext();

// export function AudioPlayerProvider({ children }) {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [tracks, setTracks] = useState([]);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [volume, setVolume] = useState(1);
//     const [isMuted, setIsMuted] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const audioRef = useRef(null);

//     // Function to handle track ending and auto-advance
//     const handleTrackEnd = () => {
//         if (currentTrackIndex < tracks.length - 1) {
//             setCurrentTrackIndex(currentTrackIndex + 1);
//             setCurrentTime(0);
//         } else {
//             // If it's the last track, go back to the first track
//             setCurrentTrackIndex(0);
//             setCurrentTime(0);
//         }
//         // Maintain playing state
//         if (isPlaying) {
//             audioRef.current?.play().catch(error => {
//                 console.error("Error auto-playing next track:", error);
//                 setIsPlaying(false);
//             });
//         }
//     };

//     // Set up event listeners when component mounts
//     useEffect(() => {
//         if (!audioRef.current) return;

//         const audio = audioRef.current;

//         const handleTimeUpdate = () => {
//             setCurrentTime(audio.currentTime || 0);
//             setDuration(audio.duration || 0);
//         };

//         const handleEnded = () => {
//             handleTrackEnd();
//         };

//         const handleLoadedMetadata = () => {
//             setDuration(audio.duration);
//         };

//         // Add event listeners
//         audio.addEventListener('timeupdate', handleTimeUpdate);
//         audio.addEventListener('ended', handleEnded);
//         audio.addEventListener('loadedmetadata', handleLoadedMetadata);

//         // Cleanup
//         return () => {
//             audio.removeEventListener('timeupdate', handleTimeUpdate);
//             audio.removeEventListener('ended', handleEnded);
//             audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
//         };
//     }, [currentTrackIndex, tracks.length, isPlaying]); // Added dependencies

//     // Fetch tracks when provider mounts
//     useEffect(() => {
//         const fetchTracks = async () => {
//             try {
//                 const response = await musicService.getMusics();
//                 if (response.data.status === "success" && response.data.data.data.length > 0) {
//                     const formattedTracks = response.data.data.data.map((track) => ({
//                         id: track._id,
//                         title: track.title || "Untitled",
//                         artist: track.artist || "Unknown Artist",
//                         coverUrl: track.coverImage?.ipfsUrl || "/assets-images/default-cover.jpg",
//                         file: track.ipfsUrl,
//                     }));
//                     setTracks(formattedTracks);
//                 }
//             } catch (error) {
//                 console.error("Error fetching music tracks:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchTracks();
//     }, []);

//     // Update audio source when track changes
//     useEffect(() => {
//         if (!audioRef.current || !tracks.length) return;

//         const currentTrack = tracks[currentTrackIndex];
//         audioRef.current.src = currentTrack.file;
        
//         if (isPlaying) {
//             audioRef.current.play().catch(error => {
//                 console.error("Error playing audio:", error);
//                 setIsPlaying(false);
//             });
//         }
//     }, [currentTrackIndex, tracks]);

//     const handlePlayPause = () => {
//         if (!audioRef.current || !tracks.length) return;

//         if (isPlaying) {
//             audioRef.current.pause();
//         } else {
//             audioRef.current.play().catch(error => {
//                 console.error("Error playing audio:", error);
//                 setIsPlaying(false);
//             });
//         }
//         setIsPlaying(!isPlaying);
//     };

//     const handleNext = () => {
//         setCurrentTrackIndex(prev => 
//             prev < tracks.length - 1 ? prev + 1 : 0
//         );
//         setCurrentTime(0);
//     };

//     const handlePrevious = () => {
//         setCurrentTrackIndex(prev => 
//             prev > 0 ? prev - 1 : tracks.length - 1
//         );
//         setCurrentTime(0);
//     };

//     const handleSeek = (newTime) => {
//         if (!audioRef.current) return;
//         audioRef.current.currentTime = newTime;
//         setCurrentTime(newTime);
//     };

//     const toggleMute = () => {
//         if (!audioRef.current) return;
//         const newMutedState = !isMuted;
//         setIsMuted(newMutedState);
//         audioRef.current.volume = newMutedState ? 0 : volume;
//     };

//     const value = {
//         isPlaying,
//         setIsPlaying,
//         tracks,
//         currentTrackIndex,
//         currentTime,
//         duration,
//         volume,
//         isMuted,
//         isLoading,
//         audioRef,
//         handlePlayPause,
//         handleNext,
//         handlePrevious,
//         handleSeek,
//         toggleMute,
//     };

//     return (
//         <AudioPlayerContext.Provider value={value}>
//             {children}
//             <audio
//                 ref={audioRef}
//                 style={{ display: 'none' }}
//             />
//         </AudioPlayerContext.Provider>
//     );
// }

// export function useAudioPlayer() {
//     const context = useContext(AudioPlayerContext);
//     if (!context) {
//         throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
//     }
//     return context;
// }



import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import musicService from 'src/services/music.service';

const AudioPlayerContext = createContext();

export function AudioPlayerProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [nftTracks, setNftTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activePlaylist, setActivePlaylist] = useState('platform');
    const [isAudioInitialized, setIsAudioInitialized] = useState(false);
    const audioRef = useRef(null);

    const getCurrentPlaylist = () => activePlaylist === 'platform' ? tracks : nftTracks;
    const getCurrentTrack = () => getCurrentPlaylist()[currentTrackIndex];

    // Initialize audio element with first track
    useEffect(() => {
        const currentTrack = getCurrentTrack();
        if (!isAudioInitialized && currentTrack && audioRef.current) {
            audioRef.current.src = currentTrack.file;
            audioRef.current.load();
            setIsAudioInitialized(true);
        }
    }, [tracks, currentTrackIndex, isAudioInitialized]);

    // Fetch platform tracks
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
                        type: 'platform'
                    }));
                    setTracks(formattedTracks);
                    
                    // Initialize the first track
                    if (formattedTracks.length > 0 && audioRef.current) {
                        audioRef.current.src = formattedTracks[0].file;
                        audioRef.current.load();
                        setIsAudioInitialized(true);
                    }
                }
            } catch (error) {
                console.error("Error fetching music tracks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTracks();
    }, []);

    // Handle audio element events
    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime || 0);
            setDuration(audio.duration || 0);
        };

        const handleEnded = () => {
            handleNext();
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleError = (e) => {
            console.error("Audio playback error:", e);
            // If there's an error, try to recover by loading the track again
            if (getCurrentTrack()) {
                audio.src = getCurrentTrack().file;
                audio.load();
            }
            setIsPlaying(false);
        };

        const handleCanPlay = () => {
            if (isPlaying) {
                audio.play().catch(error => {
                    console.error("Error playing audio:", error);
                    setIsPlaying(false);
                });
            }
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('error', handleError);
        audio.addEventListener('canplay', handleCanPlay);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, [isPlaying]);

    // Track change handler
    const changeTrack = (track) => {
        if (!audioRef.current || !track) return;
        
        audioRef.current.pause();
        audioRef.current.src = track.file;
        audioRef.current.load();
        
        if (isPlaying) {
            audioRef.current.play().catch(error => {
                console.error("Error playing audio:", error);
                setIsPlaying(false);
            });
        }
    };

    // Update audio when track changes
    useEffect(() => {
        const currentTrack = getCurrentTrack();
        if (isAudioInitialized && currentTrack) {
            changeTrack(currentTrack);
        }
    }, [currentTrackIndex, activePlaylist, isAudioInitialized]);

    const handlePlayPause = () => {
        if (!audioRef.current || !getCurrentTrack()) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Error playing audio:", error);
                    setIsPlaying(false);
                });
            }
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        const currentPlaylist = getCurrentPlaylist();
        setCurrentTrackIndex(prev => 
            prev < currentPlaylist.length - 1 ? prev + 1 : 0
        );
    };

    const handlePrevious = () => {
        const currentPlaylist = getCurrentPlaylist();
        setCurrentTrackIndex(prev => 
            prev > 0 ? prev - 1 : currentPlaylist.length - 1
        );
    };

    const handleSeek = (newTime) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        audioRef.current.volume = newMutedState ? 0 : volume;
    };

    // NFT track handlers
    const addNftTrack = (nft) => {
        const newTrack = {
            id: nft._id,
            title: nft.nftData.name || "Untitled",
            artist: nft.nftData.attributes?.find(attr => attr.trait_type === 'Artist')?.value || "Unknown Artist",
            coverUrl: nft.tokenImage,
            file: nft.nftData.audio,
            type: 'nft'
        };

        setNftTracks(prev => {
            if (prev.some(track => track.id === newTrack.id)) return prev;
            return [...prev, newTrack];
        });
    };

    const playNftTrack = (nft) => {
        const trackExists = nftTracks.some(track => track.id === nft._id);
        if (!trackExists) {
            addNftTrack(nft);
        }
        
        setActivePlaylist('nft');
        
        const trackIndex = nftTracks.findIndex(track => track.id === nft._id);
        setCurrentTrackIndex(trackIndex === -1 ? nftTracks.length : trackIndex);
        setIsPlaying(true);
    };

    const switchToPlatformPlaylist = () => {
        setActivePlaylist('platform');
        setCurrentTrackIndex(0);
        setIsPlaying(false);
    };

    const value = {
        isPlaying,
        setIsPlaying,
        tracks: getCurrentPlaylist(),
        currentTrackIndex,
        currentTime,
        duration,
        volume,
        isMuted,
        isLoading,
        audioRef,
        activePlaylist,
        handlePlayPause,
        handleNext,
        handlePrevious,
        handleSeek,
        toggleMute,
        playNftTrack,
        addNftTrack,
        switchToPlatformPlaylist,
        getCurrentTrack
    };

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
            <audio
                ref={audioRef}
                preload="auto"
                style={{ display: 'none' }}
            />
        </AudioPlayerContext.Provider>
    );
}

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext);
    if (!context) {
        throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
    }
    return context;
}