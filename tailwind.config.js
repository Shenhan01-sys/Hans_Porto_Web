import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";
import { themeExtend } from "./client/tailwind.theme.cjs";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: themeExtend },
  plugins: [animate, typography],
};
