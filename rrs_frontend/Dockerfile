# Dockerfile for frontend
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend directory to the container
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the frontend server
CMD ["npm", "run", "dev"]
