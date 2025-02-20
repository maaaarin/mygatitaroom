import type { Config } from "tailwindcss";
const {heroui} = require("@heroui/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A3ACF",
        secondary: "#FF7DDC",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation:{
        'slow-spin': 'spin 6s linear infinite',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
export default config;
