function syncFunction() {
	console.log("1. This runs before the async operation");
	asyncFunction();
	console.log("3. This runs in the sync function after starting the async operation");
	console.log("Do other stuff here until the async operation is done");
}

async function asyncFunction() {
	console.log("2. This runs inside the async function before the async operation");

	// print to console after 1 second

	const activity = await fetch("https://boredapi.com/api/activity");

	console.log("4. This runs after await is resolved");
}

syncFunction();
