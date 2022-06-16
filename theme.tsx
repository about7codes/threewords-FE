import { createTheme } from "@mui/material/styles";

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
});

export default theme;
