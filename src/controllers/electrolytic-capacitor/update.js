//External
require('dotenv').config();
//Services
const {
  updateElectrolyticCapacitorService,
} = require('../../services/electrolytic-capacitor/update');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
//Const
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
const UPDATE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'ERROR in updateElectrolyticCapacitorController() function.';
const UPDATE_ELECTROLYTIC_CAPACITOR_BAD_REQUEST_DETAIL =
  'Bad request, could not update an electrolytic capacitor.';
//Vars
let updateElectrolyticCapacitor;
let msgResponse;
let msgLog;

/**
 * @description update an electrolytic capacitor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateElectrolyticCapacitorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    updateElectrolyticCapacitor = await updateElectrolyticCapacitorService(req);
    console.log(updateElectrolyticCapacitor);

    switch (updateElectrolyticCapacitor) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case 0:
      case undefined:
      case null:
        res
          .status(BAD_REQUEST_CODE)
          .send({ error: UPDATE_ELECTROLYTIC_CAPACITOR_BAD_REQUEST_DETAIL });
        break;
      default:
        if (
          typeof updateElectrolyticCapacitor === 'object' &&
          updateElectrolyticCapacitor.hasOwnProperty('objectUpdated')
        ) {
          res.status(OK_CODE).send(updateElectrolyticCapacitor);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: updateElectrolyticCapacitor });
        break;
    }
  } catch (error) {
    msgResponse = UPDATE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  updateElectrolyticCapacitorController,
}; 