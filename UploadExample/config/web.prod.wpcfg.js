const merge = require('webpack-merge');
const baseConfig = require('./web.base.wpcfg');

module.exports = merge(baseConfig, {
  mode: 'production',

  devtool: 'source-map', // webpack 官方建议生产环境也使用 sourcemap，并且使用 `source-map`选项

});
