export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2bca43",
        },
      },
    },
    screens: {
      sm: "390px", // mobile
      md: "640px", // tablet
      lg: "1024px", // laptop
      xl: "1280px", // desktop
    },
  },
  plugins: [],
};
