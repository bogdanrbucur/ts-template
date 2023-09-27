import * as XLSX from "xlsx";
/* load 'fs' for readFile and writeFile support */
import * as fs from "fs";
XLSX.set_fs(fs);
import log from "log-to-file";
import { Vessel } from "./types.js";

export async function writeToExcel(v: Vessel, logfile: string): Promise<void> {
	try {
		let wb = XLSX.readFile("./cargo.xlsx");
		let ws = wb.Sheets["cargo"];

		if (!ws) throw new Error("Workseet not found!");

		// overwrite all cells with empty values
		for (let row = 1; row < 20000; row++) {
			let cellVessel = XLSX.utils.encode_cell({ c: 0, r: row });
			let cellPort = XLSX.utils.encode_cell({ c: 1, r: row });
			let cellBooking = XLSX.utils.encode_cell({ c: 2, r: row });
			let cellActivity = XLSX.utils.encode_cell({ c: 3, r: row });
			let cellStartTime = XLSX.utils.encode_cell({ c: 4, r: row });
			let cellEndTime = XLSX.utils.encode_cell({ c: 5, r: row });
			let cellCargoName = XLSX.utils.encode_cell({ c: 6, r: row });
			let cellQuantity = XLSX.utils.encode_cell({ c: 7, r: row });
			let cellCharterer = XLSX.utils.encode_cell({ c: 8, r: row });

			ws[cellVessel].v = "";
			ws[cellPort].v = "";
			ws[cellBooking].v = "";
			ws[cellActivity].v = "";
			ws[cellStartTime].v = "";
			ws[cellEndTime].v = "";
			ws[cellCargoName].v = "";
			ws[cellQuantity].v = "";
			ws[cellCharterer].v = "";
		}

		await XLSX.writeFile(wb, "./cargo.xlsx");

		console.log(`Emptied cargo.xlsx`);
		log(`Emptied cargo.xlsx`, `./logs/${logfile}`);

		v.portCalls?.forEach((pc) => {
			pc.cargoes?.forEach((c) => {
				// write the cargo entry in Excel
				for (let row = 1; row < 20000; row++) {
					let cellVessel = XLSX.utils.encode_cell({ c: 0, r: row });
					let cellPort = XLSX.utils.encode_cell({ c: 1, r: row });
					let cellBooking = XLSX.utils.encode_cell({ c: 2, r: row });
					let cellActivity = XLSX.utils.encode_cell({ c: 3, r: row });
					let cellStartTime = XLSX.utils.encode_cell({ c: 4, r: row });
					let cellEndTime = XLSX.utils.encode_cell({ c: 5, r: row });
					let cellCargoName = XLSX.utils.encode_cell({ c: 6, r: row });
					let cellQuantity = XLSX.utils.encode_cell({ c: 7, r: row });
					let cellCharterer = XLSX.utils.encode_cell({ c: 8, r: row });

					// On the first empty row
					if (ws[cellVessel].v == "") {
						ws[cellVessel].v = v.VesselName;
						ws[cellPort].v = pc.LegPortName;
						ws[cellBooking].v = c.bookingNo;
						ws[cellActivity].v = c.activity;
						ws[cellStartTime].v = c.startTime;
						ws[cellEndTime].v = c.endTime;
						ws[cellCargoName].v = c.name;
						ws[cellQuantity].v = c.qty;
						ws[cellCharterer].v = c.charterer;

						console.log(`Excel entry for ${v.VesselName} - ${pc.LegPortName} - ${c.bookingNo}`);
						log(`Excel entry for ${v.VesselName} - ${pc.LegPortName} - ${c.bookingNo}`, `./logs/${logfile}`);
						break;
					}
				}
			});
		});

		// write the changes to the file
		await XLSX.writeFile(wb, "./cargo.xlsx");

		console.log(`Finished exporting Excel report`);
		log(`Finished exporting Excel report`, `./logs/${logfile}`);
	} catch (err) {
		console.log(err);
		log(err, `./logs/${logfile}`);
		throw err;
	}
}