import { FastifySchema } from "fastify";

const registerSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
        minLength: 3,
        maxLength: 20,
      },
      password: {
        type: "string",
        minLength: 8,
        maxLength: 20,
      },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

const loginSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: { type: "string" },
      },
    },
    401: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

export { registerSchema, loginSchema };
