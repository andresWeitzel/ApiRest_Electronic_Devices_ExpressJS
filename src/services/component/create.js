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
let stockParam;
let priceParam;
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
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = null;
    priceParam = null;

    if (Component != (null && undefined)) {
      await Component.create({
        codigo: req.body?.codigo ? req.body.codigo : codigoParam,
        imagen: req.body?.imagen ? req.body.imagen : imagenParam,
        nro_pieza: req.body?.nro_pieza ? req.body.nro_pieza : nroPiezaParam,
        categoria: req.body?.categoria ? req.body.categoria : categoriaParam,
        descripcion: req.body?.descripcion
          ? req.body.descripcion
          : descripcionParam,
        fabricante: req.body?.fabricante
          ? req.body.fabricante
          : fabricanteParam,
        stock: req.body?.stock ? req.body.stock : stockParam,
        precio: req.body?.precio ? req.body.precio : priceParam,
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
