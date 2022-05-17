module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1650px",
    },
    extend: {
      spacing: {
        4.5: "1.125rem", // 18px
        7.5: "1.875rem", // 30px
      },
      maxWidth: {
        80: "20rem", // 320px
      },
      colors: {
        primary: "#005EFF",
      },
      fontFamily: {
        roboto: ["roboto", "sans-serif"],
        inter: ["inter", "sans-serif"],
      },
      backgroundImage: {
        gradient: "linear-gradient(202.17deg, #005EFF 8.58%, #00FFE0 91.42%)",
      },
    },
  },
  plugins: [],
};
