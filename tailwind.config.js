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
        "verde-escuro": "#3D6736",
        "azul-escuro":"#2A3671",
        "amarelo":"#FBC540",
        "verde-amarelado":"#DBDB90",
        "azul-claro":"#94A4F1",
        "amarelo-claro":"#FFE486",
        "laranja-claro":"#FFC46D",
        "cinza-claro":"#F8F9E6",
        "verde-claro":"#BFC71A",
        "amarelo-escuro":"#DBA726",
        "vermelho-claro":"#EF7160",
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
      backgroundImage: {
        "fundo-login": "url('./assets/fundo-login.png')"
      }
    },
  },
  plugins: [require('daisyui')],
}