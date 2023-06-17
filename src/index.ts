import axios from "axios";
import log from 'log-to-file';

async function getResponse() {
	try {
		let response = await axios.get("https://boredapi.com/api/activity"); // wait for the promise
		console.log(`2. You could ${response.data.activity}`); // runs after the promise returns
		console.log("3. this line runs after the promise returns"); // runs after the promise returns
	} catch (error) {
		console.log(error);
	}
}

getResponse()
	// runs after the entire function is finished
	.then(async () => {
		// can be async or not
		console.log(`4. this line runs after the entire function is finished`);
		let response = await axios.get("https://boredapi.com/api/activity"); // wait for the promise
		console.log(`5. You could ${response.data.activity}`); // runs after the promise returns
	})
	.then(() => {
		// not async, because not needed
		console.log(`6. can keep chaining thens...`);
	})
	.catch((error) => {
		console.log(error);
	});

// runs immediately after the function is called, in essence in parallel with the function
console.log("1. this line runs immediately after the function is called");
