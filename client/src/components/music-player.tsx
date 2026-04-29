import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Pause, Play, X } from "lucide-react";

interface MusicPlayerProps {
    audioSrc: string; // Path to audio file (e.g., "/music/background.mp3")
    defaultVolume?: number; // 0 to 1
    autoPlay?: boolean; // Try to autoplay on load
}

export default function MusicPlayer({ 
    audioSrc, 
    defaultVolume = 0.3,
    autoPlay = true
}: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(defaultVolume);
    const [showControls, setShowControls] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [autoPlayBlocked, setAutoPlayBlocked] = useState(false);
    const [userDismissed, setUserDismissed] = useState(false); // Track if user dismissed the prompt
    const [userManuallyPaused, setUserManuallyPaused] = useState(false); // Track if user manually paused
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false); // Track if auto-play already happened

    // Try to play audio (only for auto-play, not manual)
    const tryAutoPlay = useCallback(async () => {
        if (audioRef.current && !isPlaying && !userManuallyPaused && !hasAutoPlayed) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                setShowPrompt(false);
                setAutoPlayBlocked(false);
                setHasAutoPlayed(true);
                return true;
            } catch (error) {
                console.log("Autoplay blocked by browser:", error);
                return false;
            }
        }
        return false;
    }, [isPlaying, userManuallyPaused, hasAutoPlayed]);

    // Attempt autoplay on mount
    useEffect(() => {
        if (autoPlay && audioRef.current && !hasAutoPlayed) {
            // Small delay to ensure audio is loaded
            const timer = setTimeout(async () => {
                const success = await tryAutoPlay();
                if (!success) {
                    setAutoPlayBlocked(true);
                    setShowPrompt(true);
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [autoPlay, tryAutoPlay, hasAutoPlayed]);

    // Listen for first user interaction on the page (only scroll, not click)
    // Only works ONCE and only if user hasn't manually paused
    useEffect(() => {
        if (!autoPlayBlocked || userDismissed || userManuallyPaused || hasAutoPlayed) return;

        const handleScroll = async () => {
            if (!isPlaying && autoPlayBlocked && !userDismissed && !userManuallyPaused && !hasAutoPlayed) {
                await tryAutoPlay();
            }
        };

        document.addEventListener('scroll', handleScroll, { once: true });

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [autoPlayBlocked, isPlaying, tryAutoPlay, userDismissed, userManuallyPaused, hasAutoPlayed]);

    // Load user preference from localStorage
    useEffect(() => {
        const savedPreference = localStorage.getItem("musicPlayerPreference");
        if (savedPreference) {
            const { volume: savedVolume, muted } = JSON.parse(savedPreference);
            setVolume(savedVolume ?? defaultVolume);
            setIsMuted(muted ?? false);
        }
    }, [defaultVolume]);

    // Save preference to localStorage
    useEffect(() => {
        if (hasInteracted) {
            localStorage.setItem(
                "musicPlayerPreference",
                JSON.stringify({ volume, muted: isMuted, wasPlaying: isPlaying })
            );
        }
    }, [volume, isMuted, isPlaying, hasInteracted]);

    // Update audio element when volume/mute changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    const togglePlay = async () => {
        setHasInteracted(true);
        setShowPrompt(false);
        
        if (audioRef.current) {
            try {
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                    setUserManuallyPaused(true); // User chose to pause - don't auto-play again
                } else {
                    await audioRef.current.play();
                    setIsPlaying(true);
                    setAutoPlayBlocked(false);
                    setUserManuallyPaused(false); // User chose to play
                    setHasAutoPlayed(true); // Prevent future auto-plays
                }
            } catch (error) {
                console.log("Audio playback failed:", error);
            }
        }
    };

    const toggleMute = () => {
        setHasInteracted(true);
        setIsMuted(!isMuted);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasInteracted(true);
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
        } else if (isMuted) {
            setIsMuted(false);
        }
    };

    const dismissPrompt = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowPrompt(false);
        setUserDismissed(true); // Mark that user chose not to play music
    };

    const handlePromptClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await togglePlay();
    };

    return (
        <>
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src={audioSrc}
                loop
                preload="auto"
            />

            {/* Music Prompt - Shows when autoplay is blocked */}
            <AnimatePresence>
                {showPrompt && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="fixed bottom-24 left-6 z-[9997] max-w-[280px]"
                    >
                        <div 
                            onClick={handlePromptClick}
                            className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-2xl p-4 shadow-xl cursor-pointer hover:border-primary/60 transition-all group"
                        >
                            <button
                                onClick={dismissPrompt}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors z-10"
                            >
                                <X size={14} />
                            </button>
                            
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <Music className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">
                                        🎵 Enable Background Music?
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Click here or anywhere on the page to enjoy the music experience!
                                    </p>
                                </div>
                            </div>
                            
                            {/* Animated border */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl border-2 border-primary/50"
                                animate={{
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Music Player Button */}
            <div className="fixed bottom-6 left-6 z-[9998]">
                <div 
                    className="relative"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                >
                    {/* Expanded Controls */}
                    <AnimatePresence>
                        {showControls && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-16 left-0 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl min-w-[200px]"
                            >
                                <div className="flex flex-col gap-3">
                                    {/* Title */}
                                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <Music size={16} className="text-primary" />
                                        <span>Background Music</span>
                                    </div>

                                    {/* Volume Slider */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={toggleMute}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {isMuted || volume === 0 ? (
                                                <VolumeX size={18} />
                                            ) : (
                                                <Volume2 size={18} />
                                            )}
                                        </button>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer
                                                [&::-webkit-slider-thumb]:appearance-none
                                                [&::-webkit-slider-thumb]:w-4
                                                [&::-webkit-slider-thumb]:h-4
                                                [&::-webkit-slider-thumb]:rounded-full
                                                [&::-webkit-slider-thumb]:bg-primary
                                                [&::-webkit-slider-thumb]:cursor-pointer
                                                [&::-webkit-slider-thumb]:transition-transform
                                                [&::-webkit-slider-thumb]:hover:scale-110"
                                        />
                                        <span className="text-xs text-muted-foreground w-8">
                                            {Math.round((isMuted ? 0 : volume) * 100)}%
                                        </span>
                                    </div>

                                    {/* Now Playing */}
                                    {isPlaying && (
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <div className="flex gap-0.5">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-1 bg-primary rounded-full"
                                                        animate={{
                                                            height: [4, 12, 4],
                                                        }}
                                                        transition={{
                                                            duration: 0.5,
                                                            repeat: Infinity,
                                                            delay: i * 0.1,
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                            <span>Now playing...</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Button */}
                    <motion.button
                        onClick={togglePlay}
                        className={`
                            w-14 h-14 rounded-full flex items-center justify-center
                            shadow-lg transition-all duration-300
                            ${isPlaying 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-card/90 backdrop-blur-sm border border-border text-foreground hover:border-primary/50"
                            }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={isPlaying ? "Pause music" : "Play music"}
                    >
                        {isPlaying ? (
                            <Pause size={24} />
                        ) : (
                            <Play size={24} className="ml-1" />
                        )}
                        
                        {/* Playing Animation Ring */}
                        {isPlaying && (
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-primary"
                                animate={{
                                    scale: [1, 1.3],
                                    opacity: [0.5, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                }}
                            />
                        )}
                    </motion.button>
                </div>
            </div>
        </>
    );
}
