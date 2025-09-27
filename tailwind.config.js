// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#5C4033",    // dark brown for navbar
        "primary-light": "#F5F0E1",   // light background for pages
        "accent-yellow": "#FFD966",
        "accent-orange": "#FFB347",
      },
    },
  },
  plugins: [],
};
