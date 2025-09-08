export const theme = {
    colors: {
        primary: "#232946",
        secondary: "#1a1a2e",
        accent: "#232946",
        white: "#e0e6f7",
        black: "#0a0a1a",
        background: "#181c2b",
        backgroundDark: "#10121a",
        surface: "#232946",
        text: "#e0e6f7",
        textSecondary: "#b8bcd9",
        gray: {
            light: "#232946",
            medium: "#232946",
            dark: "#10121a",
        },
        gradients: {
            primary: "linear-gradient(135deg, #232946 0%, #1a1a2e 100%)",
            romantic: "linear-gradient(45deg, #232946 0%, #232946 100%)",
            sunset: "linear-gradient(135deg, #232946 0%, #181c2b 100%)",
            dreamy: "linear-gradient(120deg, #232946 0%, #181c2b 100%)",
            dark: "linear-gradient(135deg, #181c2b 0%, #232946 100%)",
        },
    },
    fonts: {
        heading: "'National Park', sans-serif",
        body: "'National Park', sans-serif",
    },
    spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        xxl: "4rem",
    },
    borderRadius: {
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        round: "50%",
    },
    shadows: {
        soft: "0 4px 20px rgba(255, 107, 157, 0.1)",
        medium: "0 8px 30px rgba(255, 107, 157, 0.15)",
        strong: "0 12px 40px rgba(255, 107, 157, 0.2)",
        glow: "0 0 30px rgba(255, 107, 157, 0.3)",
    },
    breakpoints: {
        mobile: "480px",
        tablet: "768px",
        desktop: "1024px",
        wide: "1200px",
    },
};

export type Theme = typeof theme;
