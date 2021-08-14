// tailwind.config.js
module.exports = {
  jit: true,
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    
  },
  variants: {
    extend: {
      borderWidth: ['last']
    },
  },
  plugins: [],
}