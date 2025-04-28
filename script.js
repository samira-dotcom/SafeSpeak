let username = "";
const chatBox = document.getElementById("chat-box");
const loginSection = document.getElementById("login-section");
const chatSection = document.getElementById("chat-section");
const sendBtn = document.getElementById("send-btn");
const messageInput = document.getElementById("message-input");
const ventBtn = document.getElementById("vent-btn");
const ventingInput = document.getElementById("venting-input");

// Handle Login
document.getElementById("login-btn").addEventListener("click", () => {
    username = document.getElementById("username").value;
    if (username !== "") {
        loginSection.style.display = "none";
        chatSection.style.display = "block";
        alert("Welcome " + username + "! You are now logged in.");
    } else {
        alert("Please enter a username.");
    }
});

// Handle sending chat message
sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    if (message !== "") {
        const messageElement = document.createElement("div");
        messageElement.textContent = username + ": " + message;
        chatBox.appendChild(messageElement);
        messageInput.value = "";  // Clear input
        chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to bottom
    }
});

// Handle venting
ventBtn.addEventListener("click", () => {
    const vent = ventingInput.value;
    if (vent !== "") {
        const ventElement = document.createElement("div");
        ventElement.style.fontStyle = "italic";
        ventElement.style.color = "#555";
        ventElement.textContent = "Anonymous Vent: " + vent;
        chatBox.appendChild(ventElement);
        ventingInput.value = "";  // Clear input
        chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to bottom
    }
});
