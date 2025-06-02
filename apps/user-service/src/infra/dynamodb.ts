import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:4566',
});

const tableName = 'User';

type Params = {
  name: string;
};

export const insertUser = async (params: Params) => {
  // Generate a random ID using UUID
  const userId = randomUUID();

  const command = new PutItemCommand({
    TableName: tableName,
    Item: {
      id: { S: userId },
      name: { S: params.name },
      createdAt: { S: new Date().toISOString() },
    },
  });

  try {
    const result = await client.send(command);
    console.log('User inserted successfully:', result);
    console.log('User ID:', userId);

    const getCommand = new GetItemCommand({
      TableName: tableName,
      Key: { id: { S: userId } },
    });

    const getResult = await client.send(getCommand);
    console.log('User retrieved successfully:', getResult);
  } catch (error) {
    console.error('Error inserting user:', error);
  }
};
