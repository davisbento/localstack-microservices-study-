import { IncomingMessage, ServerResponse } from 'node:http';
import { homeHandler } from './handlers/home';
import { userHandler } from './handlers/user';

const http = require('http');

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log('API Gateway received request:', req.url);

    // Set CORS headers to allow all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // Parse URL
    const url = req.url;

    // GET request to root path
    if (req.method === 'GET' && url === '/') {
      homeHandler(req, res);
    }

    // POST request to /users path
    else if (req.method === 'POST' && url === '/users') {
      userHandler(req, res);
    }
    // Handle not found routes
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  }
);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
