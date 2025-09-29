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

// Hardware acceleration utilities
export class HardwareAccelerator {
    private static acceleratedElements = new WeakSet<Element>();

    static accelerateElement(element: HTMLElement) {
        if (this.acceleratedElements.has(element)) return;

        // Apply comprehensive hardware acceleration
        const styles = {
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            willChange: "transform, opacity",
            contain: "layout style paint",
        };

        Object.assign(element.style, styles);
        element.classList.add("gpu-accelerated");
        this.acceleratedElements.add(element);
    }

    static accelerateChildren(parent: HTMLElement) {
        const animatedChildren = parent.querySelectorAll(
            '*[style*="transform"], *[style*="animation"], .float, .pulse, .sparkle'
        );
        animatedChildren.forEach((child) =>
            this.accelerateElement(child as HTMLElement)
        );
    }

    static pauseAnimationsDuringScroll() {
        const animatedElements = document.querySelectorAll(
            '.gpu-accelerated, [style*="animation"], [style*="transition"]'
        );
        animatedElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.animationPlayState = "paused";
            htmlEl.style.transition = "none";
        });
    }

    static resumeAnimationsAfterScroll() {
        const animatedElements = document.querySelectorAll(
            '.gpu-accelerated, [style*="animation"], [style*="transition"]'
        );
        animatedElements.forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.animationPlayState = "running";
            htmlEl.style.transition = "";
        });
    }
}

// Scroll performance optimization utilities
export class ScrollOptimizer {
    private static scrollTimeout: NodeJS.Timeout | null = null;
    private static isScrolling = false;
    private static scrollHandlers: Array<() => void> = [];
    private static lastScrollTime = 0;
    private static scrollVelocity = 0;

    static addScrollHandler(handler: () => void) {
        this.scrollHandlers.push(handler);
    }

    static removeScrollHandler(handler: () => void) {
        this.scrollHandlers = this.scrollHandlers.filter((h) => h !== handler);
    }

    static startScrollOptimization() {
        if (this.isScrolling) return;

        const now = Date.now();
        this.scrollVelocity = now - this.lastScrollTime;
        this.lastScrollTime = now;

        this.isScrolling = true;

        // Aggressive animation disabling during scroll
        document.documentElement.style.setProperty(
            "--scroll-animations-enabled",
            "none"
        );
        document.body.style.setProperty("pointer-events", "none", "important");

        // Add scroll-optimizing class to body with hardware acceleration
        document.body.classList.add("scrolling-fast");
        document.body.style.transform = "translate3d(0, 0, 0)";
        document.body.style.willChange = "transform";

        // Use HardwareAccelerator for comprehensive optimization
        HardwareAccelerator.pauseAnimationsDuringScroll();

        // Clear any existing timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }

        // Re-enable animations after scroll stops (adaptive delay based on velocity)
        const delay = Math.min(this.scrollVelocity > 50 ? 200 : 100, 150);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
            document.documentElement.style.removeProperty(
                "--scroll-animations-enabled"
            );
            document.body.style.removeProperty("pointer-events");
            document.body.classList.remove("scrolling-fast");
            document.body.style.removeProperty("transform");
            document.body.style.removeProperty("will-change");

            // Resume animations using HardwareAccelerator
            HardwareAccelerator.resumeAnimationsAfterScroll();

            // Call any registered scroll handlers
            this.scrollHandlers.forEach((handler) => handler());

            this.scrollTimeout = null;
        }, delay);
    }

    static init() {
        // Use passive listeners for better scroll performance
        const scrollOptions: AddEventListenerOptions = {
            passive: true,
            capture: false,
        };

        // High-performance scroll handler using RAF
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

        // Listen to multiple scroll events for comprehensive coverage
        window.addEventListener("scroll", handleScroll, scrollOptions);
        window.addEventListener("wheel", handleScroll, scrollOptions);
        window.addEventListener("touchmove", handleScroll, scrollOptions);

        // Also listen for momentum scrolling on iOS
        window.addEventListener(
            "touchstart",
            () => {
                this.lastScrollTime = Date.now();
            },
            scrollOptions
        );
    }

    static isScrollingFast(): boolean {
        return this.isScrolling;
    }
}
