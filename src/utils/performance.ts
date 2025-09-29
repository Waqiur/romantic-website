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
