import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'us-east-1',
  endpoint: 'http://host.docker.internal:4566',
  forcePathStyle: true,
});

export const handler = async (event: any) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const newItem = record.dynamodb?.NewImage;
      const id = newItem?.id?.S;
      const body = JSON.stringify(newItem, null, 2);

      if (id) {
        const command = new PutObjectCommand({
          Bucket: 'my-bucket',
          Key: `records/${id}.json`,
          Body: body,
          ContentType: 'application/json',
        });

        await s3.send(command);

        console.log(`Saved record ${id} to S3`);
      }
    }
  }
};
