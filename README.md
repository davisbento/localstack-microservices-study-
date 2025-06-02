# Localstack Microservices

## Run localstack

```bash
docker compose up -d
```

## Setup

```bash
make create-dynamodb-table
make create-s3-bucket
make build-lambda
make deploy-lambda
make create-lambda-event-source-mapping
```

## Execute user service

This will create a user and save it to the database.
And then the lambda function will save the user to the S3 bucket.

```bash
make invoke-user-service
```
