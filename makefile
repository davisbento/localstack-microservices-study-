invoke-user-service:
	npm run start -w @localstack-microservices/user-service

build-shared:
	npm run build -w @localstack-microservices/shared

create-dynamodb-table:
	aws --endpoint-url=http://localhost:4566 dynamodb create-table \
  	--table-name User \
  	--attribute-definitions AttributeName=id,AttributeType=S \
  	--key-schema AttributeName=id,KeyType=HASH \
  	--billing-mode PAY_PER_REQUEST \
  	--stream-specification StreamEnabled=true,StreamViewType=NEW_IMAGE
	
list-dynamodb-tables:
	aws dynamodb list-tables --region us-east-1 --endpoint-url http://localhost:4566

get-dynamodb-user:
	aws --endpoint-url=http://localhost:4566 dynamodb get-item \
		--table-name User \
		--key '{"id": {"S": "123"}}' \
		--region us-east-1

delete-dynamodb-table:
	aws dynamodb delete-table --table-name User --region us-east-1 --endpoint-url http://localhost:4566

create-s3-bucket:
	aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket my-bucket

list-s3-buckets:
	aws s3 ls --region us-east-1 --endpoint-url http://localhost:4566

delete-s3-bucket:
	aws s3 rb s3://mybucket --region us-east-1 --endpoint-url http://localhost:4566

build-lambda:
	cd lambda && npm run build

deploy-lambda:
	aws lambda create-function \
		--function-name my-lambda \
		--runtime nodejs20.x \
		--role arn:aws:iam::000000000000:role/lambda-role \
		--handler index.handler \
		--region us-east-1 \
		--endpoint-url http://localhost:4566 \
		--zip-file fileb://lambda/lambda.zip

delete-lambda:
	aws lambda delete-function --function-name my-lambda --region us-east-1 --endpoint-url http://localhost:4566

invoke-lambda:
	aws lambda invoke \
		--function-name my-lambda \
		--region us-east-1 \
		--endpoint-url http://localhost:4566 \
		--payload file://event.json \
		response.json

get-dynamodb-stream-arn:
	aws --endpoint-url=http://localhost:4566 dynamodb describe-table --table-name User \
  --query "Table.LatestStreamArn" --output text

create-lambda-event-source-mapping:
	aws lambda create-event-source-mapping \
		--function-name my-lambda \
		--event-source-arn arn:aws:dynamodb:us-east-1:000000000000:table/User/stream/2025-05-30T12:54:04.973 \
		--starting-position LATEST \
		--region us-east-1 \
		--endpoint-url http://localhost:4566

get-s3-objects:
	aws --endpoint-url=http://localhost:4566 s3 ls s3://my-bucket/records/

list-all-s3-objects:
	aws --endpoint-url=http://localhost:4566 \
		--region us-east-1 \
		s3api list-objects-v2 \
		--bucket my-bucket