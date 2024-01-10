import { createTheme } from "@mui/material/styles";

const createThemeTemplate = (themeColor) => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100vh",
          fontFamily: "Mulish, sans-serif",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1440,
    },
  },
  palette:
    themeColor === "light"
      ? {
          mode: "light",
          primary: {
            main: "#0E5B1D",
            accent: "#A4E941",
            switch: "#ffffff",
          },
          secondary: {
            main: "#e4eadd",
          },
          background: {
            paper: "#FFF",
            default: "#FFF",
          },
          buttonColor: {
            header: "#7AB02E",
            main: "#7AB02E",
            secondary: "#0E5B1D",
            hover: "#ADCF7D",
            darkHover: "#7ab02e",
            fontColor: "#FFF",
            themeSwitch: "#ffffff",
          },
          textColor: {
            fontColor: "#000000",
            header: "#FFF",
            logo: "#F1F3EF",
            title: "#000",
            main: "#7ab02e",
            grey: "#878D99",
            green: "#146817",
            darkGrey: "#5A5E67",
            iconsGrey: "#7D7D7D",
            menuHover: "#A4E941",
            black: "#FFF",
            fontError: "#000",
          },
        }
      : {
          mode: "dark",
          primary: {
            main: "#51A134",
            accent: "#EEC700",
            switch: "#000",
          },
          secondary: {
            main: "#e4eadd",
          },
          // background: "#292A2A",
          background: {
            paper: "#292A2A",
            default: "#292A2A",
          },
          buttonColor: {
            header: "#EEC700",
            main: "#EEC700",
            secondary: "#EEC700",
            hover: "#ffea9e",
            darkHover: "#ffea9e",
            fontColor: "#000",
            themeSwitch: "#ffffff",
          },
          textColor: {
            fontColor: "#FBFDF6",
            header: "#FFF",
            logo: "#F1F3EF",
            title: "#FBFDF6",
            main: "#7ab02e",
            grey: "#878D99",
            green: "#88CA1E",
            darkGrey: "#5A5E67",
            iconsGrey: "#7D7D7D",
            menuHover: "#030904",
            black: "#000",
            fontError: "#FBFDF6",
          },
        },
  typography: {
    fontFamily: "Mulish, sans-serif",
    fontHeading: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "50px",
      fontWeight: "700",
      lineHeight: "60px",
      fontStyle: "normal",
    },
    fontTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "40px",
      fontWeight: "900",
      lineHeight: "28px",
      fontStyle: "normal",
      color: "#5A5E67",
    },
    fontLink: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "22px",
      fontWeight: "300",
      lineHeight: "24px",
      fontStyle: "normal",
      color: "#384C5E",
    },
    fontHeader: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "24px",
      lineHeight: "32px",
      fontStyle: "normal",
      fontWeight: "400",
    },
    posterName: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "48px",
      fontWeight: "900",
      fontStyle: "normal",
      lineHeight: "0.5833",
    },
    posterCategory: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "calc(24 / 16)",
      textTransform: "uppercase",
    },
    posterItem: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "calc(16 / 12)",
    },
    posterTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1",
      textTransform: "uppercase",
    },
    posterBlack: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "36px",
      fontWeight: "400",
      lineHeight: "40px",
    },
    posterSubtitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "28px",
    },
    posterDescription: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "16px",
      lineHeight: "calc(24 / 16)",
    },
    posterStatus: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "8px",
      lineHeight: "16px",
      fontWeight: "400",
    },
    posterButton: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "14px",
      fontWeight: "400",
      textTransform: "uppercase",
      lineHeight: "20px",
    },
    posterPrice: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "36px",
      fontWeight: "700",
      lineHeight: "calc(28 /36)",
    },
    bigTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "98px",
      fontWeight: "500",
      lineHeight: "98px",
    },
    text: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: "28px",
    },
    textUppercase: {
      fontFamily: "Mulish, sans-serif",
      textTransform: "uppercase",
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "23.4px",
    },
  },
});

export const lightTheme = createTheme(createThemeTemplate("light"));

export const darkTheme = createTheme(createThemeTemplate("dark"));
