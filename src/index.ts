import logDate from "./logdate.js";
import log from "log-to-file";
import fs from "fs-extra";
import getCookie from "./cookie.js";
import { getCargoForPort, getPortCalls, getVesselIds } from "./api.js";
import { Cargo, Vessel } from "./types.js";
import { writeToExcel } from "./excel.js";

const main = async () => {
	// build the name of the logfile
	const logfile: string = logDate();

	// read config.json
	const config = await fs.readJson("./config.json");
	console.log(`Started application...`);
	log(`Started application...`, `./logs/${logfile}`);

	const cookie: string = await getCookie(config.url, config.user, config.pass);

	// for each vessel
	// build array of vessel objects
	let vessels: Vessel[] = [];
	config.vessels.forEach((vessel: string) => {
		vessels.push({ VesselName: vessel.toUpperCase() });
	});

	// get vesselId and vesselObjectId
	const vesselIds = await getVesselIds(config.url, cookie);

	// add them to the vesselsArray
	vessels.forEach((v) => {
		vesselIds.forEach((id) => {
			if (v.VesselName === id.VesselName) {
				v.VesselId = id.VesselId;
				v.VesselObjectId = id.VesselObjectId;
			}
		});
	});
	console.log(`Got the list of vessels`);
	log(`Got the list of vessels`, `./logs/${logfile}`);

	// using date interval from config.json, get all port calls for each vessel
	for (const v of vessels) {
		const portCalls = await getPortCalls(config.url, cookie, v, config.startDate, config.endDate);

		// add them to the vessel object if Completed
		v.portCalls = [];
		portCalls.forEach((pc) => {
			pc.LegPlaningStatus === "Completed"
				? v.portCalls?.push({ VoyageLegPlanningId: pc.VoyageLegPlanningId, LegPortId: pc.LegPortId, LegPortName: pc.LegPortName, cargoes: [] })
				: null;
		});
	}
	console.log(`Got the completed port calls for each vessel`);
	log(`Got the completed port calls for each vessel`, `./logs/${logfile}`);

	// for each port call of each vessel, get the booking reference, cargo, charterer, activity, quantity, start time, stop time
	for (const v of vessels) {
		for (const pc of v.portCalls!) {
			const cargoes = await getCargoForPort(config.url, cookie, v, pc.VoyageLegPlanningId, pc.LegPortId);

			// and add them to the list of cargoes for each portcall
			cargoes.forEach((c) => {
				pc.cargoes?.push({
					bookingNo: c.BookingNo,
					activity: c.CargoActivity,
					name: c.CargoName,
					charterer: c.ChartererName,
					startTime: c.LayCanFrom,
					endTime: c.LaycanTo,
					qty: c.Quantity,
					port: pc.LegPortName,
				});
			});
		}
		console.log(`Got the cargoes for each portcall for ${v.VesselName}`);
		log(`Got the cargoes for each portcall for ${v.VesselName}`, `./logs/${logfile}`);
	}
	console.log(`Got the cargoes for each portcall of each vessel`);
	log(`Got the cargoes for each portcall of each vessel`, `./logs/${logfile}`);

	// write to excel
	await writeToExcel(vessels, logfile);
};

main();
