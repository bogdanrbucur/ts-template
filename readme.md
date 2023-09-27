# Vessels Carried Cargo

This script fetches all the cargoes during all the port calls in the configured period for the configured vessels and exports them to `cargo.xlsx`.

## Setup

### config.json

Rename `config.template.jsonc` to `config.json` and fill the required credentials to use the application.

- `url`: input without trailing slash. eg: <https://palapp.asm-maritime.com>, **not <https://palapp.asm-maritime.com/>**
- `user`: PAL user used for application login
- `pass`: PAL user password
- `vessels`: array of strings. As per JSON convention, last item must not have a trailing comma
- `startDate`: string date in format DD-MMM-YYYY. Example: `01-Jan-2022`
- `endDate`: string date in format DD-MMM-YYYY. Example: `01-Jan-2022`

## Compile & run in console

1. `npm i` to install dependencies
2. `tsc --watch` to start the TypeScript compiler in watch mode
3. `npm start` to launch the app in the console

## Package to .exe

Need to set `"module": "CommonJS"` in `tsconfig.json` for `pkg` to work.

1. [Node.js](https://nodejs.org/en/download) installed
2. In `/src/cookie.ts` comment line #5 and uncomment #6
3. Compile with `pkg . -t latest-win-x64 --public`
4. Keep `config.json`, `./chromium`, `cargo.xlsx` and `./logs` in the local folder
