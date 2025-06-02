import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'node:http';

const USER_SERVICE_HOST = process.env.USER_SERVICE_HOST || 'localhost';
const USER_SERVICE_PORT = process.env.USER_SERVICE_PORT || 3001;

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

  // Process the complete request body
  req.on('end', () => {
    try {
      // Early validation
      if (!isBodyValid(body)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON data' }));
        return;
      }

      const userData = JSON.parse(body);
      console.log('API Gateway received user data:', userData);

      // Forward request to user service
      const options = {
        hostname: USER_SERVICE_HOST,
        port: USER_SERVICE_PORT,
        path: '/users',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      };

      const serviceReq = http.request(options, (serviceRes) => {
        let responseData = '';

        serviceRes.on('data', (chunk) => {
          responseData += chunk;
        });

        serviceRes.on('end', () => {
          // Forward the user service response to the client
          res.writeHead(serviceRes.statusCode || 500, {
            'Content-Type': 'application/json',
          });
          res.end(responseData);
        });
      });

      serviceReq.on('error', (error) => {
        console.error('Error forwarding request to user service:', error);
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            error: 'Bad Gateway',
            message: 'Could not connect to user service',
          })
        );
      });

      // Write data to request body
      serviceReq.write(body);
      serviceReq.end();
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON data' }));
    }
  });
};
