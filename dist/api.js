export async function getVesselIds(url, cookie) {
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
export async function getPortCalls(url, cookie, vessel, startDate, endDate) {
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
export async function getCargoForPort(url, cookie, vessel, VoyageLegPlanningId, LegPortId) {
    // build the Form body
    let bodyData = { VesselId: "304373", VesselObjectId: "246026", PORTID: "121515", LEGDTID: "6288000000413" };
    const response = await fetch(`${url}/palvoyage/VoyagePAL/CargoLog/GetCargoList`, {
        method: "POST",
        headers: { Cookie: `.BSMAuthCookie=${cookie}`, "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
    });
    const body = await response.json();
    console.log(body);
    if (body.isSuccess)
        return body.message.cargoCommodityList;
    else
        throw new Error(body.Errors);
    // body.message.cargoCommodityList[]
    // body.message.cargoCommodityList.BookingNo
    // body.message.cargoCommodityList.CargoActivity
    // body.message.cargoCommodityList.CargoName
    // body.message.cargoCommodityList.ChartererName
    // body.message.cargoCommodityList.LayCanFrom
    // body.message.cargoCommodityList.LaycanTo
    // body.message.cargoCommodityList.Quantity
}
//# sourceMappingURL=api.js.map