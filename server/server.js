const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname , '../public');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
//web sockets server
var io = socketIO(server);


app.use('/',express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    //socket.emit from Admin text Welcome to chat app
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message)=>{
        //send the message to everybody else apart from this sockete/user
        socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            cratedAt: new Date()
        })
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

module.exports = {
    app
}
