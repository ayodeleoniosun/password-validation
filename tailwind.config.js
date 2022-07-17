/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        success: "#57D17A",
        error: "#FB3511",
      },
    },
  },
  plugins: [],
};
