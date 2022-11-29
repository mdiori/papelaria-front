/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      appgray: "#F0F0F0",
      appgreen: "#00585e",
    },
  },
  plugins: [require("daisyui")],
};
