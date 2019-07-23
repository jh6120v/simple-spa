const config = require("./webpack.base.config.js");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(config, {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions:{
                    compress: {
                        warnings: false,
                        drop_console: true
                    },
                    output: {
                        // 清除註解
                        comments: false,
                    }
                }
            })
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: false
        })
    ],
    mode: 'production'
});