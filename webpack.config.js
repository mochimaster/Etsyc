const path = require('path')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
  context: __dirname,
  entry: './frontend/craftsy.jsx',
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new WebpackNotifierPlugin({ title: 'CastleAndChair', alwaysNotify: true })
  ]
}
