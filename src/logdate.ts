// Get today in YYYY.MM.DD.log
export default function logDate() {
	let logDate: any = new Date();
	logDate = `${logDate.getFullYear()}.${String(logDate.getMonth() + 1).padStart(2, "0")}.${String(logDate.getDate()).padStart(2, "0")}.log`;
	return logDate;
}
