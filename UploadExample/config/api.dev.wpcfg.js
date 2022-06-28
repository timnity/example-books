const merge = require('webpack-merge');
const baseConfig = require('./api.base.wpcfg');

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'inline-source-map',

});
