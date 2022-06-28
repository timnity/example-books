const http = require('http');
const express = require('express');

const config = require('../config/config.js');

/**
 * 創建服務器
 */
const app = (module.exports = express());

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || config.apiport || 3000;

app.set('env', env);
app.set('port', port);

require('./server/api-express')(app, env, config);

require('./server/api-routes')(express, app, config);

http.createServer(app).listen(port, () => {
  console.info(`\n\x1b[32m==> 🌐  \x1b[33m${config.name}\x1b[32m API Server started on port \x1b[31m${port}\x1b[32m, env=\x1b[33m${env}\x1b[32m`);
});
