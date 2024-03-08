const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const portfinder = require('portfinder')
const { output, htmlWebpackPlugin, styleRule } = require('./default.const')
const { proxyPath } = require('./proxy')

const devConfig = (port) => ({
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        ...output
    },
    plugins: [
        // 热加载插件，用于启用局部模块热重载方便我们开发
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshPlugin({
            exclude: /node_modules/,
            overlay: false
        }),
        // 优化webpack显示
        new FriendlyErrorsWebpackPlugin({
            // 清除控制台原有的信息
            clearConsole: true,
            // 打包成功之后在控制台给予开发者的提示
            compilationSuccessInfo: {
                messages: [`开发环境启动成功 \n 项目地址: http://127.0.0.1:${port} \n 代理地址: ${proxyPath} \n `]
            }
        }),
        // 配置模板html位置
        new HtmlWebpackPlugin({
            ...htmlWebpackPlugin
        })
        // react 热加载
    ],
    module: {
        rules: [
            ...styleRule({
                styleLoader: 'style-loader',
                cssLoaderModules: {
                    localIdentName: '[local]--[hash:base64:6]'
                }
            })
        ]
    },
    // node 本地服务器配置
    devServer: {
        host: '0.0.0.0',
        port,
        historyApiFallback: {
            htmlAcceptHeaders: ['text/html']
        }, // true 该选项的作用所有的404都连接到index.html
        overlay: {
            //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        },
        inline: true, // 模式
        hot: true, // 热加载
        open: true, // 打开页面
        useLocalIp: true, // 此选项允许浏览器使用本地 IP 打开
        proxy: {
            '/api': {
                target: proxyPath,
                changeOrigin: true,
                secure: false
            },
            '/sca-api': {
                target: proxyPath,
                changeOrigin: true,
                secure: false
            },
            '/common-api': {
                target: proxyPath,
                changeOrigin: true,
                secure: false
            },
            '/auth-api': {
                target: proxyPath,
                changeOrigin: true,
                secure: false
            },
            '/rasp-api': {
                target: proxyPath,
                changeOrigin: true,
                secure: false
            },
            '/homology-api': {
                target: proxyPath,
                changeOrigin: true,
                secure: false
            },
            '/admin-api': {
                target: proxyPath,
                changeOrigin: true, // 跨域 本地就会虚拟一个服务器接收你的请求并代你发送该请求
                secure: false // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器，如果你想要接受，只要设置 secure: false 就行
                // pathRewrite: { '^/api': '' } // 重写路由
            }
        }
    },
    stats: 'errors-only'
})

const getDevConfig = new Promise((res, rej) => {
    //查找端口号
    portfinder.getPort({ port: 3001, stopPort: 9000 }, (err, port) => {
        if (err) {
            rej(err)
            return
        }

        // 端口被占用时就重新设置devServer的端口
        res(merge(baseConfig, devConfig(port)))
    })
})

module.exports = getDevConfig
