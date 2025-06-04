FROM node:18-slim

# Set working directory
WORKDIR /app

# Install OpenSSL (needed for Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy all app code (including prisma/)
COPY . .

# Generate Prisma client
RUN prisma generate

# Build Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
