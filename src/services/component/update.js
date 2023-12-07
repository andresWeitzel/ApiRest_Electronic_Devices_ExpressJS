//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors details
const UPDATE_OBJECT_DETAILS =
  'Component has been successfully updated based on id ';
const UPDATE_OBJECT_ERROR_DETAILS =
  'Check if the component you want to updated exists in the db. The component has not been updated based on the id ';
const UPDATE_COMPONENT_ERROR_DETAIL =
  'Error in updateComponentService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let idParam;
let codigoParam;
let params;
let reqBody;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let stockParam;
let msgLog;
let msgResponse;

/**
 * @description update a componente from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentService = async (req, res) => {
  try {
    updatedComponent = null;
    params = null;
    reqBody = null;
    idParam = 0;
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = null;
    priceParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params == (null || undefined)) {
      return null;
    }
    idParam = params.id ? parseInt(params.id) : idParam;
    //-- end with params  ---

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
      await Component.update(
        {
          codigo: codigoParam,
          imagen: imagenParam,
          nro_pieza: nroPiezaParam,
          categoria: categoriaParam,
          descripcion: descripcionParam,
          fabricante: fabricanteParam,
          stock: stockParam,
          precio: precioParam,
        },
        {
          where: {
            id: idParam,
          },
        },
      )
        .then(async (componentItem) => {
          updatedComponent =
            componentItem[0] == 1
              ? {
                  objectUpdated: UPDATE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectUpdated: UPDATE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = UPDATE_COMPONENT_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          updatedComponent = await checkErrors(error, error.name);
        });
    } else {
      updatedComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msgResponse = UPDATE_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    updatedComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return updatedComponent;
};

module.exports = {
  updateComponentService,
};
