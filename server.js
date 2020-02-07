const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log("User disconnected");
    });
    socket.on('msg', (msg) => {
        io.emit('msg', msg);
    })
});

http.listen(5000, () => {
    console.log('Server started on port 5000');
});