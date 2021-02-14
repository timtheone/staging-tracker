import express from 'express';
import cors from 'cors';
import config from './config';
import options from './config/cors.config';
import ssh from './routes/ssh';

const app = express();

app.use(cors(options));

app.use('/api', ssh);

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}`);
});
