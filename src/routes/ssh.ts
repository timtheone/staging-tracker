import { Router, Request, Response } from 'express';
import GitRepositoryController from '../controllers/GitRepositoryController';

const route = Router();

const apiController = new GitRepositoryController();

route.get('/branch_name/:branch_name', async (req: Request, res: Response) => {
  const { branch_name } = req.params;
  const data = await apiController.getBranchName(branch_name);
  res.json(data);
});

export default route;
