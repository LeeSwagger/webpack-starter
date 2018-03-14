const path = require('path');
const argv = require('yargs').argv;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const isProduction = !isDevelopment;
const distPath = path.join(__dirname, '/public');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: isDevelopment
});

const config = {
  entry: {
    main: './src/js/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: distPath
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: extractSass.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: isProduction
          }
        },
          'sass-loader',
          'resolve-url-loader'
        ]
      })
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name][hash].[ext]'
        }
      }, {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 70
          }
        }
      },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'fonts/[name][hash].[ext]'
        }
      },
    }]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  optimization: isProduction ? {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
            warnings: false,
            drop_console: true,
            unsafe: true
          },
        },
      }),
    ],
  } : {},
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true,
    open: true
  }
};

module.exports = config;
