import ConnectionService from './SshService';

interface CommandInterface {
  connectionService: ConnectionService;
}

export default class CommandService implements CommandInterface {
  connectionService: ConnectionService;
  constructor(connectionService: ConnectionService) {
    this.connectionService = connectionService;
  }

  getCurrentBranchName(projectPath: string) {
    return this.connectionService.execCommand(
      `cd ${projectPath} && git branch --show-current`,
      true
    );
  }
}
