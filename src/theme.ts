import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#34495E", // Soft Sky Blue
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#B4C5E4", // Warm Coral Pink
      contrastText: "#ffffff",
    },
    background: {
      default: "#D5DBDB", // Light Cream Background
      paper: "#FFFFFF", // White for Cards, Sidebar
    },
    text: {
      primary: "#424242", // Dark Grey for readability
      secondary: "#757575", // Medium Grey for subtle text
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      textTransform: "none", // Keeps button text natural
    },
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.8rem", fontWeight: 500 },
    h3: { fontSize: "1.6rem", fontWeight: 500 },
  },
  shape: {
    borderRadius: 10, // Rounded corners for UI elements
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#bccfd2", // Sidebar Background
          color: "#34495E", // Sidebar Text Color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Smooth buttons
          padding: "8px 16px",
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF", // White Cards
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)", // Soft shadow
          padding: "16px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:nth-of-type(odd)": {
            backgroundColor: "#EAF0F1", // Alternate row color
          },
          "&:hover": {
            backgroundColor: "#A9CCE3", // Light blue hover effect
          },
        },
      },
    },
  },
});
