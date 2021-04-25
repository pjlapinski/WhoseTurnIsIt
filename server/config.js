const dotenvExp = require('dotenv-expand');
dotenvExp(require('dotenv').config());

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  REACT_PORT: process.env.REACT_PORT,
  REACT_HOST: process.env.REACT_HOST,
};
