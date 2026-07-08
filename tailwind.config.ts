import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          green: {
            50: "#f3f7f4",
            100: "#e4ece7",
            200: "#cbdad0",
            300: "#a3c0ae",
            400: "#749e83",
            500: "#2D5F3F", // main green
            600: "#22492f",
            700: "#1b3a26",
            800: "#173020",
            900: "#13281b",
          },
          brown: {
            50: "#faf6f0",
            100: "#f3eadc",
            200: "#e6d3ba",
            300: "#d3b48f",
            400: "#bf9366",
            500: "#8B5A2B", // coconut brown
            600: "#7c4e25",
            700: "#673f1f",
            800: "#53331b",
            900: "#442b19",
          },
          cream: {
            50: "#fdfdfc",
            100: "#FAF9F6", // background cream
            200: "#f5f3ed",
            300: "#eae6dc",
            400: "#dbd4c4",
            500: "#c7baa5",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
