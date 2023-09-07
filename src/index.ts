// * Fastify
import fastify, { FastifyReply } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifySwagger from "@fastify/swagger";
import swaggerOptions from "./config/swagger";
import fastifySocketIO from "fastify-socket.io";
import { FastifyRequestWithJWT } from "./types/fastify"; // ! JWT Type açıklaması

// * MongoDB
import mongoose from "mongoose";
import { config, ioOptions } from "./config";

// * Routes
import Routes from "./routes";

//* NodeJS
import path from "path";

// * Dotenv
import dotenv from "dotenv";
import SocketHandler from "./routes/websocket";
dotenv.config();

// * Initialize
import * as initialize from "./lib/init";

// * Redis
import { createClient } from "redis";

// * Pino
import Logger from "./config/pino";

const initRedis = () => {
  const redisClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
  });

  redisClient
    .connect()
    .then(() => {
      server.log.info("Connected To The Redis...");
    })
    .catch((err) => {
      server.log.error(`Failed to connect to the Redis : ${err}`);
      process.exit(1);
    });

  return redisClient;
};

// Initialize MongoDB
const initMongo = () => {
  const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

  mongoose
    .connect(connectionString)
    .then(() => server.log.info("Connected To The MongoDB..."))
    .catch((err) => {
      server.log.error(`Failed to connect to the MongoDB : ${err}`);
      process.exit(1);
    });
};

// Helper function for JWT verification
const jwtVerifyHook = async (
  request: FastifyRequestWithJWT,
  reply: FastifyReply
) => {
  try {
    if (request.url === `${config.app.API_VERSION}/auth/login`) return;
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};

// Helper function to get IO options
const getIOOptions = () => {
  return process.env.NODE_ENV === "production"
    ? ioOptions
    : {
        cors: {
          origin: "*", // ! Daha sonra ayarlama yapılacak
        },
        maxHttpBufferSize: 1e8,
      };
};

export const server = fastify({
  logger: Logger,
});

// Initialize Redis and MongoDB
const redisClient = initRedis();
initMongo();

// * Cors
server.register(fastifyCors, {
  origin: "*", // ! Daha sonra ayarlama yapılacak
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

// * Static Files
server.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

// * JWT
server.register(fastifyJwt, {
  secret: config.jwt.secret,
});

server.addHook("onRequest", jwtVerifyHook);

server.register(fastifySocketIO, getIOOptions());

// * Socket.io
server.ready((err) => {
  if (err) throw err;
  server.swagger();
  server.io.on("connection", SocketHandler);
  initialize.default();
  server.log.info("Socket.io is up and running...");
});

// * Swagger
server.register(fastifySwagger, swaggerOptions);

// * Routes
Routes.forEach((route) => {
  server.route(route);
});

server.listen(
  {
    listenTextResolver(address) {
      return `Server is up and running on [${process.env.NODE_ENV?.toUpperCase()}] with port ${address}  `;
    },
    port: config.app.port,
    host: config.app.host,
  },
  async (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  }
);

export const ServerPlugins = {
  io: server.io,
  redis: redisClient,
};

process.on("exit", () => {
  ServerPlugins.redis.disconnect();
});

export default server;
