import { RouteOptions } from "fastify";
import Schemas from "../documentation";
import baseURL from "../../config/api-version";
import Controllers from "../../controllers";
import { hashPassword } from "../../lib/bcrypt";

interface UserBody {
  username: string;
  password: string;
}

const readUsers: RouteOptions = {
  method: "GET",
  url: `${baseURL}/all-users`,
  handler: Controllers.UserController.getUsersHandler,
  schema: Schemas.userSchemas.getUsersSchema,
};

// Create User
const createUser: RouteOptions = {
  method: "POST",
  url: `${baseURL}/users`,
  handler: Controllers.UserController.createUserHandler,
  schema: Schemas.userSchemas.createUserSchema,
  preHandler: (request, reply, done) => {
    const body = request.body as UserBody;

    if (typeof body !== "object" || !body) {
      return reply.code(400).send({ error: "Body is required" });
    }

    if (!body.password) {
      return reply.code(400).send({ error: "Password is required" });
    }

    const hashedPass = hashPassword(body.password);
    // Do something with hashedPass, for example add it to request.body
    body.password = hashedPass;

    done();
  },
};

// Read User
const readUser: RouteOptions = {
  method: "GET",
  url: `${baseURL}/users/:id?`,
  handler: Controllers.UserController.readUserHandler,
  schema: Schemas.userSchemas.readUserSchema,
};

// Update User
const updateUser: RouteOptions = {
  method: "PUT",
  url: `${baseURL}/users/:id?`,
  handler: Controllers.UserController.updateUserHandler,
  schema: Schemas.userSchemas.updateUserSchema,
};

// Delete User
const deleteUser: RouteOptions = {
  method: "DELETE",
  url: `${baseURL}/users/:id?`,
  handler: Controllers.UserController.deleteUserHandler,
  schema: Schemas.userSchemas.deleteUserSchema,
};

const UserRoutes = [readUser, readUsers, createUser, updateUser, deleteUser];

export default UserRoutes;
