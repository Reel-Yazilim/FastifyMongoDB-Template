import dotenv from "dotenv";
dotenv.config();

// Function to validate and fetch environment variables
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} must be set`);
  }
  return value;
}

// Create the environment-specific prefix
const envPrefix =
  process.env.NODE_ENV?.toUpperCase() === "DEVELOPMENT" ? "DEV_" : "";

// Function to create a generic configuration object
function createConfig(prefix: string) {
  return {
    port: Number(getEnvVar(`${prefix}PORT`)),
    host: getEnvVar(`${prefix}HOST`),
    db: {
      host: getEnvVar(`${prefix}DB_HOST`),
      port: Number(getEnvVar(`${prefix}DB_PORT`)),
      name: getEnvVar(`${prefix}DB_NAME`),
    },
    redis: {
      host: getEnvVar(`${prefix}REDIS_HOST`),
      port: Number(getEnvVar(`${prefix}REDIS_PORT`)),
    },
  };
}

// Generate the configuration
const generatedConfig = createConfig(envPrefix);

export const config = {
  app: {
    port: generatedConfig.port,
    host: generatedConfig.host,
    API_VERSION: getEnvVar("API_VERSION"),
  },
  db: generatedConfig.db,
  redis: generatedConfig.redis,
  jwt: {
    secret: getEnvVar("JWT_SECRET"),
  },
};

export const ioOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
  maxHttpBufferSize: 1e8,
};
