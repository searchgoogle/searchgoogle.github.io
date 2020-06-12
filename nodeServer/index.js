//Node server that handle all socket server
const io = require('socket.io')(8000)

const users={}
io.on("connection", socket =>{
    //If any user joins ,let other user know 
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone to sends a message broadcast to others
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //If someone leaves the chat let other know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});