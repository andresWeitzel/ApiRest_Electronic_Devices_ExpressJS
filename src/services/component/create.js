//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
//Helpers
const { checkErrors } = require('../../helpers/sequelize/errors');
//components
let newComponent;
//params
let codigoParam;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let reqBody;
let stockParam;
let precioParam;
let msg;

/**
 * @description create a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createComponentService = async (req, res) => {
  try {
    newComponent = null;
    msg = null;
    reqBody = null;
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = null;
    precioParam = null;

    //-- start with body ---
    reqBody = req.body;
    if (reqBody == (null || undefined)) {
      return null;
    }
    codigoParam = reqBody.codigo ? reqBody.codigo : codigoParam;
    imagenParam = reqBody.imagen ? reqBody.imagen : imagenParam;
    nroPiezaParam = reqBody.nro_pieza ? reqBody.nro_pieza : nroPiezaParam;
    categoriaParam = reqBody.categoria ? reqBody.categoria : categoriaParam;
    descripcionParam = reqBody.descripcion
      ? reqBody.descripcion
      : descripcionParam;
    fabricanteParam = reqBody.fabricante ? reqBody.fabricante : fabricanteParam;
    stockParam = reqBody.stock ? reqBody.stock : stockParam;
    precioParam = reqBody.precio ? reqBody.precio : precioParam;
    //-- end with body ---

    if (Component != (null && undefined)) {
      await Component.create({
        codigo: codigoParam,
        imagen: imagenParam,
        nro_pieza: nroPiezaParam,
        categoria: categoriaParam,
        descripcion: descripcionParam,
        fabricante: fabricanteParam,
        stock: stockParam,
        precio: precioParam,
      })
        .then(async (componentItem) => {
          newComponent = componentItem.dataValues;
        })
        .catch(async (error) => {
          msg = `Error in createComponentService() function when trying to create a component. Caused by ${error}`;
          console.log(msg);
          newComponent = await checkErrors(error, error.name);
        });
    } else {
      newComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in createComponentService() function. Caused by ${error}`;
    console.log(msg);
    newComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return newComponent;
};

module.exports = {
  createComponentService,
};
