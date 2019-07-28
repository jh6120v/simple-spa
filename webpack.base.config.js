const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log(__dirname);

module.exports = {
    entry: {
        b: path.join(__dirname, 'src', 'app')
    },
    output: {
        path: `${__dirname}/dist`,
        filename: 'assets/js/bundle.[hash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, '/node_modules/')
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'postcss.config'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images/',
                            name: '[name].[ext]?[hash]',
                            publicPath: '/assets/images'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2)(\?[\s\S]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts/',
                            name: '[name].[ext]?[hash]',
                            publicPath: '/assets/fonts'
                        }
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-webpack-loader',
                        options: {
                            outputFunctionName: 'echo',
                            beautify: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CleanWebpackPlugin([
            `${__dirname}/dist/assets/css/*.css`,
            `${__dirname}/dist/assets/js/*.js`
        ], {
            allowExternal: true
        }),
        new HtmlWebpackPlugin({
            template: `${__dirname}/index.html`,
            filename: 'index.html',
            inject: 'body',
            chunksSortMode: 'none'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[chunkhash].css',
            publicPath: '/'
        })
    ],
    resolve: {
        extensions: ['.js', '.css', '.scss', '.ejs'],
        modules: [
            path.resolve('./node_modules')
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'm'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'v',
                    chunks: 'all'
                }
            }
        }
    }
};
