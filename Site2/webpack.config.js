const path = require('path');
module.exports = {
  entry: {
    // pageInicial: './js/View/index.js'
    index: './js/View/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  // plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ],
  resolve: {
    alias: {
      'node_modules': path.join(__dirname, 'node_modules'),
    }
  },
  target: 'node',
  mode: 'production'
};