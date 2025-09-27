import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";

interface MusicContextType {
    isPlaying: boolean;
    isLoading: boolean;
    toggleMusic: () => Promise<void>;
    audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error("useMusic must be used within a MusicProvider");
    }
    return context;
};

interface MusicProviderProps {
    children: React.ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const toggleMusic = async () => {
        if (!audioRef.current || isLoading) return;

        setIsLoading(true);

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                // Wait for any previous operations to complete
                await new Promise((resolve) => setTimeout(resolve, 100));

                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    setIsPlaying(true);
                }
            }
        } catch (error) {
            console.error("Audio playback error:", error);
            // Reset state on error
            setIsPlaying(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle page visibility changes to pause/resume music appropriately
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && audioRef.current) {
                // Optional: pause music when tab is not visible
                // audioRef.current.pause();
                // setIsPlaying(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () =>
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
    }, []);

    const value = {
        isPlaying,
        isLoading,
        toggleMusic,
        audioRef,
    };

    return (
        <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
    );
};
