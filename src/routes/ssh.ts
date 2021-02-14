import { Router, Request, Response } from 'express';
import GitRepositoryController from '../controllers/GitRepositoryController';

const route = Router();

const apiController = new GitRepositoryController();

route.get('/branch_name', async (req: Request, res: Response) => {
  const data = await apiController.getBranchName('three-js-test');
  res.json(data);
});

export default route;
