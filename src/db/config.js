//External
require('dotenv').config();
const { Sequelize } = require('sequelize');
//Const
const CONNECTED_SUCCESFULLY = 'Connected succesfully';
const DB_CONFIG_ERROR_DETAIL =
  'Error in dbConnection() function.';
const DB_NAME = process.env.DB_NAME_PROD || process.env.DATABASE_NAME;
const DB_USER = process.env.DB_USER_PROD || process.env.DATABASE_USER;
const DB_PASSWORD = process.env.DB_PASS_PROD || process.env.DATABASE_PASSWORD;
const DB_HOST = process.env.DB_HOST_PROD || process.env.DATABASE_HOST;
const DB_DIALECT = process.env.DB_DIALECT_PROD || process.env.DATABASE_DIALECT;
const DB_POOL_MAX = process.env.DB_POOL_MAX_PROD || process.env.DATABASE_POOL_MAX;
const DB_POOL_MIN = process.env.DB_POOL_MIN_PROD || process.env.DATABASE_POOL_MIN;
const DB_POOL_ACQUIRE = process.env.DB_POOL_ACQUIRE_PROD || process.env.DATABASE_POOL_ACQUIRE;
const DB_POOL_IDLE = process.env.DB_POOL_IDLE_PROD || process.env.DATABASE_POOL_IDLE;

const dbConnection = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    dialect: DB_DIALECT,
    pool: {
      max: parseInt(DB_POOL_MAX),
      min: parseInt(DB_POOL_MIN),
      acquire: parseInt(DB_POOL_ACQUIRE),
      idle: parseInt(DB_POOL_IDLE),
    },
  },
);

dbConnection
  .authenticate()
  .then(() => {
    console.log(CONNECTED_SUCCESFULLY);
  })
  .catch((error) => {
    console.log(DB_CONFIG_ERROR_DETAIL);
  });

module.exports = {
  dbConnection,
};
