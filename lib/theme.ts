"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0F172A",
      light: "#334155",
      dark: "#020617",
      contrastText: "#F8FAFC",
    },
    secondary: {
      main: "#2563EB",
      light: "#60A5FA",
      dark: "#1D4ED8",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
    divider: "#E2E8F0",
    error: {
      main: "#DC2626",
    },
    success: {
      main: "#16A34A",
    },
    warning: {
      main: "#D97706",
    },
  },
  typography: {
    fontFamily: "'Geist', system-ui, -apple-system, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    subtitle1: {
      fontWeight: 500,
    },
    body2: {
      color: "#475569",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E2E8F0",
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            fontWeight: 600,
            backgroundColor: "#F8FAFC",
            color: "#475569",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
        },
      },
    },
  },
});

export default theme;
