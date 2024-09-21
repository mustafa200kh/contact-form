/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "567px",
        md: "767px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      fontFamily: {
        sans: ["Karla", "sans-serif"],
      },
      colors: {
        mainColor: "#0c7d69",
        hoverColor: "#063f36",
        textColor: "#777",
        bgColor: "#e0f1e7",
      },
    },
  },
  plugins: [],
};
