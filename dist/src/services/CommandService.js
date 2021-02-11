"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandService {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    getCurrentBranchName(projectPath) {
        this.connectionService.execCommand(`cd ${projectPath} && git branch --show-current`, true);
    }
}
exports.default = CommandService;
