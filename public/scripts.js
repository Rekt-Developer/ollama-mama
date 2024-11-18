// script.js
document.getElementById('send-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value.trim();

  if (userInput === '') return;

  // Display the user message
  appendMessage(userInput, 'user-message');

  // Clear input field
  document.getElementById('user-input').value = '';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    if (data.response) {
      appendMessage(data.response, 'ai-message');
    } else {
      appendMessage("Sorry, there was an error.", 'ai-message');
    }
  } catch (error) {
    console.error('Error fetching response:', error);
    appendMessage("Sorry, there was an error.", 'ai-message');
  }
});

function appendMessage(message, messageType) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', messageType);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);

  // Scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}
