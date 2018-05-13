const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const publicPath = path.join(__dirname , '../public');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
//web sockets server
var io = socketIO(server);


app.use('/',express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New user connected');

    // socket.emit('newEmail',{
    //     from: 'Loucas Stylianou',
    //     text: 'Hello new user',
    //     createdAt: new Date()
    // });

    //socket.emit from Admin text Welcome to chat app
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to chat app'
    });
    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined'
    })

    // socket.on('createEmail',(newEmail)=>{
    //     console.log('createEmail',newEmail);
    // })
    socket.on('createMessage',(message)=>{
        //console.log(message);
        //broadcast message
        // io.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     cratedAt: new Date()
        // });
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
