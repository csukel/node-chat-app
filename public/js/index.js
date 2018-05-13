//request initialization, creates connection and store socket into the variable
var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage',function(message){
    console.log('newMessage',message);
    var container = jQuery('#messages');
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    container.append(li);
})

// socket.emit('createMessage',{
//     from:'Frank',
//     text: 'Hi'
// },function(data){
//     console.log('Got it',data);
// })


jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(data){
        console.log(data);
        //clear input message
        jQuery('[name=message]').val('');
    })
})