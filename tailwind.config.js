/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#f97316",
          DEFAULT: "#ea580c",
          dark: "#c2410c",
        },
        panel: "#f8f7ff",
      },
      boxShadow: {
        soft: "0 25px 60px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};