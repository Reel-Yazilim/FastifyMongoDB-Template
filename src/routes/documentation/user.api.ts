import { FastifyInstance, FastifySchema } from "fastify";

const postUserSchema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string", minLength: 3, maxLength: 20 },
    password: { type: "string", minLength: 8, maxLength: 20 },
  },
};

const getUserSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    username: { type: "string", minLength: 3, maxLength: 20 },
    createdAt: { type: "string" },
    updatedAt: { type: "string" },
  },
};

const userIdParamSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
};

const successResponseSchema = {
  200: {
    type: "object",
    properties: {
      success: { type: "string" },
    },
  },
};

const getUsersSchema: FastifySchema = {
  response: {
    200: {
      type: "array",
      items: getUserSchema,
    },
  },
};

// For create user
const createUserSchema: FastifySchema = {
  body: postUserSchema,
  response: {
    201: getUserSchema,
    500: {
      type: "object",
      properties: {
        error: { type: "string" },
      },
    },
  },
};

// For read user
const readUserSchema: FastifySchema = {
  params: userIdParamSchema,
  response: {
    200: getUserSchema,
    404: {
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

// For update user
const updateUserSchema: FastifySchema = {
  params: userIdParamSchema,
  body: getUserSchema,
  response: {
    200: getUserSchema,
    404: {
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

// For delete user
const deleteUserSchema: FastifySchema = {
  params: userIdParamSchema,
  response: successResponseSchema,
};

export default async function (fastify: FastifyInstance) {
  fastify.addSchema(getUserSchema);
  fastify.addSchema(postUserSchema);
  fastify.addSchema(userIdParamSchema);
  fastify.addSchema(successResponseSchema);
  fastify.addSchema(getUsersSchema);
  fastify.addSchema(readUserSchema);
  fastify.addSchema(createUserSchema);
  fastify.addSchema(updateUserSchema);
  fastify.addSchema(deleteUserSchema);
}

const userSchemas = {
  successResponseSchema,
  getUsersSchema,
  readUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
};

export { userSchemas };
