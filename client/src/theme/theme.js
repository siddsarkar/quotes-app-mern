import { createMuiTheme } from "@material-ui/core/styles";
import { light } from "@material-ui/core/styles/createPalette";

export const theme = createMuiTheme({
  palette: {
    ...light,
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    other: {
      dark: {
        main: "#1b1b1b",
      },
    },
  },
});
