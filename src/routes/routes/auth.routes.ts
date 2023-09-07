import { RouteOptions } from "fastify";
import Schemas from "../documentation";
import baseURL from "../../config/api-version";
import Controllers from "../../controllers";

// Create User
const registerUser: RouteOptions = {
  method: "POST",
  url: `${baseURL}/auth/register`,
  handler: Controllers.AuthController.registerHandler,
  schema: Schemas.loginSchema,
};

// Read User
const loginUser: RouteOptions = {
  method: "POST",
  url: `${baseURL}/auth/login`,
  handler: Controllers.AuthController.loginHandler,
  schema: Schemas.registerSchema,
};

const UserRoutes = [loginUser, registerUser];

export default UserRoutes;
