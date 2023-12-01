const socket = io()  // using this any broswer connected to server
let userName;


// Get reference to the username input and submit button
const usernameInput = document.getElementById('usernameInput');
const loginBtn = document.getElementById('login');
const textarea = document.getElementById('textarea');
const sendButton = document.getElementById('send');

// Add event listener to the submit button
loginBtn.addEventListener('click', () => {
    // Get the username from the input field
    userName = usernameInput.value.trim();

    // Check if a valid username is entered
    if (userName) {
        // Hide the username input section
        document.querySelector('.username-input').style.display = 'none';

        // Now that we have a username, enable the chat functionality
        enableChat();
    } else {
        alert('Please enter a valid username.');
    }
});

function enableChat() {
    // Now, you can enable the chat functionality

    // let textarea = document.querySelector('#textarea');
    // let sendButton = document.getElementById('send');
    let messageArea = document.querySelector('.message_area');

    // Enable the textarea and send button
    textarea.disabled = false;
    sendButton.disabled = false;

    // Set pointer-events to auto for the textarea
    textarea.style.pointerEvents = 'auto';

    // Add event listeners for sending messages
    sendButton.addEventListener('click', () => {
        sendMessage(textarea.value);
    });

    textarea.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage(textarea.value);
        }
    });
    function sendMessage(message) {
        //when user send msg -> msg with username will send
        let msg = {
            user: userName,
            message: message.trim()
        }

        //Append message in UI
        appendMessage(msg, 'outgoing') //calling function with msg and type of msg = outgoing 
        scrollToBottom()
        //send to server via websocket connection
        socket.emit('message', msg) //2nd arg-passing above object
        //using this be able to listen on server

        document.getElementById("textarea").value = "";
    }

    //function defination 2 parameters 1 msg 2 type = outgoing/incoming

    function appendMessage(msg, type) {
        //message_are me div banana hai 
        //when user send msg this will make div automatically(incoming message/outgoing messag ka div banega)

        let mainDiv = document.createElement('div')
        let messageType = type  //incoming/outgoing
        mainDiv.classList.add(messageType, 'message')  //1st arg-(incoming/outgoing) 2nd arg- message (2 class in div incoming message/outgoing message)

        //generate html markup
        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `
        //username with msg send as contetn of div
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv)
        //mesageArea (background of chat app) got mainDiv(new div with username and msg content) appended/displayed on screen
    }


    //Receive messages

    socket.on('message', (msg) => {
        appendMessage(msg, 'incoming')
        scrollToBottom()
    })


    function scrollToBottom() {
        messageArea.scrollTop = messageArea.scrollHeight
    }
}