require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const errorHandler = require('./middlewares/ErrorHandler')
const cors = require('cors')
const router = require('./routers/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(errorHandler)
app.use(router)

app.listen(PORT, () => {
    console.log(`this app is listening to http://localhost:${PORT}`)
})