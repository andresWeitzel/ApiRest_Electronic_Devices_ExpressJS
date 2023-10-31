//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//params
let idParam;
let codigoParam;
let params;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let stockParam;
let priceParam;
let msg;

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
    msg = null;
    params = null;
    idParam = 0;
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = null;
    priceParam = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      idParam = params.id ? parseInt(params.id) : idParam;
    }
    //-- end with params  ---

    if (Component != (null && undefined) && idParam != null) {
      await Component.update(
        {
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
                  objectUpdated: `Se ha actualizado correctamente el componente según el id ${idParam}`,
                }
              : {
                  objectUpdated: `No se ha actualizado el componente según el id ${idParam}. Comprobar si el componente existe en la db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in updateComponentService() function when trying to update a component. Caused by ${error}`;
          console.log(msg);

          updatedComponent = await checkErrors(error, error.name);
        });
    } else {
      updatedComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in updateComponentService() function. Caused by ${error}`;
    console.log(msg);
    updatedComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return updatedComponent;
};

module.exports = {
  updateComponentService,
};
