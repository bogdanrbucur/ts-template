import fs from "fs-extra";
import log from "log-to-file";
import logfile from "./logdate.js";

// If ./logs folder doesn't exist, create it
try {
	fs.ensureDirSync(`./logs`);
} catch (err) {
	console.error(err);
}

// read config.json
const config = await fs.readJson("./config.json");

// If config.url ends with a slash, remove it
if (config.url.endsWith("/")) {
	config.url = config.url.slice(0, -1);
}

console.log(`Started application...`);
log(`Started application...`, `./logs/${logfile}`);
