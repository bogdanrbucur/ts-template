import { spawn } from "child_process";

function callPS() {
	return new Promise((res, err) => {
		console.log("Starting PowerShell...");
		const child = spawn("powershell.exe", [`.\\test.ps1`]);

		child.stdout.on("data", function (data) {
			console.log("PowerShell: " + data);
		});

		child.stderr.on("data", function (data) {
			console.log("PowerShell Errors: " + data);
			process.exit(1);
		});

		child.on("exit", function () {
			console.log("PS script done");
      res();
		});
    
		child.stdin.end(); // end input
	});
}

async function main() {
	console.log("Before calling PS script");
	await callPS();
	console.log("After calling PS script"); // this will be called after resolve() within the PS function
}

main();
