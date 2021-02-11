import express from 'express';
import ApiController from '../controllers/ApiController';

const router = express.Router();
const apiController = new ApiController();

router.get('/branch_name', async function (req, res) {
  const repoPath = req.query.repo_path;

  if (typeof repoPath === 'string') {
    const branch_name = await apiController.getBranch(repoPath);
    res.json({ branchName: branch_name });
  }
});

export default router;
