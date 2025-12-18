// Vercel Serverless Function for CORS proxy
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }
  
  console.log('Proxying request to:', url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json',
      }
    });
    
    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType);
    console.log('Response status:', response.status);
    
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Received JSON response');
      res.setHeader('Content-Type', 'application/json');
      res.status(response.status).json(data);
    } else {
      const text = await response.text();
      console.log('Received text response, length:', text.length);
      console.log('Text preview:', text.substring(0, 500));
      res.setHeader('Content-Type', 'text/plain');
      res.status(response.status).send(text);
    }
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
}
