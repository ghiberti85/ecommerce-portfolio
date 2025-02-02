# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (note: if you see warnings about --production, you can use `--omit=dev` in npm 7+)
RUN npm install --production

# Copy the rest of your application code to the container
COPY . .

# Expose the port that Strapi uses (default is 1337)
EXPOSE 1337

# Start the Strapi server
CMD ["npm", "start"]
