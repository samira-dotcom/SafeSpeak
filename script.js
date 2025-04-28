const socket = io('https://safespeak-server.onrender.com'); // We'll set up a server later

const loginPage = document.getElementById('loginPage');
const chatPage = document.getElementById('chatPage');
const loginBtn = document.getElementById('loginBtn');
const usernameInput = document.getElementById('usernameInput');
const sendBtn = document.getElementById('sendBtn');
const messageInput = document.getElementById('messageInput');
const messages = document.getElementById('messages');
const onlineUsers = document.getElementById('onlineUsers');

let username = '';

loginBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        socket.emit('join', username);
        loginPage.style.display = 'none';
        chatPage.style.display = 'block';
    }
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', message);
        messageInput.value = '';
    }
});

socket.on('message', (data) => {
    const div = document.createElement('div');
    div.textContent = `${data.username}: ${data.message}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
});

socket.on('onlineUsers', (count) => {
    onlineUsers.textContent = `People online: ${count}`;
});
