//External
require("dotenv").config();
//Environment vars
const PORT = process.env.APP_PORT || 8082;
//Config middleware
const { appMiddleware } = require("./config/middleware/index");
//Config router
const componentRouter = require("./config/routes/componentRoutes");
//Utils swagger
const {swaggerDocs} = require("./utils/swagger");
//Const-vars
let app;

/**
 * @description función encargada de levantar el servidor, añadir la configuración inicial y setear las rutas http
 * @returns active instance of the server for handling requests and responses
 */
const run = async () => {

  //Middleware
  app = await appMiddleware();

  //Routes
  app.use('/v1/componentes',componentRouter);

  //Server
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    await swaggerDocs(app, PORT);
  });
};

run();
