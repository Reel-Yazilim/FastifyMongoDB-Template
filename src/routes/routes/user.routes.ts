import { RouteOptions } from "fastify";
import Schemas from "../documentation";
import baseURL from "../../config/api-version";
import Controllers from "../../controllers";

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
  preHandler: Controllers.UserController.userPreHandlers.createUser,
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
