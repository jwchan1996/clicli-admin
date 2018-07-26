const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  resolve: {
    alias: {
      component: path.resolve(__dirname, 'src/component'),
      common: path.resolve(__dirname, 'src/common'),
      api: path.resolve(__dirname, 'src/api'),
      base: path.resolve(__dirname, 'src/base'),
      store: path.resolve(__dirname, 'src/store'),
      hoc: path.resolve(__dirname, 'src/hoc')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-1'],
            plugins: ['transform-decorators-legacy']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]

      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "css/[id].css"
    }),
  ],
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 1122,
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/api/login': {
        target: 'http://api.chinko.cc/'
      }
    }
  }
}