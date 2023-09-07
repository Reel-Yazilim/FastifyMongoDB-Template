import { RouteOptions } from "fastify";
import Routes from "./routes";
import Schemas from "./documentation";
import baseURL from "../config/api-version";

const healthCheck: RouteOptions = {
  method: "GET",
  url: `${baseURL}/health-check`,
  handler: async (request, reply) => {
    return {
      status: "OK",
      message: "Server is up and running",
    };
  },
  schema: Schemas.healthCheckSchema,
};

const routes: RouteOptions[] = [healthCheck, ...Routes];

export default routes;
