require('dotenv').config()
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/ErrorHandler')
const cors = require('cors')
const router = require('./routers/index')
const io = require('socket.io')(server)
const messages = require('./messages')


io.on('connect', function(socket) {
    console.log(socket.id)
    socket.emit('init', messages)
    socket.on('newMessage', (message) => {
        // console.log(message)
        messages.push(message)
        socket.broadcast.emit('serverMessage', message)
    })
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(errorHandler)
app.use(router)

server.listen(PORT, () => {
    console.log(`this app is listening to http://localhost:${PORT}`)
})