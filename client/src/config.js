import dotenvExp from 'dotenv-expand';
import dotenv from 'dotenv';
dotenvExp(dotenv.config());

const config = {
  SERVER_PORT: process.env.REACT_APP_SERVER_PORT,
  SERVER_HOST: process.env.REACT_APP_SERVER_HOST,
};

export default config;
