import express from 'express';
import config from './config';
import router from './routes/ssh.route';

const app = express();

app.use('/api', router);

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
