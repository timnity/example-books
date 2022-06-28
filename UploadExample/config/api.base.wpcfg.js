const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  entry: {
    api: './api/apiserver.js'
  },

  output: {
    path: path.resolve(__dirname, '../bundle/'),
    filename: '[name].js'
  },

  externals: [nodeExternals()], // 后端运行不需要下载 js 到前端，因此可以忽略掉 node_modules 文件夹

  plugins: [
    new CleanWebpackPlugin()
  ]
};
