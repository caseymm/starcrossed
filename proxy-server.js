const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3030;

// Enable CORS for all routes
app.use(cors());

// Proxy endpoint for HTML scraping
app.get('/api/html/:imdbId', async (req, res) => {
  const { imdbId } = req.params;
  const url = `https://html.imdbot.workers.dev/${imdbId}`;
  
  console.log('Proxying request to:', url);
  
  try {
    const response = await fetch(url);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`);
});
