import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import ParticleBackground from "./components/ParticleBackground";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import InteractiveSection from "./components/InteractiveSection";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import FloatingHearts from "./components/FloatingHearts";
import LoveNotes from "./components/LoveNotes";
import SpaceBackground from "./components/SpaceBackground";

const AppContainer = styled.div`
    position: relative;
    overflow-x: hidden;
`;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppContainer>
                <SpaceBackground />
                <ParticleBackground />
                <MusicPlayer />
                <HeroSection />
                <AboutSection />
                <InteractiveSection />
                <Footer />
                <FloatingHearts />
                <LoveNotes />
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;
