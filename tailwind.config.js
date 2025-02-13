/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        text: "text 5s ease infinite",
        spin: "spin 2s linear infinite",
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      colors: {
        background: "#090909",
        background_second: "#191919",
        primary_yellow: "#ffc60f",
        primary_gold: "#f67722",
        primary_pink: "#fa004e",
        dark_white: "#6f7178",
        text_color: "#bcbdcc",
        text_1: "#f7f7f5",
        text_2: "#b5b4b1",
      },
    },
  },
  plugins: [],
});
