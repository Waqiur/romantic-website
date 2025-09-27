import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.black};
    background: ${({ theme }) => theme.colors.gradients.romantic};
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gradients.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
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

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes heartBeat {
    0%, 100% {
      transform: scale(1);
    }
    14% {
      transform: scale(1.3);
    }
    28% {
      transform: scale(1);
    }
    42% {
      transform: scale(1.3);
    }
    70% {
      transform: scale(1);
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
  .fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  .float {
    animation: float 6s ease-in-out infinite;
  }

  .heart-beat {
    animation: heartBeat 1.3s ease-in-out infinite;
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

  /* Responsive grid */
  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
      gap: ${({ theme }) => theme.spacing.md};
    }
  }

  /* Responsive flex */
  .responsive-flex {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      flex-direction: column;
      align-items: center;
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
`;
