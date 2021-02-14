import { GitCommandService, ConnectionService } from '../services';
import GitRepositoryDTO from '../DTOs/GitRepositoryDTO';
import projectsData from '../mock/data';

interface ApiControllerInterface {
  sshCommandService: GitCommandService;

  getBranchName(projectName: string): Promise<GitRepositoryDTO>;
}

export default class GitRepositoryController implements ApiControllerInterface {
  sshCommandService: GitCommandService = new GitCommandService(
    new ConnectionService()
  );

  async getBranchName(projectName: string) {
    // TODO
    // Refactor to use database entry.
    const projectPath = projectsData.projects[0].absoluteProjectPath;
    const branchName = await this.sshCommandService.getCurrentBranchName(
      projectPath
    );

    const data: GitRepositoryDTO = {
      branchName: branchName,
    };

    return data;
  }
}
