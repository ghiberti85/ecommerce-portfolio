# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Clean the npm cache
RUN npm cache clean --force

# Install dependencies; using --omit=dev per npm's suggestion
RUN npm ci --omit=dev

# Copy the rest of your application code
COPY . .

# Expose the port Strapi uses (default 1337)
EXPOSE 1337

# Start the Strapi server
CMD ["npm", "start"]
