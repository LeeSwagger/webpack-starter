const path = require('path');
const webpack = require('webpack');

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
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash'
        })
    ]
};
