module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadein: 'fade .3s ease-in-out forwards',
        fadeout: 'fade .3s ease-in-out reverse forwards',
      },

      // that is actual animation
      keyframes: (theme) => ({
        fade: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
}
