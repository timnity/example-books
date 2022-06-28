const webpack = require('webpack')

// TO-DEL: Speed Measure 和 HotModuleReplacementPlugin 不能共用 Web dev 打包中要去掉
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 图形显示打包大小

module.exports = {
    mode: 'development',

    node: {
        __dirname: true, // if you don't put this is, __dirname and __filename return blank
    },

    entry: {
        css: ['webpack-hot-middleware/client', './main.scss'],
        components: ['webpack-hot-middleware/client', './App.js'],
    },

    // 开发环境不用设置 path，只有在打包发布时才需要
    output: {
        filename: '[name].js',
        publicPath: '/',
    },

    module: {
        rules: [
            { // js & jsx babel loader
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['thread-loader', 'babel-loader?cacheDirectory'],
            }, // end babel loader

            { // scss & css rules | 涉及 postcss 中的 import ，要使用 url: false
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { url: false } },
                    'sass-loader'
                ],
            },
        ],
    }, // end module


    resolve: {
        extensions: ['.js'], // 可以给引用省掉后面的扩展名
    },


    optimization: {
        runtimeChunk: 'single', // 热加载需要用到, index.html中需要引入runtime.min.js

        splitChunks: {
            cacheGroups: { // cacheGroups 可以覆盖大部分默认配置
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // 默认第三方库全部独立到 vendor.js 中
                    priority: -10, // 一个模块可以属于多个缓存组，优先级高的缓存组会覆盖优先级低的缓存组
                    reuseExistingChunk: true,
                    name: 'vendors',
                    chunks: 'all',
                },
            }
        }
    },


    externals: { // 不打包指定的库
        react: 'React', // 大小写一定不能改，互相引用时这样大小写是固定的
        'react-dom': 'ReactDOM',
    },


    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        // new BundleAnalyzerPlugin({ // 打包文件大小图形显示
        //     analyzerMode: 'static',
        //     openAnalyzer: true,
        //     logLevel: 'info'
        // }),
    ],
}
