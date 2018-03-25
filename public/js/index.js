var socket = io('http://localhost:3000');
var username = localStorage.getItem('username');
const form = document.getElementById('form');
const chatWindow = document.getElementsByClassName('chat-window')[0];

if(!username) {
  username = prompt('Please enter your name');
  localStorage.setItem('username', username)
}

socket.on('connect', function () {
  console.log('Connected to server');
})

socket.on('disconnect', function () {
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message) {
  chatWindow.innerHTML += '<div class="message"><p>'+ message.text +'</p><p>'+ message.from +'</p><p>'+ new Date(message.createdAt) +'</p></div>';
})

form.addEventListener('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: username,
    text: document.getElementById('message').value
  })
})
