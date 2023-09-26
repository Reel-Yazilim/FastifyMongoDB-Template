import { FastifyReply, FastifyRequest } from "fastify";
import Models from "../models";
import { hashPassword } from "../lib/bcrypt";

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
    const { id } = request.params as {
      id: string;
    };

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
    const { id } = request.params as {
      id: string;
    };
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
    const { id } = request.params as {
      id: string;
    };

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

export class userPreHandlers {
  static async createUser(
    request: FastifyRequest,
    reply: FastifyReply,
    done: Function
  ) {
    const body = request.body as IUserBody;
    const hashedPass = hashPassword(body.password);
    body.password = hashedPass;
    done();
  }
}
