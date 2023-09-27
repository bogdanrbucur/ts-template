export async function getVesselIds(url, cookie) {
    // build the Form body
    let bodyFormData = new FormData();
    bodyFormData.append("sort", "");
    bodyFormData.append("group", "");
    bodyFormData.append("filter", "");
    bodyFormData.append("HideGridContent", "false");
    bodyFormData.append("companyId", "1");
    fetch(`${url}/palpurchase/PurchasePAL/AllocationOfVessel/GetAllocationVesselDetails`, { method: "POST", headers: { Cookie: `.BSMAuthCookie=${cookie}` }, body: bodyFormData })
        .then(async (response) => {
        const body = await response.json();
        if (!body.Errors)
            console.log(body.Data);
        else
            throw new Error(body.Errors);
    })
        .catch(function (err) {
        console.log("Unable to fetch -", err);
    });
    // VesselId: 304400,
    // VesselObjectId: 246074,
    // VesselName: 'CHEM STREAM',
}
//# sourceMappingURL=fetch.js.map