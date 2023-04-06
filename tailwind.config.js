/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
  theme: {
      extend: {
          fontFamily: {
              sans: ['Inter var, sans-serif', { fontFeatureSettings: '"cv03", "cv04", "cv11"' }],
          },
      },
  },
  plugins: [require('@tailwindcss/forms')],
}
