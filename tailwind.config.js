/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        "verde": "#B2B251",
        "vermelho": "#DA442F",
        "laranja": "#F4731E",
        "verde-escuro": "#3D6736"
       
      }
    },
  },
  plugins: [require('daisyui')],
}