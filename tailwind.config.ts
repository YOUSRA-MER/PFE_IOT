import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable dark mode using class strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lamaSky: "#A4D7E1",        // Soft sky blue
        lamaSkyLight: "#F0F4F8",   // Very light sky blue
        lamaPurple: "#B39BCB",     // Elegant muted purple
        lamaPurpleLight: "#EAB8E4", // Soft pastel purple
        lamaYellow: "#F6E58D",     // Warm golden yellow
        lamaYellowLight: "#F9E79F"  // Soft pastel yellow
      }
    },
  },
  plugins: [],
};
export default config;