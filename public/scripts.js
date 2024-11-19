document.getElementById('send-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value.trim();

  if (userInput === '') return;

  // Display the user message immediately
  appendMessage(userInput, 'user-message');
  document.getElementById('user-input').value = '';  // Clear input field

  try {
    // Call API to get AI response
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput })
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

// Function to append message to chat box
function appendMessage(message, role) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add(role);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
