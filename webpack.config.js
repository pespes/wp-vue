const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './bundle.js'
  },
  resolve: {
    alias: {
      //jquery: "jquery/src/jquery"
      p5: "p5/lib/p5",
      pDom: "p5/lib/addoms/p5.dom"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },
  plugins: [
    //new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', jquery: 'jquery' }),
    new webpack.ProvidePlugin({ $p5: 'p5' }),
    new webpack.ProvidePlugin({ $pDom: 'pDom' }),
    new HtmlWebpackPlugin({ hash: true, template: './src/index.pug', filename: 'index.html' }),
    new HtmlWebpackPlugin({ hash: true, template: './src/projects.pug', filename: 'projects.html'}),
    new HtmlWebpackPlugin({ hash: true, template: './src/contact.pug', filename: 'contact.html' }),
    new ExtractTextPlugin('styles.css')
  ]
};
