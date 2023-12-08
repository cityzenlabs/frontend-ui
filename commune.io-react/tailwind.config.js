/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#5081FF",
        "slate-ish": "#232427",
      },
      height: {
        700: "700px",
        440: "440px",
      },
      fontFamily: {
        sans: ["Satoshi", "sans-serif"], // Replace 'Open Sans' with your font name
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
