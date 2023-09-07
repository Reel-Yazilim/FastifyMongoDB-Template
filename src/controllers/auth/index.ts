import { FastifyRequest, FastifyReply } from "fastify";
import { hashPassword, comparePassword } from "../../lib/bcrypt";
import Models from "../../models";

const registerHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    if (!request.body) throw new Error("Body is not defined");

    if (typeof request.body !== "object")
      throw new Error("Body is not defined");

    if (!("username" in request.body)) throw new Error("Body is not defined");

    if (!("password" in request.body)) throw new Error("Body is not defined");

    const { username, password } = request.body;

    if (typeof username !== "string") throw new Error("Username is not string");

    if (typeof password !== "string") throw new Error("Password is not string");

    const hashedPassword = hashPassword(password);
    const newUser = new Models.UserModel({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    // Generate JWT token
    const token = reply.jwtSign({ username });

    reply.code(201).send({ token });
  } catch (error) {
    reply.code(500).send({ error: "Registration failed" });
  }
};

const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (!request.body) throw new Error("Body is not defined");

    if (typeof request.body !== "object")
      throw new Error("Body is not defined");

    if (!("username" in request.body)) throw new Error("Body is not defined");

    if (!("password" in request.body)) throw new Error("Body is not defined");

    const { username, password } = request.body;

    if (typeof username !== "string") throw new Error("Username is not string");

    if (typeof password !== "string") throw new Error("Password is not string");

    const user = await Models.UserModel.findOne({ username });

    if (!user) {
      reply.code(401).send({ error: "Invalid username or password" });
      return;
    }

    const isValidPassword = comparePassword(password, user.password);
    if (!isValidPassword) {
      reply.code(401).send({ error: "Invalid username or password" });
      return;
    }

    // Generate JWT token
    const token = await reply.jwtSign({ username });

    reply.code(200).send({ token });
  } catch (error) {
    reply.code(500).send({ error: "Login failed" });
  }
};

export { registerHandler, loginHandler };
