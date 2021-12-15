const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const template = path.resolve(__dirname, './index.html');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            // 将es6编译成es5
            { 
                test: /\.jsx?$/,   // ?表示x有0个或一个
                exclude: /node_modules/,  // 不编译某个目录下的文件
                include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
                use: [
                    "babel-loader",
                ]
            },
            // 将es6编译成es5
            { 
                test: /\.jsx?$/,   // ?表示x有0个或一个
                exclude: /node_modules/,  // 不编译某个目录下的文件
                include: path.resolve(__dirname, '../src'),  // 只在include包含的目录下进行loader编译
                use: [
                    "babel-loader",
                ]
            },
            // 加载css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template,
            filename: 'index.html'
        })
    ],
    // 服务器配置
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        port: 8888,
        host: 'localhost',
        open: true, // open browser auto
        // index: 'index.html', // like HtmlWebpackPlugin
        hot: true,
        compress: true // compress
    }
}