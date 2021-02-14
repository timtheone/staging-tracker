import { CorsOptions } from 'cors';
import config from './index';

const options: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin:
    config.env === 'development' ? 'http://localhost:5000' : config.corsOrigin,
  preflightContinue: false,
};

export default options;
