//External
require("dotenv").config();
//Environment vars
const PORT = process.env.APP_PORT || 8082;
//Config
const { appMiddleware } = require("./config/middleware/index");
//Const-vars
let app;

/**
 * @description función encargada de levantar el servidor, añadir la configuración inicial y setear las rutas http
 * @returns active instance of the server for handling requests and responses
 */
const run = async () => {
  app = await appMiddleware();

  app.get("/", (req, res) => {
    res.json({ mesagge: "Hello" });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

run();
