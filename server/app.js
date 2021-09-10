if (process.env.NODE_ENV != "production") require("dotenv").config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require("./router/index.js")
const cors = require("cors")
const errHandler = require("./middleware/errHandler.js")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)
app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})