import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.APP_PORT || '3000', 10),
  targetServer: {
    host: process.env.TARGET_SERVER_HOST || '',
    user: process.env.TARGET_SERVER_USER || '',
    pass: process.env.TARGET_SERVER_PASSWORD || '',
  },
};
