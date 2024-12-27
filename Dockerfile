# Use Node JS as the base image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# copy all the application code to the container
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple HTTP server to serve the production build
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 5000

# Start the 'serve' HTTP server on port 5000
CMD ["serve", "-s", "build", "-l", "5000"]
