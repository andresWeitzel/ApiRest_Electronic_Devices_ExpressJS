//External
require('dotenv').config();
//Environment vars
// Render inyecta PORT; local usa APP_PORT / PROD_PORT
const PORT = process.env.PORT || process.env.PROD_PORT || process.env.APP_PORT || 8082;
//Config middleware
const { appMiddleware } = require('./config/middleware/index');
//Utils swagger
const { swaggerDocs } = require('./utils/swagger');
//Models associations
const { defineAssociations } = require('./models/sequelize/associations');
// DB bootstrap (Render Postgres starts empty; Docker already seeds locally)
const { ensureDatabaseInitialized } = require('./setup/init-db');
//Const-vars
let app;

/**
 * @description function in charge of starting the server, adding the initial configuration and setting the http routes
 * @returns active instance of the server for handling requests and responses
 */
const run = async () => {
  try {
    await ensureDatabaseInitialized();

    //Define model associations
    defineAssociations();

    //Middleware
    app = await appMiddleware();

    //Server
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);

      await swaggerDocs(app, PORT);
    });
  } catch (error) {
    msg = `Error in run() function, server.js file. Caused by ${error}`;
    console.log(msg);
  }
};

run();