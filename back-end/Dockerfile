# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json (if available) into the working directory
COPY package*.json ./

# Install dependencies; using --omit=dev per npm's suggestion
RUN npm install --omit=dev

# Copy the rest of your application code to the container
COPY . .

# Expose the port that Strapi uses (default is 1337)
EXPOSE 1337

# Start the Strapi server
CMD ["npm", "start"]
