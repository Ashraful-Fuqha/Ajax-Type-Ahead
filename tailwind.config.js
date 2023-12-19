/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/js/script.js','./**/**/*.{html,js}'],
  theme: {
    extend: {
      backgroundImage:{
        'NewYork':'url("../../images/gum.jpg")',
    },
    screens:{
      'x_sm': '375px',
    }
  },
  plugins: [],
}

}