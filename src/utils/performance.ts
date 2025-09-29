/**
 * Performance utilities for debouncing and throttling
 */

export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): T {
    let inThrottle: boolean;
    return ((...args: any[]) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    }) as T;
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): T {
    let timeoutId: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    }) as T;
}

// RequestAnimationFrame-based throttle for animations
export function rafThrottle<T extends (...args: any[]) => any>(func: T): T {
    let ticking = false;
    return ((...args: any[]) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                func(...args);
                ticking = false;
            });
            ticking = true;
        }
    }) as T;
}

// Scroll performance optimization utilities
export class ScrollOptimizer {
    private static scrollTimeout: NodeJS.Timeout | null = null;
    private static isScrolling = false;
    private static scrollHandlers: Array<() => void> = [];

    static addScrollHandler(handler: () => void) {
        this.scrollHandlers.push(handler);
    }

    static removeScrollHandler(handler: () => void) {
        this.scrollHandlers = this.scrollHandlers.filter(h => h !== handler);
    }

    static startScrollOptimization() {
        if (this.isScrolling) return;

        this.isScrolling = true;

        // Disable expensive animations during scroll
        document.documentElement.style.setProperty('--scroll-animations-enabled', 'none');

        // Add scroll-optimizing class to body
        document.body.classList.add('scrolling-fast');

        // Clear any existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        // Re-enable animations after scroll stops
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
            document.documentElement.style.removeProperty('--scroll-animations-enabled');
            document.body.classList.remove('scrolling-fast');

            // Call any registered scroll handlers
            this.scrollHandlers.forEach(handler => handler());

            this.scrollTimeout = null;
        }, 150); // Wait 150ms after scroll stops
    }

    static init() {
        // Use passive listeners for better scroll performance
        const scrollOptions: AddEventListenerOptions = {
            passive: true,
            capture: false
        };

        // Throttled scroll handler using RAF
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.startScrollOptimization();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, scrollOptions);

        // Also listen for wheel events (mouse wheel scrolling)
        window.addEventListener('wheel', handleScroll, scrollOptions);

        // Touch events for mobile
        window.addEventListener('touchmove', handleScroll, scrollOptions);
    }
}
