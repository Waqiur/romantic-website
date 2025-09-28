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
        gradients: {
            primary: "linear-gradient(135deg, #232946 0%, #1a1a2e 100%)",
            romantic: "linear-gradient(45deg, #232946 0%, #232946 100%)",
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
        strong: "0 12px 40px rgba(255, 107, 157, 0.2)",
    },
    breakpoints: {
        mobile: "480px",
        tablet: "768px",
        desktop: "1024px",
    },
};

export type Theme = typeof theme;
