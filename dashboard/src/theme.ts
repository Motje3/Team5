import { createTheme } from "@mui/material/styles";

// color design tokens
export const tokens = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#4d4d4d",
    700: "#333333",
    800: "#1a1a1a",
    900: "#0a0a0a",
    1000: "#000000",
  },
  primary: {
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#434957",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },
  // Added custom colors to match the second screenshot
  custom: {
    sidebar: "#1e0d40", // Sidebar color
    background: "#0d0625", // Main background color - darker purple
  }
};

// Updated theme with darker background
export const theme = createTheme({
  palette: {
    primary: {
      main: tokens.primary[500],
    },
    secondary: {
      main: tokens.grey[500],
    },
    background: {
      default: tokens.custom.background, // Set to darker purple background
    },
  },
});