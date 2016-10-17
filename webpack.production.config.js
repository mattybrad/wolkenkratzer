var path = require('path');

module.exports = {
  entry: './src/client.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
