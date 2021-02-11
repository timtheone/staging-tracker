import ConnectionService from './SshService';
interface CommandInterface {
    connectionService: ConnectionService;
}
export default class CommandService implements CommandInterface {
    connectionService: ConnectionService;
    constructor(connectionService: ConnectionService);
    getCurrentBranchName(projectPath: string): void;
}
export {};
