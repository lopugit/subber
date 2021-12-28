const express = require('express')
const enforce = require('express-sslify')

const port = process.env.PORT || 5000

const app = express()

app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.listen(port)

app.get('*', (req, res) => {
  res.redirect('https://ytsubber.com')
})
