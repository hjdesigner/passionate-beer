module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {
      mixinsFiles: './**/**/*.mixins.css',
    },
    'postcss-pxtorem': {
      mediaQuery: true,
      rootValue: 16,
      propList: ['*', '!border-width', '!border'],
    },
    'autoprefixer': {},
  },
};