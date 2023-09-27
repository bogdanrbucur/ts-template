"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Get today in YYYY.MM.DD.log
function logDate() {
    let logDate = new Date();
    logDate = `${logDate.getFullYear()}.${String(logDate.getMonth() + 1).padStart(2, "0")}.${String(logDate.getDate()).padStart(2, "0")}.log`;
    return logDate;
}
exports.default = logDate;
//# sourceMappingURL=logdate.js.map