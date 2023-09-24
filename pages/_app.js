import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    button: {
      main: "#2F80ED",
      grey: "#4F4F4F",
      lightGrey: "#828282",
      white: "#E0E0E0",
    },
    indicator: {
      orange: "#F8B76B",
      purple: "#8785FF",
      red: "#EB5757",
      yellow: "#F2C94C",
    },
    chat: {
      orange: "#FCEED3",
      orangeTooltip: "#E5A443",
      purple: "#EEDCFF",
      purpleTooltip: "#9B51E0",
      green: "#D2F2EA",
      greenTooltip: "#43B78D",
    },
    sticker: {
      grey: "#E9F3FF",
      orange: "#FDCFA4",
      yellow: "#F9E9C3",
      green: "#AFEBDB",
      lightGreen: "#CBF1C2",
      purple: "#CFCEF9",
      pink: "#F9E0FD",
    },
  },
  typography: {
    title: {
      fontSize: "16px !important",
      fontWeight: "bold !important",
    },
    name: {
      fontSize: "14px !important",
      fontWeight: "bold !important",
    },
    body1: {
      fontSize: "16px !important",
      fontWeight: "normal !important",
    },
    body2: {
      fontSize: "14px !important",
      fontWeight: "normal !important",
    },
    body3: {
      fontSize: "12px !important",
      fontWeight: "normal !important",
    },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
