"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SshService_1 = __importDefault(require("./services/SshService"));
const CommandService_1 = __importDefault(require("./services/CommandService"));
const app = express_1.default();
const port = 3000;
const connection = new CommandService_1.default(new SshService_1.default());
connection.getCurrentBranchName('/home/ubuntu/three-js-test/');
