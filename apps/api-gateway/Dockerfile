FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY apps/api-gateway/package*.json ./apps/api-gateway/

# Install dependencies from root (workspace setup)
RUN npm install

# Copy the rest of the source code
COPY . .

# Set working directory to the service
WORKDIR /app/apps/api-gateway

# Expose the port
EXPOSE 3000

# Start the service
CMD ["npm", "start"] 