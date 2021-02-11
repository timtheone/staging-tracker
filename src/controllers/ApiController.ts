import { CommandService, ConnectionService } from '../services';

interface ApiControllerInterface {
  sshCommandService: CommandService;

  getBranch(projectPath: string): Promise<void>;
}

export default class ApiController implements ApiControllerInterface {
  sshCommandService: CommandService = new CommandService(
    new ConnectionService()
  );

  getBranch(projectPath: string) {
    return this.sshCommandService.getCurrentBranchName(projectPath);
  }
}
