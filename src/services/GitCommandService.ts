import ConnectionService from './SshService';
import { getGitRepositoryByName } from '../repositories/GitRepoRepository';

interface CommandInterface {
  connectionService: ConnectionService;
}

export default class GitCommandService implements CommandInterface {
  connectionService: ConnectionService;
  constructor(connectionService: ConnectionService) {
    this.connectionService = connectionService;
  }

  async getCurrentBranchName(projectName: string) {
    const project = await getGitRepositoryByName(projectName);

    // TODO
    // Erro handling for fetch branch names.

    return this.connectionService.execCommand(
      `cd ${project.path} && git branch --show-current`,
      true
    );
  }
}
