import { useRef } from "react";

/**
 * Memory leak detection and performance monitoring utilities
 */

export class MemoryLeakDetector {
    private static instance: MemoryLeakDetector;
    private listeners: Map<string, number> = new Map();
    private intervals: Map<string, number> = new Map();
    private timeouts: Map<string, number> = new Map();
    private animationFrames: Map<string, number> = new Map();

    static getInstance(): MemoryLeakDetector {
        if (!MemoryLeakDetector.instance) {
            MemoryLeakDetector.instance = new MemoryLeakDetector();
        }
        return MemoryLeakDetector.instance;
    }

    trackEventListener(
        id: string,
        element: EventTarget,
        event: string,
        handler: EventListener
    ): void {
        element.addEventListener(event, handler);
        this.listeners.set(id, (this.listeners.get(id) || 0) + 1);
    }

    untrackEventListener(
        id: string,
        element: EventTarget,
        event: string,
        handler: EventListener
    ): void {
        element.removeEventListener(event, handler);
        const count = this.listeners.get(id) || 0;
        if (count > 1) {
            this.listeners.set(id, count - 1);
        } else {
            this.listeners.delete(id);
        }
    }

    trackInterval(id: string, intervalId: number): void {
        this.intervals.set(id, intervalId);
    }

    clearTrackedInterval(id: string): void {
        const intervalId = this.intervals.get(id);
        if (intervalId) {
            clearInterval(intervalId);
            this.intervals.delete(id);
        }
    }

    trackTimeout(id: string, timeoutId: number): void {
        this.timeouts.set(id, timeoutId);
    }

    clearTrackedTimeout(id: string): void {
        const timeoutId = this.timeouts.get(id);
        if (timeoutId) {
            clearTimeout(timeoutId);
            this.timeouts.delete(id);
        }
    }

    trackAnimationFrame(id: string, frameId: number): void {
        this.animationFrames.set(id, frameId);
    }

    cancelTrackedAnimationFrame(id: string): void {
        const frameId = this.animationFrames.get(id);
        if (frameId) {
            cancelAnimationFrame(frameId);
            this.animationFrames.delete(id);
        }
    }

    getLeakReport(): {
        listeners: number;
        intervals: number;
        timeouts: number;
        animationFrames: number;
    } {
        return {
            listeners: this.listeners.size,
            intervals: this.intervals.size,
            timeouts: this.timeouts.size,
            animationFrames: this.animationFrames.size,
        };
    }

    cleanupAll(): void {
        // Clear all tracked resources
        this.listeners.clear();
        this.intervals.forEach((id) => clearInterval(id));
        this.intervals.clear();
        this.timeouts.forEach((id) => clearTimeout(id));
        this.timeouts.clear();
        this.animationFrames.forEach((id) => cancelAnimationFrame(id));
        this.animationFrames.clear();
    }
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
    const renderCount = useRef(0);
    const lastRenderTime = useRef(Date.now());

    renderCount.current += 1;

    const currentTime = Date.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    lastRenderTime.current = currentTime;

    // Log performance warnings
    if (renderCount.current > 10 && timeSinceLastRender < 16) {
        console.warn(
            `${componentName}: High render frequency detected (${renderCount.current} renders)`
        );
    }

    return {
        renderCount: renderCount.current,
        timeSinceLastRender,
    };
}
