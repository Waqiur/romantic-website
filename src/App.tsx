import { Suspense, lazy, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { MusicProvider } from "./contexts/MusicContext";
import MusicPlayer from "./components/MusicPlayer";
import { preloadAllImages } from "./utils/imagePreloader";
import { ScrollOptimizer } from "./utils/performance";

// Group components into logical chunks for better code splitting

// Background components chunk - loaded together as they're always needed
const SpaceBackground = lazy(
    () =>
        import(
            /* webpackChunkName: "background" */ "./components/SpaceBackground"
        )
);

// Interactive components chunk - animations and effects
const CursorFollower = lazy(
    () =>
        import(
            /* webpackChunkName: "interactive" */ "./components/CursorFollower"
        )
);
const FloatingHearts = lazy(
    () =>
        import(
            /* webpackChunkName: "interactive" */ "./components/FloatingHearts"
        )
);
const LoveNotes = lazy(
    () => import(/* webpackChunkName: "interactive" */ "./components/LoveNotes")
);

// Main content components chunk - core page content
const HeroSection = lazy(
    () => import(/* webpackChunkName: "content" */ "./components/HeroSection")
);
const AboutSection = lazy(
    () => import(/* webpackChunkName: "content" */ "./components/AboutSection")
);
const InteractiveSection = lazy(
    () =>
        import(
            /* webpackChunkName: "content" */ "./components/InteractiveSection"
        )
);
const Footer = lazy(
    () => import(/* webpackChunkName: "content" */ "./components/Footer")
);

// Page components chunk - individual route pages
const EarthPage = lazy(
    () => import(/* webpackChunkName: "pages" */ "./components/EarthPage")
);
const LoveMapPage = lazy(
    () => import(/* webpackChunkName: "pages" */ "./components/LoveMapPage")
);
const FireworksPage = lazy(
    () => import(/* webpackChunkName: "pages" */ "./components/FireworksPage")
);

const MainPage = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;

    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

function App() {
    // Preload critical background components and images for better UX
    useEffect(() => {
        // Preload background components as they're always visible
        import(
            /* webpackChunkName: "background" */ "./components/SpaceBackground"
        );

        // Preload all images to prevent cache read failures
        preloadAllImages();

        // Initialize scroll performance optimizations
        ScrollOptimizer.init();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <MusicProvider>
                <GlobalStyles />
                <Router>
                    <Suspense
                        fallback={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100vh",
                                    background:
                                        "linear-gradient(135deg, #ff6b9d 0%, #a18cd1 100%)",
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    zIndex: 9999,
                                    padding: "20px",
                                    boxSizing: "border-box",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        transform: "scale(1)",
                                    }}
                                >
                                    {/* Floating hearts animation - responsive */}
                                    <div
                                        style={{
                                            fontSize: "clamp(2rem, 6vw, 3rem)",
                                            animation:
                                                "heartFloat 2s ease-in-out infinite",
                                            color: "white",
                                            textShadow:
                                                "0 0 20px rgba(255,255,255,0.5)",
                                        }}
                                    >
                                        💖
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "clamp(-15px, -4vw, -20px)",
                                            left: "clamp(-20px, -5vw, -30px)",
                                            fontSize:
                                                "clamp(1.5rem, 4vw, 2rem)",
                                            animation:
                                                "heartFloat 2.5s ease-in-out infinite",
                                            color: "rgba(255,255,255,0.8)",
                                        }}
                                    >
                                        💕
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "clamp(-10px, -3vw, -15px)",
                                            right: "clamp(-25px, -6vw, -35px)",
                                            fontSize:
                                                "clamp(1.8rem, 5vw, 2.5rem)",
                                            animation:
                                                "heartFloat 1.8s ease-in-out infinite",
                                            color: "rgba(255,255,255,0.9)",
                                        }}
                                    >
                                        💗
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "clamp(-20px, -4vw, -25px)",
                                            left: "clamp(-15px, -3vw, -20px)",
                                            fontSize:
                                                "clamp(1.3rem, 3.5vw, 1.8rem)",
                                            animation:
                                                "heartFloat 2.2s ease-in-out infinite",
                                            color: "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        💓
                                    </div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            bottom: "clamp(-15px, -3vw, -20px)",
                                            right: "clamp(-20px, -4vw, -25px)",
                                            fontSize:
                                                "clamp(1.6rem, 4.5vw, 2.2rem)",
                                            animation:
                                                "heartFloat 1.5s ease-in-out infinite",
                                            color: "rgba(255,255,255,0.6)",
                                        }}
                                    >
                                        💘
                                    </div>
                                </div>
                                <style>
                                    {`
                                        @keyframes heartFloat {
                                            0%, 100% {
                                                transform: translateY(0px) scale(1);
                                            }
                                            50% {
                                                transform: translateY(-15px) scale(1.1);
                                            }
                                        }
                                        
                                        @media (max-width: 768px) {
                                            @keyframes heartFloat {
                                                0%, 100% {
                                                    transform: translateY(0px) scale(0.9);
                                                }
                                                50% {
                                                    transform: translateY(-10px) scale(1);
                                                }
                                            }
                                        }
                                    `}
                                </style>
                            </div>
                        }
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <MainPage>
                                        <Suspense fallback={null}>
                                            <SpaceBackground />
                                        </Suspense>

                                        <Suspense fallback={null}>
                                            <CursorFollower />
                                        </Suspense>
                                        <Suspense fallback={null}>
                                            <FloatingHearts />
                                        </Suspense>
                                        <Suspense fallback={null}>
                                            <LoveNotes />
                                        </Suspense>
                                        <HeroSection />
                                        <AboutSection />
                                        <InteractiveSection />
                                        <Footer />
                                    </MainPage>
                                }
                            />
                            <Route path="/earth" element={<EarthPage />} />
                            <Route path="/lovemap" element={<LoveMapPage />} />
                            <Route
                                path="/fireworks"
                                element={<FireworksPage />}
                            />
                        </Routes>
                        <MusicPlayer />
                    </Suspense>
                </Router>
            </MusicProvider>
        </ThemeProvider>
    );
}

export default App;
