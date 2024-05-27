import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: "Urbanist, Arial, sans-serif", // Use your custom font first, then fallback to system fonts
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        root: { 
          height: '45px',
          backgroundColor: 'white',
          borderRadius: 15,
          borderBottom: "none",
          paddingLeft: "5px",
          paddingRight: "5px"
        },
        indicator: {
          height: '36px',  
          background: "#ECF2FF",
          borderRadius: 15,
          marginBottom: "6px"
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          flex: 1, // flex 1 qo'shish
          maxWidth: 'none',
          zIndex: 1,
          fontFamily:"var(--pr-family)",
          fontSize: "18px",
          fontWeight: "samibold",
          textTransform:'unset',
          '&.Mui-selected': {
            color: "#000000"
          },
          
        },
        
      } 
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(7px)",
          background: "rgba(214, 214, 214, 0.4)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          backgroundColor: "var(--gr-color)",
          "& fieldset": {
            borderColor: `transparent`,
          },
          "& focus": {
            borderColor: `var(--pr-color)`,
          },
          "& active": {
            borderColor: `var(--pr-color)`,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          backgroundColor: "#FFF",
          "& fieldset": {
            borderColor: `#FFF`,
          },
          "& focus": {
            borderColor: `#FFF`,
          },
          "& active": {
            borderColor: `#FFF`,
          },
        },
        underline: {
          '&:before': {
            borderBottom: 'none', 
          },
          '&:after': {
            borderBottom: 'none', 
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: 'none', 
          }
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          backgroundColor: "#FFF",
          color: "#000",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `transparent`,
          },
          "&:focus .MuiOutlinedInput-notchedOutline": {
            borderColor: `var(--pr-color)`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: `var(--pr-color)`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "initial",
          fontFamily: "Urbanist, sans-serif",
          fontWeight: "700",
          fontSize: 18,
          lineHeight: "160%",
          letterSpacing: "0.02em",
          boxShadow: "none",
        },
        containedPrimary: {
          background: "#25252B",
          color: "#fff",
          "&:hover": {
            background: "#25252B",
            color: "#fff",
          },
        },
        textPrimary: {
          color: "#3E3D45",
          "&:hover": {
            color: "#3E3D45",
            background: "rgba(37, 37, 43, 0.05)",
          },
        },
        textInfo: {
          color: "#007AFF",
          "&:hover": {
            color: "#007AFF",
            background: "rgba(37, 37, 43, 0.05)",
          },
        },
        containedSecondary: {
          "&:hover": {
            background: "#E0FD03",
            boxShadow: "none",
          },
        },
        textSecondary: {
          color: "#CFE04D",
          "&:hover": {
            color: "#CFE04D",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
        list: {
          padding: 4,
          borderRadius: 12,
        },
      },
    },
    MuiMenuList: {
      styleOverrides: {},
    },
    MuiIconButton: {
      styleOverrides: {
        // colorPrimary:
      },
    },
  },
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#E0FD03",
    },
    text: {
      primary: "#3E3D45",
    },
    error: {
      main: "#F96159",
    },
  },
});

export default theme;
