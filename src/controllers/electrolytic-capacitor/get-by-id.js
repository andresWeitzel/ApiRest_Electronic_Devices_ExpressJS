//External
require('dotenv').config();
//Services
const {
  getElectrolyticCapacitorByIdService,
} = require('../../services/electrolytic-capacitor/get-by-id');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
//Const
//status-code
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
const GET_BY_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'ERROR in getElectrolyticCapacitorByIdController() function.';
const GET_BY_ID_ELECTROLYTIC_CAPACITOR_BAD_REQUEST_DETAIL =
  'Bad request, could not get an electrolytic capacitor with the requested id. Check if the electrolytic capacitor exist into the database.';
const GET_BY_ID_ELECTROLYTIC_CAPACITOR_NOT_FOUND_DETAIL =
  'No items found according to the id.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description get an electrolytic capacitor based its id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getElectrolyticCapacitorByIdController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    electrolyticCapacitorList = await getElectrolyticCapacitorByIdService(req);

    switch (electrolyticCapacitorList) {
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
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error: GET_BY_ID_ELECTROLYTIC_CAPACITOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          (typeof electrolyticCapacitorList === 'object' &&
            electrolyticCapacitorList.hasOwnProperty('id')) ||
          (Array.isArray(electrolyticCapacitorList) && electrolyticCapacitorList.length)
        ) {
          res.status(OK_CODE).send(electrolyticCapacitorList);
          break;
        } else if (
          (typeof electrolyticCapacitorList === 'object' &&
            Object.keys(electrolyticCapacitorList).length == 0) ||
          (Array.isArray(electrolyticCapacitorList) && electrolyticCapacitorList.length == 0)
        ) {
          res.status(OK_CODE).send({ ok: GET_BY_ID_ELECTROLYTIC_CAPACITOR_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: electrolyticCapacitorList });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_BY_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getElectrolyticCapacitorByIdController,
}; 