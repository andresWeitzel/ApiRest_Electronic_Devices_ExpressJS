//Models
const { Component } = require("../models/sequelize/component");
//Enums
const { statusName } = require("../enums/connection/statusName");
//Const-vars
let newComponent;
let component;
let msg;

/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const addComponentService = async (req, res) => {
  try {
    newComponent = null;
    msg = null;

    console.log({'COMPONENTE SERVICE':component});

    if (Component != null) {
      await Component.create({ 
        codigo: req.body.codigo,
        imagen: req.body.imagen,
        nro_pieza: req.body.nro_pieza,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        fabricante: req.body.fabricante,
        stock: req.body.stock,
        precio: req.body.precio,
       })
        .then((componentItem) => {
          newComponent = componentItem;
        })
        .catch((error) => {
          msg = `Error in addComponentService() function when trying to create a component. Caused by ${error}`;
          console.log(error);
          newComponent = statusName.CONNECTION_REFUSED;
        });
    } else {
      newComponent = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in addComponentService() function. Caused by ${error}`;
    console.log(msg);
    newComponent = statusName.CONNECTION_ERROR;
  }
  return newComponent;
};

module.exports = {
  addComponentService,
};
