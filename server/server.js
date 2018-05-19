const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');


const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
//web sockets server
var io = socketIO(server);
var users = new Users();

app.use('/', express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');



    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        //save the user in server's memory
        users.addUser(socket.id,params.name, params.room);
        //send the updated user list to everyone in the room
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        //socket.leave('');

        //io.emit -> io.to(<room name>).emit()
        //socket.broadcast.emit -> socket.broadcast.to(<room name>).emit
        //socket.emit 
        //socket.emit from Admin text Welcome to chat app
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        //socket.broadcast.emit from Admin text New user joined
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined the room`));
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));
        //server acknowledges that message was received
        callback();
        //send the message to everybody else apart from this sockete/user
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     cratedAt: new Date()
        // })
    })

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('disconnect', () => {
        // console.log('User disconnected');
        var user = users.removeUser(socket.id);

        if (user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`));
        }
    });


});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

module.exports = {
    app
}
