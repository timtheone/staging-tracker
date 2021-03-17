import { GitCommandService, ConnectionService } from '../services';
import GitRepositoryDTO from '../DTOs/GitRepositoryDTO';

interface ApiControllerInterface {
  sshCommandService: GitCommandService;

  getBranchName(projectName: string): Promise<GitRepositoryDTO>;
}

export default class GitRepositoryController implements ApiControllerInterface {
  sshCommandService: GitCommandService = new GitCommandService(
    new ConnectionService('Local Ubuntu Server')
  );

  async getBranchName(projectName: string) {
    console.log(projectName);
    const branchName = await this.sshCommandService.getCurrentBranchName(
      projectName
    );

    const data: GitRepositoryDTO = {
      branchName: branchName,
    };

    return data;
  }
}
