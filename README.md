# Fastify TypeScript Boilerplate

![Node.js CI](https://github.com/TheAlpiz/FastifyMongoDB-Template/workflows/Node.js%20CI/badge.svg)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)

Fastify TypeScript Boilerplate with features like JWT Authentication, Swagger, CORS, Static Files, Redis, Mongoose, Socket.io, SSH2, Node Schedule, Pino Logger, PM2, Nodemon, and more!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- Redis
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/TheAlpiz/fastify-typescript-boilerplate.git
```

2. Change the working directory
```bash
cd fastify-typescript-boilerplate
```

3. Install dependencies
```bash
npm install
```


### Development
Run the app in development mode
```bash
1. npm run dev:node 
2. npm run dev:pm2
```



### Production
Run the app in production mode
```bash
npm run start:node
npm run start:pm2
```

## For Docker
### Production
```bash
npm run start:docker
```

### Development 
```bash
npm run dev:docker 
```

# Features
Fastify: Fast and low overhead web framework for Node.js.
TypeScript: Superset of JavaScript which primarily provides optional static typing, classes, and interfaces.
JWT: Implementation of JSON Web Tokens.
Swagger: Interactive API documentation.
CORS: Cross-Origin Resource Sharing.
Static Files: Serving static files using Fastify.
Redis: In-memory data structure store, used as a database, cache, and message broker.
Mongoose: Elegant MongoDB object modeling for Node.js.
Socket.io: Real-time bidirectional event-based communication.
Node Schedule: Node.js job scheduler.
Pino Logger: Extremely fast Node.js logger.
PM2: Advanced production process manager for Node.js.
Nodemon: Utility that monitors for any changes in your source and automatically restarts your server.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.
