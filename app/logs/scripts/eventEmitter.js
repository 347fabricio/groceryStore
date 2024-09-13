import { logEvents } from "./logger.js";
import { EventEmitter } from "node:events";

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (msg, method, fileName) => logEvents(msg, method, fileName));

export const emitEvent = (msg, method, fileName) => {
  setTimeout(() => {
    myEmitter.emit("log", msg, method, fileName);
  }, 1000);
};
