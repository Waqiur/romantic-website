import React, { Suspense, lazy, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

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

const MainPage = styled.div`
    position: relative;

    /* Performance optimizations */
    * {
        will-change: auto;
    }

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
                            }}
                        >
                            <div style={{ position: "relative" }}>
                                {/* Floating hearts animation */}
                                <div
                                    style={{
                                        fontSize: "3rem",
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
                                        top: "-20px",
                                        left: "-30px",
                                        fontSize: "2rem",
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
                                        top: "-15px",
                                        right: "-35px",
                                        fontSize: "2.5rem",
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
                                        bottom: "-25px",
                                        left: "-20px",
                                        fontSize: "1.8rem",
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
                                        bottom: "-20px",
                                        right: "-25px",
                                        fontSize: "2.2rem",
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
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;
