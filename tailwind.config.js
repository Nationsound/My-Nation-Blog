// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#959A4A',
        primaryHover: '#4527a0', // your custom purple
      },
    },
  },
  plugins: [],
}
