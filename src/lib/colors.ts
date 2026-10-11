// Color scheme extracted from Figma design
export const colors = {
    primary: {
        50: "#F8F2FF",
        100: "#F2E7FF",
        200: "#EDDDFF",
        500: "#872BFF", // Main purple
        600: "#6A14DA",
        700: "#5B11B8",
        900: "#4A0D96",
    },
    secondary: {
        50: "#FFE7F8",
        100: "#FFCEF0",
        500: "#F411CF", // Pink accent
        600: "#EB00A5",
        700: "#C2007B",
    },
    accent: {
        blue: "#2FA6D9",
        yellow: "#FACD49",
        orange: "#FCC417",
    },
    neutral: {
        white: "#FFFFFF",
        gray: {
            50: "#F8F8F8",
            100: "#F7F7F7",
            200: "#EEEEEE",
            300: "#E9E9E9",
            400: "#D8D8D8",
            500: "#A8A8A8",
            600: "#8C8C8C",
            700: "#707487",
            800: "#353535",
            900: "#1C1C1C",
        },
    },
} as const;
