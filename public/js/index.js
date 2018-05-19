//request initialization, creates connection and store socket into the variable
var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


socket.on('newMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        timestamp: formattedTime,
        from: message.from
    });

    jQuery('#messages').append(html);
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log('newMessage',message);
    // var container = jQuery('#messages');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // container.append(li);
})

socket.on('newLocationMessage',function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        timestamp: formattedTime,
        from: message.from,
        url: message.url
    });
    jQuery('#messages').append(html);

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});


// socket.emit('createMessage',{
//     from:'Frank',
//     text: 'Hi'
// },function(data){
//     console.log('Got it',data);
// })


jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    },function(data){
        console.log(data);
        //clear input message
        messageTextbox.val('');
        messageTextbox.focus();
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click',function(e){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled',true).text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position){
        // console.log(position);
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
        
    },function(e){
        
        alert('Unable to fetch location');
    })
});