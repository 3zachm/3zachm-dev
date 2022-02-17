module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        Manrope: ["Manrope", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        Material: ["Material Icons", "sans-serif"],
      },
      backgroundImage: {
        "pfp": "url('/img/pfp.webp')",
      },
    },
  },
  plugins: [],
}
