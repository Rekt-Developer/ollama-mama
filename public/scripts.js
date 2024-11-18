document.getElementById('send-btn').addEventListener('click', async () => {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return;

  // Add user message to the chat box
  addMessage('USER', userInput);
  document.getElementById('user-input').value = '';  // Clear input field

  // Fetch AI response
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userInput,
        chatHistory: getChatHistory(),
      }),
    });

    const data = await response.json();
    if (data.error) {
      addMessage('AI', `Error: ${data.error}`);
    } else {
      addMessage('AI', data.response);
    }
  } catch (error) {
    console.error('Error:', error);
    addMessage('AI', 'Something went wrong. Please try again.');
  }
});

// Add a new message to the chat
function addMessage(role, message) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(role.toLowerCase());
  messageDiv.innerHTML = `<strong>${role}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to the latest message
}

// Get the entire chat history
function getChatHistory() {
  const chatBox = document.getElementById('chat-box');
  const messages = Array.from(chatBox.querySelectorAll('div'));
  return messages.map(msg => ({
    role: msg.classList.contains('user') ? 'USER' : 'AI',
    message: msg.innerText.split(': ')[1]
  }));
}
