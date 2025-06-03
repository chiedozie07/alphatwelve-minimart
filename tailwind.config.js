/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //"./App.{js,jsx,ts,tsx}", // root App entry
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
