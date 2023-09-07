import { FastifySchema } from "fastify";

export const healthCheckSchema: FastifySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        status: {
          type: "string",
        },
        message: {
          type: "string",
        },
      },
    },
  },
};
