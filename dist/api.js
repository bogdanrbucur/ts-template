"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCargoForPort = exports.getPortCalls = exports.getVesselIds = void 0;
async function getVesselIds(url, cookie) {
    // build the Form body
    let bodyFormData = new FormData();
    bodyFormData.append("sort", "");
    bodyFormData.append("group", "");
    bodyFormData.append("filter", "");
    bodyFormData.append("HideGridContent", "false");
    bodyFormData.append("companyId", "1");
    const response = await fetch(`${url}/palpurchase/PurchasePAL/AllocationOfVessel/GetAllocationVesselDetails`, {
        method: "POST",
        headers: { Cookie: `.BSMAuthCookie=${cookie}` },
        body: bodyFormData,
    });
    const body = await response.json();
    if (!body.Errors)
        return body.Data;
    else
        throw new Error(body.Errors);
    // VesselId: 304400,
    // VesselObjectId: 246074,
    // VesselName: 'CHEM STREAM',
}
exports.getVesselIds = getVesselIds;
async function getPortCalls(url, cookie, vessel, startDate, endDate) {
    // build the Form body
    let bodyFormData = new FormData();
    bodyFormData.append("sort", "");
    bodyFormData.append("group", "");
    bodyFormData.append("filter", "");
    bodyFormData.append("vesselId", `${vessel.VesselId}`);
    bodyFormData.append("vesselObjectId", `${vessel.VesselObjectId}`);
    bodyFormData.append("portId", "0");
    bodyFormData.append("chartererId", "");
    bodyFormData.append("engagementTypeId", "");
    bodyFormData.append("startDate", startDate);
    bodyFormData.append("endDate", endDate);
    bodyFormData.append("status", "false");
    bodyFormData.append("voyagePlanningId", "0");
    const response = await fetch(`${url}/palvoyage/VoyagePAL/CargoLog/GetVoyageLegPlanning`, {
        method: "POST",
        headers: { Cookie: `.BSMAuthCookie=${cookie}` },
        body: bodyFormData,
    });
    const body = await response.json();
    // console.log(body.Data);
    if (!body.Errors)
        return body.Data;
    else
        throw new Error(body.Errors);
    // LegPlaningStatus: 'Completed'
    // VoyageLegPlanningId: 6288000000413
    // LegPortId: 121515
    // LegPortName: 'Rotterdam {NLRTM}, NETHERLANDS',
}
exports.getPortCalls = getPortCalls;
async function getCargoForPort(url, cookie, vessel, VoyageLegPlanningId, LegPortId) {
    // build the Form body
    let bodyData = { VesselId: vessel.VesselId, VesselObjectId: vessel.VesselObjectId, PORTID: LegPortId, LEGDTID: VoyageLegPlanningId };
    const response = await fetch(`${url}/palvoyage/VoyagePAL/CargoLog/GetCargoList`, {
        method: "POST",
        headers: { Cookie: `.BSMAuthCookie=${cookie}`, "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
    });
    const body = await response.json();
    if (body.isSuccess)
        return body.message.cargoCommodityList;
    else
        throw new Error(body.Errors);
}
exports.getCargoForPort = getCargoForPort;
//# sourceMappingURL=api.js.map