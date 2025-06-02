# Localstack Microservices

This project is a simple example of a microservices architecture using localstack.

It consists of a user service and a lambda function.

The user service is a simple service that can be called via node-ts or via API-Gateway->User-service, and allows you to create users.

The lambda function is a simple function that saves the user to the S3 bucket.
It is triggered by a DynamoDB stream.

## Folder structure

```bash
📦 root
├── 📁 apps
│   ├── 📁 user-service                 # Can be invoked via Node.js/TS or API Gateway
│   │   └── 📁 src
│   │       └── 📄 index.ts
│   └── 📁 api-gateway                  # API entry point (HTTP clients or curl)
│       └── 📁 src
│           └── 📄 index.ts
├── 📁 packages
│   └── 📁 shared
│       └── 📁 shared-types             # Shared TypeScript types
├── 📁 lambda
│   ├── 📄 index.ts
│   └── 📦 lambda.zip                  # Built artifact for deployment
├── 📄 makefile
├── 📄 package.json
├── 📄 README.md

```

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
