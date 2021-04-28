const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,'../public')

app.use(express.static(publicDirPath))

let count=0

io.on('connection', (socket) => {
    console.log('New Socket connection')

    // socket.emit('countUpdated',count)

    // socket.on('increment', () => {
    //     count++
    //     //socket.emit('countUpdated',count) //emits only to a specific client
    //     io.emit('countUpdated',count)
    // })

    socket.emit('message','Welcome!')
    socket.broadcast.emit('message','New user joinied')
    socket.on('sendMessage', (data) => {
        io.emit('message', data)
    })
    socket.on('disconnect', () => {
        io.emit('message','User has left')
    })
})

server.listen(port, () => {
     console.log('Port listening on ' + port)
})