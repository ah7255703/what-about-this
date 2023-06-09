/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      container:{
        center:true
      }
    },
    fontFamily: {
      cairo: ["var(--font-cairo)", "sans-serif"],
      noto: ["var(--font-noto)", "sans-serif"],
    },
  },
  plugins: [],
};
