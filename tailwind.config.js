/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      green: colors.green,
      yellow: colors.yellow,
      pink: {
        100: "#f9bae4",
        200: "#f98bd2",
        300: "#fb54bd",
        400: "#ff00aa",
        500: "#ff0094",
        600: "#f2008f",
        700: "#da0089",
        800: "#c30084",
        900: "#98007c",
      },
      blue: {
        100: "#b3e5ff",
        200: "#81d5ff",
        300: "#4dc4ff",
        400: "#24b7ff",
        500: "#00aaff",
        600: "#079cef",
        700: "#0c89db",
        800: "#0b77c7",
        900: "#0d57a4",
      },
    },
  },
  plugins: [],
};
