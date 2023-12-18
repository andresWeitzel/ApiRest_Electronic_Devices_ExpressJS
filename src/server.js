//External
require('dotenv').config();
//Environment vars
//Env vars
const PORT = process.env.PROD_PORT || process.env.APP_PORT || 8082;
//Config middleware
const { appMiddleware } = require('./config/middleware/index');
//Utils swagger
const { swaggerDocs } = require('./utils/swagger');
//Const-vars
let app;

/**
 * @description function in charge of starting the server, adding the initial configuration and setting the http routes
 * @returns active instance of the server for handling requests and responses
 */
const run = async () => {
  try {
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
