# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Install frontend dependencies
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Install backend dependencies
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm install

# Copy the rest of the application code
WORKDIR /app
COPY frontend/ ./frontend/
COPY backend/ ./backend/

# Build the React app
WORKDIR /app/frontend
RUN npm run build

# Copy the .env file to backend
WORKDIR /app/backend
COPY backend/.env ./

# Set environment variables
ARG MONGO_URI
ARG JWT_SECRET
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]