const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");


  const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "ApiRest_Dispositivos_Electronicos_ExpressJS            ",
            version: 'v1'
        },
        components:{
            securitySchemas: {
                bearerAuth:{
                    type:'http',
                    schema:'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },

    apis: ['./src/config/routes/componentRoutes']
  };

  const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = async(app, port) =>{
  // Swagger page
  app.use("/swagger/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/swagger/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

};

module.exports={
    swaggerDocs
};