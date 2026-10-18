const { themeExtend } = require("./tailwind.theme.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: themeExtend },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
