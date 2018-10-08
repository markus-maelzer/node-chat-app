var socket = io('http://localhost:3000');
var username = localStorage.getItem('username');
const form = document.getElementById('message-form');
const chatWindow = document.querySelector('#chat-window');

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
  chatWindow.appendChild(createMessageNode(message))
})

function createMessageNode({ text, from, createdAt }) {
  const el = document.createElement('LI');
  el.classList.add('message');
  const t = document.createTextNode(`${from}: ${text}`);
  el.appendChild(t);
  return el;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: username,
    text: document.getElementById('message').value
  }, (data) => {
    console.log(data);
  })
})
