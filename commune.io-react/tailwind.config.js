/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
    },
  },
  plugins: [],
};
