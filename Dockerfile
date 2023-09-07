# Use NodeJS base image with version 18
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Copy just the necessary application files into the container
COPY src ./src
COPY .env ./
COPY ecosystem.config.js ./
COPY tsconfig.json ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "--", "run", "dev:node"]
