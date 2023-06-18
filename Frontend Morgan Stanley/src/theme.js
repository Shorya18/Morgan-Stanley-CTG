import { useState } from "react";
import { createTheme } from "@mui/material/styles";
// import url('https://fonts.googleapis.com/css2?family=Merriweather&family=Montserrat:wght@600&display=swap');

import "./theme.css";

export const tokens = () => ({
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#fbe400", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#FFFFFF",
          600: "#868dfb",
          700: '#83cfcd',
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
          yellow: {
          100: "#fefacc",
          200: "#fdf499",
          300: "#fdef66",
          400: "#fce933",
          500: "#fbe400",
          600: "#c9b600",
          700: "#978900",
          800: "#645b00",
          900: "#322e00"
        },
        red: {
          100: "#fcdcdf",
          200: "#f9bac0",
          300: "#f597a0",
          400: "#f27581",
          500: "#ef5261",
          600: "#bf424e",
          700: "#8f313a",
          800: "#602127",
          900: "#301013"
},

gray: {
    100: "#e6f5f5",
    200: "#cdeceb",
    300: "#b5e2e1",
    400: "#9cd9d7",
    500: "#83cfcd",
    600: "#69a6a4",
    700: "#4f7c7b",
    800: "#345352",
    900: "#1a2929"
},

yellow: {
    100: "#fefacc",
    200: "#fdf499",
    300: "#fdef66",
    400: "#fce933",
    500: "#fbe400",
    600: "#c9b600",
    700: "#978900",
    800: "#645b00",
    900: "#322e00"
},

      });

// mui theme settings
export const themeSettings = () => {
  const colors = tokens();
  return {
    palette: {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#FFFFFF",
            },
            negative: {
              main: colors.redAccent[500],
            },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ['Merriweather', "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Merriweather', "sans-serif"].join(","),
        fontSize: 36,
      },
      h3: {
        fontFamily: ["Merriweather", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Merriweather", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};




export const useMode = () => {
  const [mode] = useState("light");


  const theme = createTheme(themeSettings(mode));
  return [theme];
};
