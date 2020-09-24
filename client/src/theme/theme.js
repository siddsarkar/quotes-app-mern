import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
// import { colors } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgba(0, 0, 0, 0.87)",
    },
    text: blue,
    secondary: {
      main: "#303f9f",
    },
  },
});
