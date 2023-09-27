export interface Vessel {
	VesselName: string;
	VesselId?: number;
	VesselObjectId?: number;
	portCalls?: PortCall[];
}

export interface PortCall {
	LegPlaningStatus?: string;
	VoyageLegPlanningId: number;
	LegPortId: number;
	LegPortName: string;
	cargoes?: Cargo[];
}

export interface Cargo {
	bookingNo: string;
	activity: string;
	name: string;
	charterer: string;
	startTime: string;
	endTime: string;
	qty: number;
	port: string;
}

export interface CargoResponse {
	BookingNo: string;
	CargoActivity: string;
	CargoName: string;
	ChartererName: string;
	LayCanFrom: string;
	LaycanTo: string;
	Quantity: number;
}
