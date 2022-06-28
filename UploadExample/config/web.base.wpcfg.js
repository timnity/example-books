const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  entry: {
    components: ['./web/src/App.js'],
    // vendor: ['react', 'react-dom']
  },

  output: {
    path: path.resolve(__dirname, '../web/public/bundle'),
    filename: '[name].[hash:8].js',
  },

  optimization: {
    runtimeChunk: 'single',

    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all'
        }
      }
    } // end splitChunks
  }, // end optimization

  module: {
    rules: [
      { // js & jsx babel loader
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  }, // end module

  resolve: { // 可以给引用省掉后面的扩展名
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../web/template.html'),
      filename: '../index.html'
    })
  ]
};
