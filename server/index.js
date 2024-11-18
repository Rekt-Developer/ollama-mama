import express from 'express';
import { CohereClient } from 'cohere-ai';
import cors from 'cors';  // CORS for cross-origin requests

const app = express();
const port = process.env.PORT || 3000;

// Initialize Cohere client with your API key
const client = new CohereClient({ token: 'YOUR_API_KEY' });

// Middleware to parse JSON request bodies and handle CORS
app.use(express.json());
app.use(cors());  // Allow requests from different domains

// Endpoint to handle chat interactions
app.post('/api/chat', async (req, res) => {
  const { message, chatHistory } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await client.chatStream({
      message,
      model: 'command-r-plus-08-2024',
      preamble: 'You are a helpful AI assistant. Your goal is to assist users with their queries in a concise, professional manner.',
      chatHistory: chatHistory || [],
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('Error interacting with Cohere:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve static files for frontend (optional for Vercel and GitHub Pages)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
