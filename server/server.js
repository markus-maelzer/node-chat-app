const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');

const fs = require('fs');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log(`user disconnected ${socket.id}`, reason);
  });

  socket.on('createMessage', (newMessage) => {
    const { from, text } = newMessage;
    socket.broadcast.emit('newMessage', {
      from,
      text,
      id: socket.id,
      createdAt: new Date().getTime(),
    })
  })





})

server.listen(port, () => {
  console.log(`Server is definately not started on port ${port}`);
})
