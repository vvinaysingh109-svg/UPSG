const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config(); // for environment variables

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and handle file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend (adjust folder if different)
app.use(express.static(path.join(__dirname, 'public')));

// Example API route for patch generation
app.post('/generate-patch', async (req, res) => {
  const { vulnerabilityName, language, platform, description } = req.body;
  // Call OpenAI API here
  res.json({ message: 'Patch generated (demo)' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
