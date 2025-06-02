FROM node:20-alpine

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY apps/api-gateway/package*.json ./apps/api-gateway/

# Install dependencies
RUN npm install

# Copy source files
COPY apps/api-gateway ./apps/api-gateway

# Set working directory to service folder
WORKDIR /app/apps/api-gateway

# Expose the port
EXPOSE 3000

# Start the service
CMD ["npm", "start"] 