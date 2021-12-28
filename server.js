const express = require('express')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const enforce = require('express-sslify')

const port = process.env.PORT || 5000

const app = express()

app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.use(history())
/* eslint-disable */
app.use(serveStatic(__dirname + '/dist/spa'))
/* eslint-enable */
app.listen(port)
