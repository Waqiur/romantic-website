const CompressionPlugin = require("compression-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // Production optimizations
            if (env === "production") {
                // Enable gzip compression
                webpackConfig.plugins.push(
                    new CompressionPlugin({
                        algorithm: "gzip",
                        test: /\.(js|css|html|svg|woff|woff2|ttf|eot)$/,
                        threshold: 10240, // 10KB
                        minRatio: 0.8,
                        deleteOriginalAssets: false,
                    })
                );

                // Add Brotli compression for better compression
                webpackConfig.plugins.push(
                    new CompressionPlugin({
                        algorithm: "brotliCompress",
                        test: /\.(js|css|html|svg)$/,
                        compressionOptions: { level: 11 },
                        threshold: 10240,
                        minRatio: 0.8,
                        deleteOriginalAssets: false,
                    })
                );

                // Service worker for caching
                webpackConfig.plugins.push(
                    new WorkboxPlugin.GenerateSW({
                        clientsClaim: true,
                        skipWaiting: true,
                        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
                        runtimeCaching: [
                            {
                                urlPattern:
                                    /\.(?:png|jpg|jpeg|svg|webp|gif|ico)$/,
                                handler: "CacheFirst",
                                options: {
                                    cacheName: "images-cache",
                                    expiration: {
                                        maxEntries: 100,
                                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                                    },
                                },
                            },
                            {
                                urlPattern: /\.(?:mp3|aac|wav|m4a)$/,
                                handler: "CacheFirst",
                                options: {
                                    cacheName: "audio-cache",
                                    expiration: {
                                        maxEntries: 20,
                                        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                                    },
                                },
                            },
                            {
                                urlPattern: /^https?.*/,
                                handler: "NetworkFirst",
                                options: {
                                    cacheName: "api-cache",
                                    networkTimeoutSeconds: 10,
                                    expiration: {
                                        maxEntries: 200,
                                        maxAgeSeconds: 24 * 60 * 60, // 24 hours
                                    },
                                },
                            },
                        ],
                        // Exclude large files from precaching
                        exclude: [
                            /\.map$/,
                            /manifest\.json$/,
                            /robots\.txt$/,
                            /favicon\.ico$/,
                        ],
                    })
                );
            }

            // Bundle analyzer for both development and production when ANALYZE is set
            if (process.env.ANALYZE === "true") {
                webpackConfig.plugins.push(
                    new BundleAnalyzerPlugin({
                        analyzerMode: "server",
                        openAnalyzer: true,
                        defaultSizes: "parsed",
                    })
                );
            }

            // Enhanced chunk splitting for better caching
            webpackConfig.optimization = {
                ...webpackConfig.optimization,
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: 25,
                    maxAsyncRequests: 30,
                    cacheGroups: {
                        // React core libraries
                        react: {
                            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|scheduler)[\\/]/,
                            name: "react-core",
                            chunks: "all",
                            priority: 30,
                            enforce: true,
                        },
                        // Framer Motion (large library)
                        framer: {
                            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                            name: "framer-motion",
                            chunks: "all",
                            priority: 25,
                        },
                        // Styled Components
                        styled: {
                            test: /[\\/]node_modules[\\/]styled-components[\\/]/,
                            name: "styled-components",
                            chunks: "all",
                            priority: 20,
                        },
                        // Other vendor libraries
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendor",
                            chunks: "all",
                            priority: 10,
                            enforce: true,
                        },
                        // Page-specific chunks (already implemented in App.tsx)
                        pages: {
                            test: /[\\/]src[\\/]components[\\/](EarthPage|GalaxyPage|LoveMapPage|FireworksPage)[\\/]/,
                            name: "pages",
                            chunks: "async",
                            priority: 15,
                        },
                        // Interactive components
                        interactive: {
                            test: /[\\/]src[\\/]components[\\/](InteractiveSection|CuteReminders|LovePoems|HeartPuzzle)[\\/]/,
                            name: "interactive",
                            chunks: "async",
                            priority: 15,
                        },
                        // Background components
                        background: {
                            test: /[\\/]src[\\/]components[\\/](ParticleBackground|SpaceBackground|FloatingHearts|CursorFollower)[\\/]/,
                            name: "background",
                            chunks: "async",
                            priority: 15,
                        },
                        // Content components
                        content: {
                            test: /[\\/]src[\\/]components[\\/](AboutSection|HeroSection|Footer|LoveNotes)[\\/]/,
                            name: "content",
                            chunks: "async",
                            priority: 15,
                        },
                    },
                },
                // Enable tree shaking
                usedExports: true,
                sideEffects: true,
            };

            return webpackConfig;
        },
    },
};
