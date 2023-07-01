const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");


  const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Rest Api Docs",
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

    apis: ['./src/config/routes/componentRoute']
  };

  const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = async(app, port) =>{
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

}

module.exports={
    swaggerDocs
}