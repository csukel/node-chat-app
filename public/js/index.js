//request initialization, creates connection and store socket into the variable
var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');

    // socket.emit('createEmail',{
    //     from: 'New user',
    //     text: 'Hello Loucas. This is from the client',
    //     createdAt: new Date()
    // })

    // socket.emit('createMessage',{
    //     from: 'Loucas',
    //     text: 'Message to another user'
    // });
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// socket.on('newEmail',function(email){
//     console.log('New email',email);
// })

socket.on('newMessage',function(msg){
    console.log(msg);
})