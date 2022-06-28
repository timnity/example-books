const { HotModuleReplacementPlugin } = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const merge = require('webpack-merge');
const baseConfig = require('./web.base.wpcfg');

module.exports = merge(baseConfig, {

  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    components: ['webpack-hot-middleware/client']
  },

  output: {
    publicPath: '/bundle/' // 热加载输出用
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ]

});
