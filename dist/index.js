import logDate from "./logdate.js";
import log from "log-to-file";
import fs from "fs-extra";
import getCookie from "./cookie.js";
import { getCargoForPort, getPortCalls, getVesselIds } from "./api.js";
const main = async () => {
    // build the name of the logfile
    const logfile = logDate();
    // read config.json
    const config = await fs.readJson("./config.json");
    console.log(`Started application...`);
    log(`Started application...`, `./logs/${logfile}`);
    const cookie = await getCookie(config.url, config.user, config.pass);
    // for each vessel
    // build array of vessel objects
    let vessels = [];
    config.vessels.forEach((vessel) => {
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
    // console.log(vesselsArray);
    // using date interval from config.json, get all port calls for each vessel
    for (const v of vessels) {
        const portCalls = await getPortCalls(config.url, cookie, v, config.startDate, config.endDate);
        // add them to the vessel object if Completed
        v.portCalls = [];
        portCalls.forEach((pc) => {
            pc.LegPlaningStatus === "Completed" ? v.portCalls?.push({ VoyageLegPlanningId: pc.VoyageLegPlanningId, LegPortId: pc.LegPortId, LegPortName: pc.LegPortName }) : null;
        });
    }
    // TODO for each port call, get the booking reference, cargo, charterer, activity, quantity, start time, stop time
    for (const v of vessels) {
        for (const pc of v.portCalls) {
            const cargo = await getCargoForPort(config.url, cookie, v, pc.VoyageLegPlanningId, pc.LegPortId);
            // console.log(cargo);
        }
    }
};
main();
//# sourceMappingURL=index.js.map