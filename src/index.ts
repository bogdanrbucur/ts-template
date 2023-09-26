import logDate from "./logdate.js";
import log from "log-to-file";
import fs from "fs-extra";
import getCookie from "./getCookie.js";
import { getVesselIds } from "./fetch.js";

const main = async () => {
	// build the name of the logfile
	const logfile: string = logDate();

	// read config.json
	const config = await fs.readJson("./config.json");
	console.log(`Started application...`);
	log(`Started application...`, `./logs/${logfile}`);

	const authCookie: string = await getCookie(config.url, config.user, config.pass);

	// TODO for each vessel

	// TODO getVesselIds
	// TODO get vesselId and/or vesselObjectId
	await getVesselIds(config.url, authCookie);

	// TODO getPortCalls
	// TODO using date interval from config.json, get all port calls

	// TODO getCargoForPort
	// TODO for each port call, get the booking reference, cargo, charterer, activity, quantity, start time, stop time
};

main();
