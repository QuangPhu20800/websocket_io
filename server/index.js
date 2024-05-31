const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('toClient', (data) => {
        console.log(data);
        io.emit('toServer', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080'));
