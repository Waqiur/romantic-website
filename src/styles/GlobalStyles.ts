import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* Comprehensive hardware acceleration optimizations */
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
    perspective: 1000px;
    -webkit-perspective: 1000px;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
    overscroll-behavior: none;
    /* GPU acceleration for smooth scrolling */
    -webkit-overflow-scrolling: touch;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gradients.romantic};
    min-height: 100vh;
    overflow-x: hidden;
    overscroll-behavior: none;
    will-change: scroll-position;
    /* Enhanced CSS containment for maximum performance */
    contain: layout style paint;
    /* Force hardware compositing */
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  /* Custom scrollbar with hardware acceleration */
  ::-webkit-scrollbar {
    width: 8px;
    /* Force GPU compositing */
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    /* Prevent scrollbar from causing layout shifts */
    contain: strict;
    /* Hardware acceleration */
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gradients.primary};
    border-radius: 4px;
    /* Optimize scrollbar thumb rendering with GPU */
    will-change: transform;
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
    /* Maintain hardware acceleration on hover */
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  /* Selection styles */
  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.primary};
  }

  /* Animations */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  @keyframes sparkle {
    0%, 100% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Utility classes */
  .pulse {
    animation: pulse 2s infinite;
  }

  .float {
    animation: float 6s ease-in-out infinite;
  }

  /* Container styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: 0 ${({ theme }) => theme.spacing.sm};
      max-width: 95%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: 0 ${({ theme }) => theme.spacing.xs};
      max-width: 90%;
    }
  }

  /* Section spacing */
  section {
    padding: ${({ theme }) => theme.spacing.xxl} 0;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding: ${({ theme }) => theme.spacing.xl} 0;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      padding: ${({ theme }) => theme.spacing.lg} 0;
    }
  }

  /* Responsive typography */
  .responsive-title {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1.2;
  }

  .responsive-subtitle {
    font-size: clamp(1rem, 3vw, 1.5rem);
    line-height: 1.4;
  }

  .responsive-text {
    font-size: clamp(0.9rem, 2.5vw, 1.1rem);
    line-height: 1.6;
  }

  /* Mobile-first responsive utilities */
  .hide-mobile {
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: none;
    }
  }

  .hide-tablet {
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      display: none;
    }
  }

  .show-mobile {
    display: none;
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      display: block;
    }
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Link reset */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* List reset */
  ul, ol {
    list-style: none;
  }

  /* Focus styles */
  button:focus,
  a:focus,
  input:focus,
  textarea:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Aggressive fast scrolling optimization with hardware acceleration */
  body.scrolling-fast * {
    animation-play-state: paused !important;
    transition: none !important;
    /* Force GPU compositing during scroll */
    transform: translate3d(0, 0, 0) !important;
    -webkit-transform: translate3d(0, 0, 0) !important;
    will-change: auto !important;
  }

  body.scrolling-fast .float,
  body.scrolling-fast .pulse,
  body.scrolling-fast .sparkle {
    animation: none !important;
    /* Remove all transforms during scroll for maximum performance */
    transform: none !important;
    -webkit-transform: none !important;
  }

  /* Hardware-accelerated animation classes */
  .gpu-accelerated {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000px;
    -webkit-perspective: 1000px;
    will-change: transform, opacity;
  }

  .gpu-accelerated::before,
  .gpu-accelerated::after {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    will-change: transform, opacity;
  }

  /* Reduce motion for performance during scroll */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
