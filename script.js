// Firebase Config (Replace with your Firebase project's config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // Replace with your Firebase project API key
    authDomain: "YOUR_AUTH_DOMAIN", // Replace with your Firebase Auth domain
    databaseURL: "https://YOUR_DATABASE_URL.firebaseio.com", // Replace with your Firebase Realtime Database URL
    projectId: "YOUR_PROJECT_ID", // Replace with your Firebase project ID
    storageBucket: "YOUR_STORAGE_BUCKET", // Replace with your Firebase storage bucket
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace with your Firebase messaging sender ID
    appId: "YOUR_APP_ID", // Replace with your Firebase app ID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Chat functionality
document.addEventListener('DOMContentLoaded', function () {

    // Default username logic (either take input or use a random one)
    let username = localStorage.getItem('username');
    if (!username) {
        username = `User${Math.floor(Math.random() * 1000)}`;
        localStorage.setItem('username', username);
    }
    document.getElementById('username').value = username;

    // Vent functionality (unchanged)
    document.getElementById('submit-btn').addEventListener('click', function() {
        const textArea = document.getElementById('vent-textarea');
        const content = textArea.value; // Grab the text entered by the user

        if (content) {
            console.log("User vented:", content); // Display the text in the console
            textArea.value = ''; // Clear the textarea after submission
        } else {
            console.log("No venting entered!");
        }
    });

    // Send chat message to Firebase
    document.getElementById('send-chat').addEventListener('click', function() {
        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value; // Grab the chat message entered by the user

        if (message) {
            const timestamp = new Date().toLocaleTimeString(); // Get current time

            // Save the message to Firebase Realtime Database
            firebase.database().ref('messages').push({
                username: username,
                message: message,
                timestamp: timestamp
            });

            chatInput.value = ''; // Clear the chat input field after sending the message
        } else {
            console.log("No message entered!");
        }
    });

    // Get real-time messages from Firebase
    const chatContainer = document.getElementById('chat-container');
    firebase.database().ref('messages').on('child_added', function(snapshot) {
        const { username, message, timestamp } = snapshot.val(); // Get the message data

        // Create a new message element
        const newMessage = document.createElement('p');
        newMessage.innerHTML = `<strong>${username}</strong> <span style="color: #999; font-size: 0.8em;">(${timestamp})</span>: ${message}`;

        // Give a random color to each user
        const userColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        newMessage.style.color = userColor;

        // Add the message to the chat container
        chatContainer.appendChild(newMessage);

        // Scroll to the bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });

});
