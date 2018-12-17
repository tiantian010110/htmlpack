const htmlPlugin = require('./plugins/htmlPlugin');
const stylePlugin = require('./plugins/stylePlugin');
const concatAssetsPlugin = require('./plugins/concatAssetsPlugin');

module.exports = {
    module: require('./module.config'),
    sourceDir: 'src',
    entry: ['load'], //从module.config.js中指定一个key值作为入口
    output: {
        baseDir: 'build',
        relative: true
    },
    // minify: true,
    plugins: [
        new concatAssetsPlugin(),
        new htmlPlugin()
    ],
    console: true,
    server: {
        port: 8000,
        // hostname: '192.168.1.170:8080',
        hostname: 'testmp.zanchina.com',
        protocol: 'http',
        debug: true
    }
}