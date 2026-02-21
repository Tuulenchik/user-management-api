"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = mongoConnect;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../configs/config"));
mongoose_1.default.connection.once('open', () => {
    console.log('MongoDB connection is ready');
});
async function mongoConnect() {
    try {
        await mongoose_1.default.connect(config_1.default.mongoUri);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
mongoose_1.default.connection.on('error', err => {
    console.error(err);
});
//# sourceMappingURL=mongoConnection.js.map