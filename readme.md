# TypeScript template for starting a new project

## Compile & run in console

1. `npm i` to install dependencies
2. `tsc --watch` to start the TypeScript compiler in watch mode
3. `npm start` to launch the app in the console

## Package to .exe

1. [Node.js](https://nodejs.org/en/download) installed
2. [pkg](https://www.npmjs.com/package/pkg) installed `npm i -g pkg`
3. Set `"module": "CommonJS"` in `tsconfig.json`
4. Start puppeteer from local Chromium `const browser = await puppeteer.launch({ executablePath: "./chromium/chrome.exe", headless: "new" })`
5. Compile with `pkg . -t latest-win-x64 --public`
6. Keep `config.json`, `./chromium`, `cargo.xlsx` and `./logs` in the local folder
