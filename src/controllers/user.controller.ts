import { FastifyReply, FastifyRequest } from "fastify";
import Models from "../models";

export const getUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await Models.UserModel.find();
    reply.code(200).send(users);
  } catch (err) {
    reply.code(500).send({ error: "Failed to retrieve users" });
  }
};

export const createUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const user = new Models.UserModel(request.body);
    await user.save();
    reply.code(201).send(user);
  } catch (err) {
    reply.code(500).send({ error: "Failed to create user" });
  }
};

export const readUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    if (!request.params) {
      throw new Error("Params is not defined");
    }

    if (typeof request.params !== "object") {
      throw new Error("Params is not defined");
    }

    if (!("id" in request.params)) {
      throw new Error("Params is not defined");
    }

    const { id } = request.params;

    const user = await Models.UserModel.findById(id);
    if (user) {
      reply.code(200).send(user);
    } else {
      reply.code(404).send({ error: "User not found" });
    }
  } catch (err) {
    reply.code(500).send({ error: "Failed to retrieve user" });
  }
};

export const updateUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    if (!request.params) {
      throw new Error("Params is not defined");
    }

    if (typeof request.params !== "object") {
      throw new Error("Params is not defined");
    }

    if (!("id" in request.params)) {
      throw new Error("Params is not defined");
    }

    const { id } = request.params;
    const { body } = request;

    if (!body) throw new Error("Body is not defined");

    const updatedUser = await Models.UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (updatedUser) {
      reply.code(200).send(updatedUser);
    } else {
      reply.code(404).send({ error: "User not found" });
    }
  } catch (err) {
    reply.code(500).send({ error: "Failed to update user" });
  }
};

export const deleteUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    if (!request.params) {
      throw new Error("Params is not defined");
    }

    if (typeof request.params !== "object") {
      throw new Error("Params is not defined");
    }

    if (!("id" in request.params)) {
      throw new Error("Params is not defined");
    }

    const { id } = request.params;
    const deletedUser = await Models.UserModel.findByIdAndDelete(id);
    if (deletedUser) {
      reply.code(200).send({ success: "User deleted" });
    } else {
      reply.code(404).send({ error: "User not found" });
    }
  } catch (err) {
    reply.code(500).send({ error: "Failed to delete user" });
  }
};
