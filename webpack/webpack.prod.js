const merge = require('webpack-merge')
const baseConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
const { output, htmlWebpackPlugin, styleRule } = require('./default.const')

const prodConfig = {
    recordsPath: path.join(__dirname, 'records.json'),
    mode: 'production',
    devtool: 'none',
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
        ...output
    },
    plugins: [
        // html模板配置插件
        new HtmlWebpackPlugin({
            ...htmlWebpackPlugin,
            minify: {
                removeComments: true, // 去掉注释
                collapseWhitespace: true, // 去掉多余空白
                removeAttributeQuotes: true // 去掉一些属性的引号，例如id="moo" => id=moo
            }
        }),
        // css单独提取插件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[id].[contenthash].css'
        }),
        // 清除上次dist文件内容插件
        new CleanWebpackPlugin(),
        // 注意一定要在HtmlWebpackPlugin之后引用
        // inline 的name 和你 runtimeChunk 的 name保持一致
        new ScriptExtHtmlWebpackPlugin({
            //`runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
        }),
        // 复制静态文件
        new copyWebpackPlugin([
            {
                from: 'public-js', //静态资源路径
                to: 'public-js' //跟随output目录存放在public目录下
            }
        ])
        // webpack打包之后输出文件的大小占比
        // new BundleAnalyzerPlugin(),
        // 预渲染插件
        // new PrerenderSPAPlugin({
        //     routes: ['/', '/doc'],
        //     staticDir: path.join(__dirname, '../dist')
        //     // renderer: new Renderer({
        //     //     renderAfterTime: 50000
        //     // })
        // })
    ],
    module: {
        rules: [
            ...styleRule({
                styleLoader: MiniCssExtractPlugin.loader,
                cssLoaderModules: {
                    localIdentName: '[hash:base64:6]'
                }
            })
        ]
    },
    optimization: {
        // 性能配置
        minimizer: [
            // 打包时优化压缩css代码
            new OptimizeCssAssetsPlugin(),
            // 打包时优化压缩js代码
            new TerserPlugin({
                extractComments: false // 取消打包生产的LICENSE文件
            })
        ],
        runtimeChunk: true,
        usedExports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        splitChunks: {
            // 将多入口的公共部分单独打包
            chunks: 'all',
            minSize: 10240, // 10kb
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
            cacheGroups: {
                vendors: {
                    // name: 'vendors', // 不能添加名字，否则所有的依赖都封到一个vendors.js中了，不设名字为单独处理并添加前缀
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                components: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                default: false
            }
        }
    },
    stats: {
        entrypoints: false,
        builtAt: false,
        assets: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }
}

module.exports = merge(baseConfig, prodConfig)
