/**
 * Image optimization utility for the portfolio website
 * Helps with responsive image loading and format optimization
 */

/**
 * Function to determine if the browser supports modern image formats
 * @returns {boolean} Whether the browser supports WebP or AVIF
 */
export function supportsModernImageFormats(): boolean {
  // Feature detection for WebP and AVIF
  if (typeof window === 'undefined') return false;
  
  // Check for WebP support
  const webpSupport = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;
    
  // For AVIF we would need more complex detection
  // For now we just check WebP
  return webpSupport;
}

/**
 * Convert image URL to use responsive size parameters
 * This can be extended to work with a real image CDN or server
 * 
 * @param {string} imageUrl - Original image URL
 * @param {number} width - Desired width in pixels
 * @param {string} quality - Quality setting (low, medium, high)
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(
  imageUrl: string, 
  width: number = 800, 
  quality: 'low' | 'medium' | 'high' = 'high'
): string {
  // In a real production app with an image CDN, we would transform this to
  // a proper CDN URL with parameters for size and format.
  // For this demo, we'll just return the original URL with a cache-busting param
  
  // Simulate different quality levels
  let qualityParam = '';
  switch (quality) {
    case 'low':
      qualityParam = 'q=70';
      break;
    case 'medium':
      qualityParam = 'q=80';
      break;
    case 'high':
      qualityParam = 'q=90';
      break;
  }
  
  // Add size parameter 
  const sizeParam = `w=${width}`;
  
  // Construct the URL with parameters
  // In a real app with an image CDN, this would be properly constructed
  // For this demo we just append fake parameters to simulate the concept
  
  // Check if URL already has parameters
  const hasParams = imageUrl.includes('?');
  const connector = hasParams ? '&' : '?';
  
  // Return the "optimized" URL
  return `${imageUrl}${connector}${sizeParam}&${qualityParam}`;
}

/**
 * Generate a responsive image srcset for different screen sizes
 * 
 * @param {string} imageUrl - Base image URL
 * @param {number[]} sizes - Array of width sizes to generate
 * @returns {string} srcset attribute value
 */
export function generateSrcSet(imageUrl: string, sizes: number[] = [320, 640, 960, 1280, 1920]): string {
  if (!imageUrl) return '';
  
  return sizes
    .map(size => {
      const optimizedUrl = getOptimizedImageUrl(imageUrl, size);
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
}

/**
 * Generate appropriate sizes attribute for responsive images
 * 
 * @param {string} defaultSizes - Default sizes attribute if custom one isn't provided
 * @returns {string} sizes attribute value
 */
export function generateSizesAttribute(defaultSizes: string = '100vw'): string {
  return defaultSizes;
}

/**
 * Complete responsive image optimization helper
 * 
 * @param {Object} options - Configuration options
 * @returns {Object} Optimized image properties
 */
export function getResponsiveImageProps({
  src,
  width = 800,
  sizes = '100vw',
  priority = false,
  quality = 'high'
}: {
  src: string,
  width?: number,
  sizes?: string,
  priority?: boolean,
  quality?: 'low' | 'medium' | 'high'
}) {
  const sizesArray = [320, 640, 960, 1280, 1920].filter(size => size <= width * 2);
  
  return {
    src: getOptimizedImageUrl(src, width, quality),
    srcSet: generateSrcSet(src, sizesArray),
    sizes: sizes || generateSizesAttribute(),
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : 'auto',
    decoding: 'async',
  };
}

export default {
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizesAttribute,
  getResponsiveImageProps
};