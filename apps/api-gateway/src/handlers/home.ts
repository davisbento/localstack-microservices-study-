import { IncomingMessage, ServerResponse } from 'node:http';

export const homeHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Welcome to the API Gateway' }));
};
