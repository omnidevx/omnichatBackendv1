var socket_io = require('socket.io');
var io       = socket_io();
var socketio = {};
socketio.io  = io;
var users = [];
io.on('connection', function(socket){

    console.log('A user connected');
    socket.on('join', function (user){
        socket.username = user.username;
        users.push(socket.username);
        io.emit('user joined', { 'username': user.username, users:users });
    });

    socket.on('typing', function (msg) {
        io.emit('typing', { 'message': msg.message, 'username': msg.username });
    });
    socket.on('new_message', function (msg) {
        io.emit('chat message', { 'message': msg.message, 'username': msg.username });
        console.log(JSON.stringify(msg, 'undefined', 2));
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
        users.splice(users.indexOf(socket.username), 1);

        io.emit('user disconnected', { 'username': socket.username });
    });

});

module.exports = socketio;