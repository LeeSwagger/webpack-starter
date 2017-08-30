const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDevelopment = !process.env.production;
const assetsPath = path.join(__dirname, '/public');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css',
    disable: isDevelopment
});

if (isDevelopment) {
    fs.readdirSync(assetsPath)
        .map(fileName => path.extname(fileName) === '.css' ? fs.unlinkSync(`${assetsPath}/${fileName}`) : '');
}

module.exports = {
    entry: {
        main: './src/js/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }]
        }, {
            test: /\.scss$/,
            exclude: [/node_modules/],
            use: extractSass.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader', 'resolve-url-loader']
            })
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        extractSass
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
    }
};
