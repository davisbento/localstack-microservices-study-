import { json } from 'body-parser';
import express from 'express';
import { insertUser } from './infra/dynamodb';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(json());

// User routes
app.post('/users', async (req: any, res: any) => {
  try {
    const userData = req.body;

    // Validate user data
    if (!userData.name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    console.log('Creating user:', userData);

    await insertUser({ name: userData.name });

    // In a real app, you would save to a database here
    // For now, we'll just respond with success
    return res.status(201).json({
      message: 'User created successfully',
      user: userData,
      service: 'user-service',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'user-service' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
