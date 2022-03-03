// tailwind.config.js
module.exports = {
  important: false,
  mode: 'jit',
  content: ['./src/**/*.pug', './src/**/*.ts'],
  purge: [

    './src/**/*.pug',

    './src/**/*.{js,jsx,ts,tsx,vue}',

  ],
}