//Models
const {
  BipolarTransistor,
} = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors details
const DELETE_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in deleteBipolarTransistorService() function.';
const DELETE_OBJECT_DETAILS =
  'Bipolar Transistor has been successfully removed based on id ';
const DELETE_OBJECT_ERROR_DETAILS =
  'Check if the Bipolar Transistor you want to remove exists in the db. The Bipolar Transistor has not been removed based on the id ';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let params;
let idParam;
let deleteBipolarTransistor;
let msgLog;
let msgResponse;

/**
 * @description delete a bipolar transistor from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteBipolarTransistorService = async (req, res) => {
  try {
    deleteBipolarTransistor = null;
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

    if (BipolarTransistor != null && idParam != null) {
      await BipolarTransistor.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (bipolarTransistorItem) => {
          deleteBipolarTransistor =
            bipolarTransistorItem == 1
              ? {
                  objectDeleted: DELETE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectDeleted: DELETE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = DELETE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          deleteBipolarTransistor = await checkErrors(error, error.name);
        });
    } else {
      deleteBipolarTransistor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = DELETE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    deleteBipolarTransistor = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return deleteBipolarTransistor;
};

module.exports = {
  deleteBipolarTransistorService,
};
