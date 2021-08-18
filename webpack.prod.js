const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');
const cssFile = 'style.css';
const wwwFolder = path.join(__dirname, 'www');
const imgNames = 'img/[name].[ext]';
const tailwindConfig = require('./tailwind.config.js');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    dripdrop: path.join(__dirname, 'src', 'index.ts')
  },
  output: {
    filename: '[name][hash].js',
    chunkFilename: '[name][hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
        include: [path.join(__dirname, 'src')],
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCss.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('tailwindcss')(tailwindConfig),
               
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader?name=' + imgNames
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
    modules: [path.resolve(__dirname, './'), 'node_modules'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      _components: path.resolve(__dirname, 'src/components'),
      _models: path.resolve(__dirname, 'src/models'),
      _services: path.resolve(__dirname, 'src/services'),
      _pages: path.resolve(__dirname, 'src/pages')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      inject: true,
      filename: 'index.html'
    }),
    new MiniCss({
      filename: cssFile
    }),
    new BundleAnalyzerPlugin()
  ]
};
