//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
//Helpers
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors
const ADD_COMPONENT_ERROR_DETAIL =
  'Error in createComponentService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let newComponent;
let codigoParam;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let reqBody;
let stockParam;
let precioParam;
let msgLog;
let msgResponse;

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
    reqBody = null;
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = null;
    precioParam = null;
    msgLog = null;
    msgResponse = null;

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
          msgResponse = ADD_COMPONENT_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          newComponent = await checkErrors(error, error.name);
        });
    } else {
      newComponent = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = ADD_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    newComponent = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return newComponent;
};

module.exports = {
  createComponentService,
};
