import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useRef,
} from "react";
import { useLocation } from "wouter";
import LoadingScreen3D from "@/components/LoadingScreen3D";

interface NavigationContextType {
    isNavigating: boolean;
    startNavigation: (path: string) => Promise<void>;
    lastNavigatedPath: string | null;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [isNavigating, setIsNavigating] = useState(false);
    const [, setLocation] = useLocation();
    const [lastNavigatedPath, setLastNavigatedPath] = useState<string | null>(
        null
    );
    const navigationCompleteCallback = useRef<(() => void) | null>(null);

    // Set up listener for navigation completion
    useEffect(() => {
        if (!isNavigating && navigationCompleteCallback.current) {
            // Execute the callback when navigation is complete
            navigationCompleteCallback.current();
            navigationCompleteCallback.current = null;
        }
    }, [isNavigating]);

    const startNavigation = (path: string): Promise<void> => {
        setIsNavigating(true);
        setLastNavigatedPath(path);

        return new Promise((resolve) => {
            navigationCompleteCallback.current = resolve;
            setTimeout(() => {
                setLocation(path);
                setTimeout(() => {
                    setIsNavigating(false);
                }, 500);
            }, 100);
        });
    };

    return (
        <NavigationContext.Provider
            value={{ isNavigating, startNavigation, lastNavigatedPath }}
        >
            {isNavigating && <LoadingScreen3D isLoading={true} />}
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            "useNavigation must be used within a NavigationProvider"
        );
    }
    return context;
}
