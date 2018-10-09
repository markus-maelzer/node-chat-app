const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const  { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.emit('newMessage',
    generateMessage('admin','Welcome to the chat app')
  );

  socket.broadcast.emit('newMessage',
    generateMessage('admin',`${socket.id} just joined`)
  ),

  socket.on('createMessage', (newMessage, callback) => {
    const { from, text } = newMessage;
    io.emit('newMessage',
      generateMessage(from, text)
    );
    if(typeof callback === 'function') callback();
  })

  socket.on('create-location-message', ({ from, latitude, longitude }) => {
    io.emit('new-location-message', generateLocationMessage(from, latitude, longitude));
  })

  socket.on('disconnect', (reason) => {
    console.log(`user disconnected ${socket.id}`, reason);
  });
})

server.listen(port, () => {
  console.log(`Server is definately not started on port ${port}`);
})
