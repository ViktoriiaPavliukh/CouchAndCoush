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
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: 0,
          [`@media (min-width: 375px)`]: {
            paddingLeft: "0",
            paddingRight: "0",
          },
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
      xl: 1920,
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
            sidebar: "#FAFAFA",
            mainPage: "#FAFAFA",
            messages: "#ffffff",
            messagesDate: "#f3f4f6",
            messagesUsers: "#d1d5db",
            card: "#FFF",
            language: "#f3f4f6",
            yellow: "#EEC700",
          },
          buttonColor: {
            header: "#7AB02E",
            main: "#0E5B1D",
            secondary: "#87B925",
            secondaryHover: "#6B9E00",
            greenDark: "#0d5b1c",
            listItem: "#0d5b1c",
            greenDarkHover: "#004305",
            lightYellow: "#87B925",
            lightYellowHover: "#6B9E00",
            greenYellow: "#0E5B1D",
            greenYellowHover: "#004305",
            hover: "#1D570A",
            darkHover: "#7ab02e",
            fontColor: "#FFF",
            fontColorSecondary: "#FFF",
            themeSwitch: "#ffffff",
            send: "#1F2937",
            disabled: "#E5E5E5",
          },
          buttonColorComponentFigma: {
            defaultGreen: "#0E5B1D",
            hoverGreen: "#004305",
          },
          textColor: {
            fontColor: "#000000",
            green: "#0d5b1c",
            header: "#FFF",
            logo: "#F1F3EF",
            title: "#000",
            main: "#7ab02e",
            lightYellow: "#87B925",
            grey: "#878D99",
            green: "#146817",
            darkGrey: "#5A5E67",
            greenYellowHover: "#004305",
            iconsGrey: "#7D7D7D",
            menuHover: "#A4E941",
            greyWhite: "#030904",
            black: "#FFF",
            fontError: "#000",
            sidebar: "#4B5563",
            links: "#0E5B1D",
            remarks: "#4B5563",
            linkHover: "#004305",
            red: "#b91c1b",
            listColor: "#1f2937",
            disabled: "#6A7280",
          },
        }
      : {
          mode: "dark",
          primary: {
            main: "#387024",
            accent: "#EEC700",
            switch: "#000",
          },
          secondary: {
            main: "#e4eadd",
          },
          background: {
            paper: "#292A2A",
            default: "#292A2A",
            sidebar: "#3C3D3D",
            mainPage: "#262626",
            messages: "#404040",
            messagesDate: "#737373",
            messagesUsers: "#737373",
            card: "#262626",
            language: "#171717",
            yellow: "EEC700",
          },
          buttonColor: {
            header: "#EEC700",
            headerHover: "#CFAC00",
            main: "#87B925",
            secondary: "#387024",
            secondaryHover: "#1D570A",
            greenDark: "#387024",
            listItem: "#EEC700",
            greenDarkHover: "#1D570A",
            lightYellow: "#EEC700",
            lightYellowHover: "#CFAC00",
            greenYellow: "#EEC700",
            greenYellowHover: "#CFAC00",
            hover: "#6B9E00",
            darkHover: "#ffea9e",
            fontColor: "#000",
            fontColorSecondary: "#FFF",
            themeSwitch: "#ffffff",
            send: "#9CA3AF",
            disabled: "#A1A1AA",
          },
          buttonColorComponentFigma: {
            defaultGreen: "#387024",
            hoverGreen: "#1D570A",
          },
          textColor: {
            fontColor: "#FBFDF6",
            green: "#0d5b1c",
            header: "#FFF",
            logo: "#F1F3EF",
            title: "#FBFDF6",
            main: "#7ab02e",
            lightYellow: "#EEC700",
            grey: "#878D99",
            green: "#88CA1E",
            darkGrey: "#5A5E67",
            greenYellowHover: "#CFAC00",
            iconsGrey: "#7D7D7D",
            menuHover: "#030904",
            greyWhite: "#FFFFFF",
            black: "#000",
            fontError: "#FBFDF6",
            sidebar: "#FBFDF6",
            links: "#EEC700",
            remarks: "#D1D5DB",
            linkHover: "#CFAC00",
            red: "#b91c1b",
            listColor: "#FFFFFF",
            disabled: "#6C7280",
          },
        },
  typography: {
    fontFamily: "Mulish, sans-serif",
    fontHeading: {
      fontFamily: "Mulish, sans-serif",
      fontWeight: "700",
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
      lineHeight: "16px",
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
      fontWeight: "400",
      lineHeight: "28px",
      textTransform: "capitalize",
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
    title: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "72px",
      fontWeight: "500",
      lineHeight: "72px",
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
      fontWeight: "400",
      lineHeight: "28px",
    },
    textBase: {
      fontFamily: "Mulish, sans-serif",
      textTransform: "uppercase",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "20px",
    },
    textUppercase: {
      fontFamily: "Mulish, sans-serif",
      textTransform: "uppercase",
      fontSize: "18px",
      fontWeight: "500",
      lineHeight: "23.4px",
    },
    posterPopupTitle: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "20px",
      fontWeight: "400",
      lineHeight: "28px",
    },
    posterTitleBold: {
      fontFamily: "Mulish, sans-serif",
      fontSize: "20px",
      fontWeight: "500",
      lineHeight: "140%",
    },
  },
  button: {
    width: "200px",
    p: "12px 32px",
    borderRadius: "6px",
    buttonPopup: { minWidth: "200px", p: "12px 32px", borderRadius: "6px" },
  },
});

export const lightTheme = createTheme(createThemeTemplate("light"));

export const darkTheme = createTheme(createThemeTemplate("dark"));
