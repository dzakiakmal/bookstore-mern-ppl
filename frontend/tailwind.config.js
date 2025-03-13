/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : '#FFCE1A', //tombol kuning
        'secondary' : '#0D0842', // warna text biru gelap
        'blackBG' : 'F3F3F3',
        'fav' : '#FF5841' // warna favorit
      },
      fontFamily:{
        'primary' : ["Inter", "sans-serif"],
        'secondary' : ["Nunito Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

