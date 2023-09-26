import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySocketIO from "fastify-socket.io";
import path from "path";
import { jwtVerifyHook } from "./server"; // Import your jwtVerifyHook function here
import swaggerOptions from "../config/swagger";
import { config, ioOptions } from "../config";
import SocketHandler from "../routes/websocket";

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

export const initializeMiddlewares = (
  server: FastifyInstance<any, any, any, any>
) => {
  // Cors
  server.register(fastifyCors, {
    origin: "*", // ! Daha sonra ayarlama yapılacak
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });

  // Static Files
  server.register(fastifyStatic, {
    root: path.join(__dirname, "../", "public"),
    prefix: "/public/",
  });

  // JWT
  server.register(fastifyJwt, {
    secret: config.jwt.secret,
  });

  // Add Hooks
  server.addHook("onRequest", jwtVerifyHook);

  // Socket.io
  server.register(fastifySocketIO, getIOOptions());

  // Swagger
  server.register(fastifySwagger, swaggerOptions);

  server.ready((err) => {
    if (err) throw err;
    server.swagger();
    server.io.on("connection", SocketHandler);
    server.log.info("Socket.io is up and running...");
  });
};
