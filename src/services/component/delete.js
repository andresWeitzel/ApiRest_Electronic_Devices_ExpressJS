//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//const
const DELETE_COMPONENT_ERROR_DETAIL =
  'Error in deleteComponentService() function. Caused by ';
const DELETE_OBJECT_DETAILS =
  'Component has been successfully removed based on id ';
const DELETE_OBJECT_ERROR_DETAILS =
  'Check if the component you want to remove exists in the db. The component has not been removed based on the id ';
//Vars
let idParam;
let params;
let msgLog;
let msgResponse;

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
    msgLog = null;
    msgResponse = null;
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
                  objectDeleted: DELETE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectDeleted: DELETE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = DELETE_COMPONENT_ERROR_DETAIL;
          msgLog = msgResponse + error;
          console.log(msgLog);

          deleteComponent = await checkErrors(error, error.name);
        });
    } else {
      deleteComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msgResponse = DELETE_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + error;
    console.log(msgLog);

    deleteComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return deleteComponent;
};

module.exports = {
  deleteComponentService,
};
