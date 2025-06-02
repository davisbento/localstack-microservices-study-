import { IncomingMessage, ServerResponse } from 'node:http';

const isBodyValid = (body: string): boolean => {
  try {
    const user = JSON.parse(body);

    if (typeof user.name !== 'string') {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const userHandler = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  // Collect data chunks
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  if (!isBodyValid(body)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    return;
  }

  // Process the complete request body
  req.on('end', () => {
    try {
      const userData = JSON.parse(body);
      console.log('Received user data:', userData);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          message: 'User created successfully',
          user: userData,
        })
      );
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  });
};
