const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const path = require('path');
const cors = require('cors');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));
app.use(cors());
app.use(express.json({type: '*/*'}));

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);
  socket.on('join', (user, callback, test) => {
    if(!isRealString(user.username) || !isRealString(user.room)) {
      console.log(user, callback);
      callback('Name and room name are required.');
      return;
    }
    socket.join(user.room);
    callback();

    socket.emit('new-message',
      generateMessage('admin','Welcome to the chat app')
    );
    socket.broadcast.to(user.room).emit('new-message',
      generateMessage('admin',`${user.username} just joined`)
    );
  })



  socket.on('create-message', (newMessage, callback) => {
    const { from, text, createdAt } = newMessage;
    const message = generateMessage(from, text, createdAt ? createdAt : null);
    console.log(message);
    io.emit('new-message', message);

    if(typeof callback === 'function') {
      console.log(typeof callback);
      callback();
    }

  })

  socket.on('create-location-message', ({ from, latitude, longitude, createdAt }) => {
    io.emit('new-location-message', generateLocationMessage(from, latitude, longitude, createdAt));
  })

  socket.on('disconnect', (reason) => {
    console.log(`user disconnected ${socket.id}`, reason);
  });
})

server.listen(port, () => {
  console.log(`Server is definately not started on port ${port}`);
})
