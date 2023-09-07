// * Import Schemas
import { healthCheckSchema } from "./health-check.api";
import * as UserSchema from "./user.api";
import * as AuthSchema from "./auth.api";

// * Export Schemas
const Schemas = {
  healthCheckSchema,
  ...UserSchema,
  ...AuthSchema,
};

export default Schemas;
