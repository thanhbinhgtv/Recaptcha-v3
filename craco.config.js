const path = require('path')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    },
    // postcss: {
    //   plugins: [require('postcss-rtl')()]
    // }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    }
  }
}
