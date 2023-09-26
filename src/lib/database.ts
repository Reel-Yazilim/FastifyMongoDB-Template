import { createClient } from "redis";
import { config } from "../config";
import { server } from "./server";
import mongoose from "mongoose";

const initRedis = () => {
  const redisClient = createClient({
    url: `redis://${config.redis.host}:${config.redis.port}`,
  });

  redisClient
    .connect()
    .then(() => {
      server.log.info("Connected To The Redis...");
    })
    .catch((err) => {
      server.log.error(`Failed to connect to the Redis : ${err}`);
      process.exit(1);
    });

  return redisClient;
};

// Initialize MongoDB
const initMongo = () => {
  const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

  mongoose
    .connect(connectionString)
    .then(() => server.log.info("Connected To The MongoDB..."))
    .catch((err) => {
      server.log.error(`Failed to connect to the MongoDB : ${err}`);
      process.exit(1);
    });
};

export { initRedis, initMongo };
