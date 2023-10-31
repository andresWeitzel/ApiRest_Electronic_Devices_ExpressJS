//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//params
let idParam;
let params;
let msg;

/**
 * @description delete a component from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentService = async (req, res) => {
  try {
    //Params
    deleteComponent = null;
    msg = null;
    params = null;
    idParam = 0;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      idParam = params.id ? parseInt(params.id) : null;
    }
    //-- end with params  ---

    if (Component != (null && undefined) && idParam != null) {
      await Component.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (componentItem) => {
          deleteComponent =
            componentItem == 1
              ? {
                  objectDeleted: `Se ha eliminado correctamente el componente según el id ${idParam}`,
                }
              : {
                  objectDeleted: `No se ha eliminado el componente según el id ${idParam}. Comprobar si el componente existe en la db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in deleteComponentService() function when trying to delete a component. Caused by ${error}`;
          console.log(msg);

          deleteComponent = await checkErrors(error, error.name);
        });
    } else {
      deleteComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in deleteComponentService() function. Caused by ${error}`;
    console.log(msg);
    deleteComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return deleteComponent;
};

module.exports = {
  deleteComponentService,
};
