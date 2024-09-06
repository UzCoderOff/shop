/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        524: "524px",
        960: '960px',
        810: '810px'
      },
      colors: {
        primary: "#db4444",
      }
    },
  },
  plugins: [],
};
