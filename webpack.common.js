'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, "src/js"),

    entry: {
        vendors: ["lodash"],
        index: "./index.js",
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "assets/js/[name].js",
        library: 'app'
    },

    resolve: {
        extensions: [".tsx", ".ts", "jsx", ".js"]
    },

    // externals : {  // Работа  с CDN библиотекой - без установки библиотеки
    //     _: 'lodash'
    //   },  

    module: {
        rules: [
            // {
            //     test: /\.js?$/,
            //     include: path.resolve(__dirname, "src/js"),
            //     // exclude: path.resolve(__dirname, "node_modules"),
            //     use: {
            //         loader: "babel-loader",
            //         options: {
            //             presets: ["env"],
            //             sourceMap: true
            //         },

            //     }
            // },
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './assets/images/[name].[ext]',
                            // publicPath: 'assets/'
                        }
                    }
                ]
            }
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/temlates") + '/index.pug'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            // minChunks: Infinity
        })
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // })
    ]

}