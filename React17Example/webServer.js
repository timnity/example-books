const http = require('http')
const path = require('path')
const express = require('express')
const errorhandler = require('errorhandler')

/* 创建服务器 */
const app = express()

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

/* 判断运行环境,执行不同动作 */
if (env === 'development') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackConfig = require('./wpcfg.js')
    // webpack 热更新
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }))
    app.use(webpackHotMiddleware(compiler))

    // handle error
    app.locals.pretty = true
    app.use(errorhandler({ dumpExceptions: true, showStack: true })
    )
}

const router = express.Router()
app.use(router)

app.use('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname })
})

/* 启动服务 */
const server = http.createServer(app)
server.listen(port, () => {
    console.log(`==> 🌐  URL=http://localhost:${port}, ENV=${env}`)
})
