import { Inter } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "4rem",
      lineHeight: 1.1,
      fontWeight: 700,
      letterSpacing: "-.05em",
      color: "#010101",
    },
    h2: {
      letterSpacing: "-.025em",
      fontWeight: 700,
      fontSize: "3rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.75,
    },
    h4: {
      fontWeight: 300,
      fontSize: 20,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "1.125rem",
      lineHeight: 1.75,
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.75,
    },
  },
  components: {},
});

// https://material-ui.com/customization/theming/#responsivefontsizes-theme-options-theme
export default responsiveFontSizes(theme);
