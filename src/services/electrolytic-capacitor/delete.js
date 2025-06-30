//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors details
const DELETE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in deleteElectrolyticCapacitorService() function.';
const DELETE_OBJECT_DETAILS =
  'Electrolytic capacitor has been successfully removed based on id ';
const DELETE_OBJECT_ERROR_DETAILS =
  'Check if the electrolytic capacitor you want to remove exists in the db. The electrolytic capacitor has not been removed based on the id ';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let params;
let idParam;
let deleteElectrolyticCapacitor;
let msgLog;
let msgResponse;

/**
 * @description delete an electrolytic capacitor from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteElectrolyticCapacitorService = async (req, res) => {
  try {
    deleteElectrolyticCapacitor = null;
    msg = null;
    params = null;
    idParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      idParam = params.id ? params.id : idParam;
    }
    //-- end with params  ---

    if (ElectrolycticCapacitor != null && idParam != null) {
      await ElectrolycticCapacitor.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (electrolyticCapacitorItem) => {
          deleteElectrolyticCapacitor =
            electrolyticCapacitorItem == 1
              ? {
                  objectDeleted: DELETE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectDeleted: DELETE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = DELETE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          deleteElectrolyticCapacitor = await checkErrors(error, error.name);
        });
    } else {
      deleteElectrolyticCapacitor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = DELETE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    deleteElectrolyticCapacitor = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return deleteElectrolyticCapacitor;
};

module.exports = {
  deleteElectrolyticCapacitorService,
}; 