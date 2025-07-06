//External
require('dotenv').config();
//Services
const {
  getAllMosfetTransistorLikeTempOpMaxService,
} = require('../../services/mosfet-transistor/get-all-like-temp-op-max');
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
const GET_ALL_LIKE_TEMP_OP_MAX_MOSFET_TRANSISTOR_ERROR_DETAIL =
  'ERROR in getAllMosfetTransistorLikeTempOpMaxController() function.';
const GET_ALL_LIKE_TEMP_OP_MAX_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL =
  'Bad request, could not get mosfet transistors with the requested temp op max. Check if the temp op max exist into the database.';
const GET_ALL_LIKE_TEMP_OP_MAX_MOSFET_TRANSISTOR_NOT_FOUND_DETAIL =
  'No mosfet transistors found according to the temp op max.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description get mosfet transistors based temp op max from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllMosfetTransistorLikeTempOpMaxController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    mosfetTransistorList = await getAllMosfetTransistorLikeTempOpMaxService(req);

    switch (mosfetTransistorList) {
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
          error: GET_ALL_LIKE_TEMP_OP_MAX_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          (typeof mosfetTransistorList === 'object' &&
            mosfetTransistorList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(mosfetTransistorList) && mosfetTransistorList.length)
        ) {
          res.status(OK_CODE).send(mosfetTransistorList);
          break;
        } else if (
          (typeof mosfetTransistorList === 'object' &&
            Object.keys(mosfetTransistorList).length == 0) ||
          (Array.isArray(mosfetTransistorList) && mosfetTransistorList.length == 0)
        ) {
          res.status(OK_CODE).send({ ok: GET_ALL_LIKE_TEMP_OP_MAX_MOSFET_TRANSISTOR_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: mosfetTransistorList });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_ALL_LIKE_TEMP_OP_MAX_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getAllMosfetTransistorLikeTempOpMaxController,
}; 