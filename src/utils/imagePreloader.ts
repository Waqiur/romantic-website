/**
 * Image Preloader Utility
 * Preloads all images to prevent ERR_CACHE_READ_FAILURE errors
 */
import { useEffect } from "react";

// List of all images to preload
const IMAGES_TO_PRELOAD = [
    // Carousel images
    "/carousel-images/image_1.webp",
    "/carousel-images/image_2.webp",
    "/carousel-images/image_3.webp",
    "/carousel-images/image_4.webp",
    "/carousel-images/image_5.webp",
    "/carousel-images/image_6.webp",
    "/carousel-images/image_7.webp",
    "/carousel-images/image_8.webp",
    "/carousel-images/image_9.webp",

    // Planet images
    "/planets/earth.png",
    "/planets/jupiter.png",
    "/planets/mars.png",
    "/planets/mercury.png",
    "/planets/neptune.png",
    "/planets/saturn.png",
    "/planets/uranus.png",
    "/planets/venus.png",

    // Other images
    "/image.webp",
    "/rocket.webp",
];

/**
 * Preloads a single image
 * @param src - Image source path
 * @returns Promise that resolves when image is loaded
 */
const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => {
            console.warn(`Failed to preload image: ${src}`);
            resolve(); // Don't reject to prevent blocking other images
        };
        img.src = src;
    });
};

/**
 * Preloads all images in the application
 * @returns Promise that resolves when all images are loaded
 */
export const preloadAllImages = async (): Promise<void> => {
    try {
        console.log("Starting image preloading...");

        // Preload images in parallel with a concurrency limit to avoid overwhelming the network
        const CONCURRENCY_LIMIT = 6;
        const chunks = [];

        for (let i = 0; i < IMAGES_TO_PRELOAD.length; i += CONCURRENCY_LIMIT) {
            chunks.push(IMAGES_TO_PRELOAD.slice(i, i + CONCURRENCY_LIMIT));
        }

        for (const chunk of chunks) {
            await Promise.all(chunk.map(preloadImage));
        }

        console.log("Image preloading completed successfully");
    } catch (error) {
        console.error("Error during image preloading:", error);
    }
};

/**
 * Hook to preload images on component mount
 * @param images - Array of image paths to preload
 */
export const useImagePreloader = (images: string[] = IMAGES_TO_PRELOAD) => {
    useEffect(() => {
        let isMounted = true;

        const preload = async () => {
            try {
                await Promise.all(images.map(preloadImage));
                if (isMounted) {
                    console.log("Images preloaded successfully");
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error preloading images:", error);
                }
            }
        };

        preload();

        return () => {
            isMounted = false;
        };
    }, [images]);
};
