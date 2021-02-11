"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    port: parseInt(process.env.APP_PORT || '3000', 10),
    targetServer: {
        host: process.env.TARGET_SERVER_HOST || '',
        user: process.env.TARGET_SERVER_USER || '',
        pass: process.env.TARGET_SERVER_PASSWORD || '',
    },
};
