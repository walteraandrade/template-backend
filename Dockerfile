# Use a base Node.js image
FROM node:20

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application source code
COPY . .

# Expose the port your app will listen on
EXPOSE 3000

# Start your application
CMD ["npm start"]
