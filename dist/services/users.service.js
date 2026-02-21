"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = listUsers;
exports.listUsersByRole = listUsersByRole;
exports.getUserbyID = getUserbyID;
exports.updatingUser = updatingUser;
exports.deletingUser = deletingUser;
const users_model_mongo_1 = require("../models/users.model.mongo");
async function listUsers() {
    return await users_model_mongo_1.User.find({});
}
async function listUsersByRole(role) {
    return await users_model_mongo_1.User.find({ role });
}
async function getUserbyID(id) {
    return await users_model_mongo_1.User.findById(id);
}
async function updatingUser(id, data) {
    return await users_model_mongo_1.User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}
async function deletingUser(id) {
    return await users_model_mongo_1.User.findByIdAndDelete(id);
}
//# sourceMappingURL=users.service.js.map