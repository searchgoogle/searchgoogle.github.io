const socket = io('http://localhost:8000');

//Get Dom element in respective Js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

//Audio that will play on receving messages
var audio = new Audio('ting.mp3')

//Function which will append to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

//Form send to server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''

})

//New user name
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//If a new user joined ,receive his/her name
socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'right')

})

//Receive the data
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
    
    })

//Leaving user event
socket.on('left', name =>{
    append(`${name} left the chat`, 'left')
        
    })