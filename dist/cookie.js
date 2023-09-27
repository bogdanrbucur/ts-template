"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
async function getCookie(url, user, pass) {
    return new Promise(async (resolve, error) => {
        // const browser = await puppeteer.launch({ headless: "new" }); // for running in Node.js
        const browser = await puppeteer_1.default.launch({ executablePath: "./chromium/chrome.exe", headless: "new" }); // for .exe packages
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation();
        // Go to login page
        await page.goto(`${url}/palweblogin/Home/Login`);
        await navigationPromise;
        console.log(`Opened ${url}/palweblogin/Home/Login`);
        // Enter PAL credentials
        await page.waitForSelector("#UserName");
        await page.type("#UserName", user);
        await page.type("#Password", pass);
        await new Promise((r) => setTimeout(r, 100));
        await navigationPromise;
        await new Promise((r) => setTimeout(r, 200));
        await page.waitForSelector("#btnSubmit");
        await page.click("#btnSubmit");
        console.log("Logged in");
        // wait 2500ms for Dashboard to load
        await new Promise((r) => setTimeout(r, 2500));
        // Get the page cookies and then the first one of them
        const pageCookies = await page.cookies();
        const cookie = pageCookies[0].value;
        if (cookie.length === 192) {
            console.log(`Got .BSMAuthCookie`);
            await browser.close();
            console.log(`Closed the browser`);
            resolve(cookie);
            return cookie;
        }
        else {
            console.error("Received invalid cookie! Check the login credentials");
            throw new Error("Received invalid cookie! Check the login credentials");
        }
    });
}
exports.default = getCookie;
//# sourceMappingURL=cookie.js.map