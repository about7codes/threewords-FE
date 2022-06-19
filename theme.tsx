import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#ff0000",
    contrastText: "#fff",
  },
  secondary: {
    main: "#f50057",
    contrastText: "#fff",
  },
};

const theme = createTheme({
  palette: {
    background: {
      // default: "#fff",
    },
    primary: {
      main: "#ff0000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      contrastText: "#fff",
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            "& .MuiListItemIcon-root": {
              color: colors.primary.contrastText,
            },
          },
          "&.Mui-selected:hover": {
            backgroundColor: colors.primary.main,
          },
        },
      },
    },
  },
});

export default theme;
