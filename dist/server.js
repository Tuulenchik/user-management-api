"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./configs/config"));
const mongoConnection_1 = require("./models/mongoConnection");
const PORT = config_1.default.port;
async function startServer() {
    await (0, mongoConnection_1.mongoConnect)();
    app_1.default.listen(PORT, () => {
        console.log(`listening to port ${config_1.default.port}. Server starts at ${config_1.default.nodeEnv} environment`);
    });
}
startServer();
//# sourceMappingURL=server.js.map