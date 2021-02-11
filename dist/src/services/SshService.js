"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_ssh_1 = require("node-ssh");
const config_1 = __importDefault(require("../config"));
class ConnectionService {
    constructor() {
        this.host = config_1.default.targetServer.host;
        this.username = config_1.default.targetServer.user;
        this.password = config_1.default.targetServer.user;
        this._ssh = new node_ssh_1.NodeSSH();
    }
    connect() {
        return this._ssh.connect({
            host: this.host,
            username: this.username,
            password: this.password,
        });
    }
    execCommand(command, returnOutput = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield this.connect();
            connection
                .execCommand(command)
                .then(function (result) {
                if (returnOutput) {
                    console.log('STDOUT: ' + result.stdout);
                }
            })
                .then(() => this._ssh.dispose());
        });
    }
}
exports.default = ConnectionService;
