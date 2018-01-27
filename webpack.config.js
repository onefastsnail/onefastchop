const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const distDir = path.resolve(__dirname, 'assets/dist/');
const srcDir = path.resolve(__dirname, 'assets/js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
    entry: `${srcDir}/index.js`,
    output: {
        path: distDir,
        filename: 'js/bundle.js'
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'css/bundle.css' }),
        HtmlWebpackPluginConfig
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                include: srcDir,
                loader: 'babel-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                })
            }
        ]
    }
};
