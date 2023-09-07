import { RouteOptions } from "fastify";

// * Import Routes
import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";

export default [...UserRoutes, ...AuthRoutes] as RouteOptions[];
