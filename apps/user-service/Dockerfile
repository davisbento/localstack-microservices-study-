FROM node:20-alpine

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY apps/user-service/package*.json ./apps/user-service/

# Install dependencies
RUN npm install

# Copy source files
COPY apps/user-service ./apps/user-service

# Set working directory to service folder
WORKDIR /app/apps/user-service

# Expose the port
EXPOSE 3001

# Start the service
CMD ["npm", "start"] 