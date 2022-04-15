const path = require('path');
const Copy = require('copy-webpack-plugin');
const webpack = require('webpack');
const TerserWebpack = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main: './main.ts',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
    },
    mode: process.env.NODE_ENV || 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserWebpack({ extractComments: false })],
    },
    target: 'node',
    externals: {
        utools: 'window.utools',
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
        new Copy({
            patterns: [
                {
                    from: path.join(__dirname, './public/'),
                    to: path.join(__dirname, './dist'),
                },
            ],
        }),
        new webpack.DefinePlugin({
            LOG_PATH: JSON.stringify(path.join(process.cwd(), './log.txt')),
        }),
    ],
};
