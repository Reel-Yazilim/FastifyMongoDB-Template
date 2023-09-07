import { pino } from "pino";
import PinoPretty from "pino-pretty";

// Initialize logger and server
const stream = PinoPretty({
  colorizeObjects: true,
  levelFirst: true,
  translateTime: "yyyy-mm-dd HH:MM:ss",
  ignore: "hostname,pid",
  append: true,
  messageFormat: "{msg}",
  colorize: true,
  sync: true,
});

const Logger = pino(stream);

export default Logger;
