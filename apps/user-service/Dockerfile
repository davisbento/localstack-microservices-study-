FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY apps/user-service/package*.json ./apps/user-service/

# Install dependencies from root (workspace setup)
RUN npm install

# Copy the rest of the source code
COPY . .

# Set working directory to the service
WORKDIR /app/apps/user-service

# Expose the port
EXPOSE 3001

# Start the service
CMD ["npm", "start"] 