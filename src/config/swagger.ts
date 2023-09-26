import { SwaggerOptions } from "@fastify/swagger";
import { config } from "./index";
import { FastifyRequestWithJWT } from "../types/fastify";
import dotenv from "dotenv";
dotenv.config();

const URL = `${config.app.API_VERSION + "/documentation"}`;

const swaggerOptions: SwaggerOptions = {
  routePrefix: URL,
  swagger: {
    info: {
      title: "Fastify Template",
      description: "Fastify Template Documentation",
      version: process.env.DOCS_VERSION!,
    },
    host: config.app.host,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [],
    definitions: {},
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header",
      },
    },
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (
      request: FastifyRequestWithJWT,
      reply: any,
      next: any
    ) {
      next();
    },
    preHandler: function (
      request: FastifyRequestWithJWT,
      reply: any,
      next: any
    ) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header: any) => header,
  exposeRoute: true,
};

export default swaggerOptions;
