const merge = require('webpack-merge');
const config = require('./webpack.base.config.js');

module.exports = merge(config, {
    // devServer 則是 webpack-dev-server 設定
    devServer: {
        inline: true,
        port: 8009,
        open: true
    },
    mode: 'development'
});
