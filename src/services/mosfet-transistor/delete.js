//External
require('dotenv').config();
//Database
const { dbConnection } = require('../../db/config');
//Models
const {
  MosfetTransistor,
} = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL = statusDetails.CONNECTION_REFUSED_DETAIL;
const DELETE_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in deleteMosfetTransistorService() function.';
const DELETE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not delete mosfet transistor.';
const DELETE_OBJECT_DETAILS = 'Mosfet Transistor has been successfully removed based on id ';
const DELETE_OBJECT_ERROR_DETAILS = 'Check if the Mosfet Transistor you want to remove exists in the db. The Mosfet Transistor has not been removed based on the id ';
//Vars
let params;
let idParam;
let deleteMosfetTransistor;
let msgLog;
let msgResponse;

/**
 * @description delete a mosfet transistor from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteMosfetTransistorService = async (req, res) => {
  try {
    deleteMosfetTransistor = null;
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

    if (MosfetTransistor != null && idParam != null) {
      await MosfetTransistor.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (mosfetTransistorItem) => {
          deleteMosfetTransistor =
            mosfetTransistorItem == 1
              ? {
                  objectDeleted: DELETE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectDeleted: DELETE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = DELETE_MOSFET_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          deleteMosfetTransistor = await checkErrors(error, error.name);
        });
    } else {
      deleteMosfetTransistor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS,
      );
    }
  } catch (error) {
    msgResponse = DELETE_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    deleteMosfetTransistor = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS,
    );
  }
  return deleteMosfetTransistor;
};

module.exports = {
  deleteMosfetTransistorService,
}; 