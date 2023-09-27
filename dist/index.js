"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logdate_js_1 = __importDefault(require("./logdate.js"));
const log_to_file_1 = __importDefault(require("log-to-file"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cookie_js_1 = __importDefault(require("./cookie.js"));
const api_js_1 = require("./api.js");
const excel_js_1 = require("./excel.js");
const main = async () => {
    // build the name of the logfile
    const logfile = (0, logdate_js_1.default)();
    // read config.json
    const config = await fs_extra_1.default.readJson("./config.json");
    console.log(`Started application...`);
    (0, log_to_file_1.default)(`Started application...`, `./logs/${logfile}`);
    const cookie = await (0, cookie_js_1.default)(config.url, config.user, config.pass);
    // for each vessel
    // build array of vessel objects
    let vessels = [];
    config.vessels.forEach((vessel) => {
        vessels.push({ VesselName: vessel.toUpperCase() });
    });
    // get vesselId and vesselObjectId
    const vesselIds = await (0, api_js_1.getVesselIds)(config.url, cookie);
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
    (0, log_to_file_1.default)(`Got the list of vessels`, `./logs/${logfile}`);
    // using date interval from config.json, get all port calls for each vessel
    for (const v of vessels) {
        const portCalls = await (0, api_js_1.getPortCalls)(config.url, cookie, v, config.startDate, config.endDate);
        // add them to the vessel object if Completed
        v.portCalls = [];
        portCalls.forEach((pc) => {
            pc.LegPlaningStatus === "Completed"
                ? v.portCalls?.push({ VoyageLegPlanningId: pc.VoyageLegPlanningId, LegPortId: pc.LegPortId, LegPortName: pc.LegPortName, cargoes: [] })
                : null;
        });
    }
    console.log(`Got the completed port calls for each vessel`);
    (0, log_to_file_1.default)(`Got the completed port calls for each vessel`, `./logs/${logfile}`);
    // for each port call of each vessel, get the booking reference, cargo, charterer, activity, quantity, start time, stop time
    for (const v of vessels) {
        for (const pc of v.portCalls) {
            const cargoes = await (0, api_js_1.getCargoForPort)(config.url, cookie, v, pc.VoyageLegPlanningId, pc.LegPortId);
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
        (0, log_to_file_1.default)(`Got the cargoes for each portcall for ${v.VesselName}`, `./logs/${logfile}`);
    }
    console.log(`Got the cargoes for each portcall of each vessel`);
    (0, log_to_file_1.default)(`Got the cargoes for each portcall of each vessel`, `./logs/${logfile}`);
    // write to excel
    await (0, excel_js_1.writeToExcel)(vessels, logfile);
};
main();
//# sourceMappingURL=index.js.map