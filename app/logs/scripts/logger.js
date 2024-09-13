import { format } from "date-fns";
import { v1 as uuid } from "uuid";
import * as fsPromises from "node:fs/promises";

import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const methods = ["get", "post", "put", "delete"];

export const logEvents = async (message, method, fileName) => {
  methods.includes(method.toLowerCase()) ? method : (method = "unknown");
  const dateTime = format(new Date(), "dd/MM/yyyy\tHH:mm:ss");
  const logItem = `[${method.toUpperCase()}] - ${dateTime}\t${uuid()} | ${message}\n`;

  try {
    await fsPromises.appendFile(path.join(__dirname, "..", fileName), logItem);
  } catch (err) {
    console.log(err);
  }
};
