/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'Poetse':["Poetsen One", "sans-serif"],
        "Poppins":['Poppins',"sans-serif"],
        'Ubuntu':['Ubuntu','sans-serif'],
        'Lato':["Lato", 'sans-serif']
      }
    },
  },
  plugins: [],
}

