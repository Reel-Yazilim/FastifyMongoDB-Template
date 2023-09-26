import fastify, { FastifyReply } from "fastify";
import Logger from "../config/pino";
import { initializeMiddlewares } from "./middlewares";
import Routes from "../routes";
import { config } from "../config";
import { initMongo, initRedis } from "./database";
import { FastifyRequestWithJWT } from "../types/fastify";

export const jwtVerifyHook = async (
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

export const server = fastify({
  logger: Logger,
});

export const ServerPlugins = {
  io: server.io,
  redis: initRedis(),
};

// Initialize MongoDB and Redis
initMongo();

// Initialize Middlewares
initializeMiddlewares(server);

// Routes
Routes.forEach((route) => {
  server.route(route);
});


export default server;
