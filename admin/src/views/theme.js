import { defaultTheme } from "react-admin";

const myTheme = {
  ...defaultTheme,
  palette: {
    primary: "#10b981",
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
};

export default myTheme;
