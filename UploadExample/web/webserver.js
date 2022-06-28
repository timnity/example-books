const http = require('http');
const path = require('path');
const express = require('express');
const errorhandler = require('errorhandler');

const config = require('../config/config');

const app = express();
const port = process.env.PORT || config.webport || 3000;
const env = process.env.NODE_ENV || 'development';


/**
 * 用于指定URL路径和服务器路径的映射
 */
const publicDir = path.resolve(__dirname, './public');
app.use('/', express.static(publicDir));


/**
 * 判断运行环境,执行不同动作
 */
if (env === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../config/web.dev.wpcfg.js');
  const compiler = webpack(webpackConfig);
  // 前端 web 热更新
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));

  // handle error
  app.locals.pretty = true;
  app.use(errorhandler({
    dumpExceptions: true,
    showStack: true
  }));
}


/**
 * 路由
 */
const router = express.Router();

app.use('/', router);

app.use((req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});


/**
 * 启动服务
 */
http.createServer(app).listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌐  Server started on port ${port}, env=${env}`);
  }
});
