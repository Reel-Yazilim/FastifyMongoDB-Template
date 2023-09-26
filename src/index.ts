import { config } from "./config";
import server, { ServerPlugins } from "./lib/server";

server.listen(
  {
    port: config.app.port,
    host: config.app.host,
  },
  (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    server.log.info(`Server is up and running on port ${config.app.port}`);
  }
);

process.on("exit", () => {
  ServerPlugins.redis.disconnect();
});
