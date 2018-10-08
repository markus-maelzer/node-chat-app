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

socket.on('new-location-message', function ({ from, url, createdAt}) {
  var li = createMessageNode({ from, text: '', createdAt })
  var a = document.createElement('A');
  a.setAttribute('target', '_blank');
  a.setAttribute('href', url);
  var t = document.createTextNode('My Location');
  a.appendChild(t);
  li.appendChild(a);
  chatWindow.appendChild(li);
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


// handle location button
var locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function (e) {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser :( (better get chrome ;b)');
  }

  navigator.geolocation.getCurrentPosition(function ({coords: { latitude, longitude}}) {
    socket.emit('create-location-message', {
      from: username,
      latitude,
      longitude
    })
  }, function (err) {
    console.log(err);
    alert('Unable to fetch location :| (gosh why is this appening >-<)');
  })
})
