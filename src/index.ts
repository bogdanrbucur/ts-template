import logDate from "./logdate.js";
import log from "log-to-file";
import fs from "fs-extra";

const main = async () => {
	// build the name of the logfile
	const logfile: string = logDate();

	// read config.json
	const config = await fs.readJson("./config.json");
	console.log(`Started application...`);
	log(`Started application...`, `./logs/${logfile}`);
};

main();
