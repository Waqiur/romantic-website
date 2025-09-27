import React, { Suspense, lazy, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { MusicProvider } from "./contexts/MusicContext";
import MusicPlayer from "./components/MusicPlayer";

// Lazy load heavy components
const ParticleBackground = lazy(
    () => import("./components/ParticleBackground")
);
const HeroSection = lazy(() => import("./components/HeroSection"));
const AboutSection = lazy(() => import("./components/AboutSection"));
const InteractiveSection = lazy(
    () => import("./components/InteractiveSection")
);
const Footer = lazy(() => import("./components/Footer"));
const FloatingHearts = lazy(() => import("./components/FloatingHearts"));
const LoveNotes = lazy(() => import("./components/LoveNotes"));
const SpaceBackground = lazy(() => import("./components/SpaceBackground"));
const CursorFollower = lazy(() => import("./components/CursorFollower"));
const GalaxyPage = lazy(() => import("./components/GalaxyPage"));
const EarthPage = lazy(() => import("./components/EarthPage"));
const LoveMapPage = lazy(() => import("./components/LoveMapPage"));

const MainPage = styled.div`
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;

    /* Performance optimizations */
    * {
        will-change: auto;
    }

    /* Responsive layout improvements */
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
        /* Mobile-specific optimizations */
        & > section {
            padding-left: ${({ theme }) => theme.spacing.sm};
            padding-right: ${({ theme }) => theme.spacing.sm};
        }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
        /* Small mobile optimizations */
        & > section {
            padding-left: ${({ theme }) => theme.spacing.xs};
            padding-right: ${({ theme }) => theme.spacing.xs};
        }
    }

    /* Reduce motion for users who prefer it */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }

    /* Touch device optimizations */
    @media (hover: none) and (pointer: coarse) {
        /* Larger touch targets for mobile */
        button,
        a {
            min-height: 44px;
            min-width: 44px;
        }
    }
`;

function App() {
    useEffect(() => {
        // Performance monitoring
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 100) {
                    // Log slow operations
                    console.log("Slow operation detected:", entry);
                }
            }
        });

        try {
            observer.observe({ entryTypes: ["measure", "longtask"] });
        } catch (e) {
            // Performance API not fully supported
        }

        return () => observer.disconnect();
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
                                            <ParticleBackground />
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
                            <Route path="/galaxy" element={<GalaxyPage />} />
                            <Route path="/earth" element={<EarthPage />} />
                            <Route path="/lovemap" element={<LoveMapPage />} />
                        </Routes>
                        <MusicPlayer />
                    </Suspense>
                </Router>
            </MusicProvider>
        </ThemeProvider>
    );
}

export default App;
