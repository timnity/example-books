// Express 基础插件
const bodyParser = require('body-parser');
const compression = require('compression');
const errorhandler = require('errorhandler');

module.exports = (app, env, config) => {
  /**
   * 信任反向代理层,即Nginx,用于 Https 的信任
   */
  app.set('trust proxy', 1);

  /**
   * Http 请求解析成 json / text / raw / URL-encoded
   */
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb'
  }));

  app.use(bodyParser.json({
    limit: '10mb'
  }));

  /**
   * Http Request 压缩
   */
  app.use(compression(
    { threshhold: 512 },
    (req, res) => /json|text|javascript|css/.test(res.getHeader('Content-Type')),
    { level: 9 }
  ));

  /**
   * 判断运行环境,执行不同动作
   */
  if (env === 'development') {
    app.locals.pretty = true;

    app.use(errorhandler({
      dumpExceptions: true,
      showStack: true
    }));
  }
};
