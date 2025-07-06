//External
require('dotenv').config();
//Services
const {
  getAllMosfetTransistorLikeDisipMaxService,
} = require('../../services/mosfet-transistor/get-all-like-disip-max');
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
const GET_ALL_LIKE_DISIP_MAX_MOSFET_TRANSISTOR_ERROR_DETAIL =
  'ERROR in getAllMosfetTransistorLikeDisipMaxController() function.';
const GET_ALL_LIKE_DISIP_MAX_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL =
  'Bad request, could not get mosfet transistors with the requested disip max. Check if the disip max exist into the database.';
const GET_ALL_LIKE_DISIP_MAX_MOSFET_TRANSISTOR_NOT_FOUND_DETAIL =
  'No mosfet transistors found according to the disip max.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description get mosfet transistors based disip max from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllMosfetTransistorLikeDisipMaxController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    mosfetTransistorList = await getAllMosfetTransistorLikeDisipMaxService(req);

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
          error: GET_ALL_LIKE_DISIP_MAX_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL,
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
          res.status(OK_CODE).send({ ok: GET_ALL_LIKE_DISIP_MAX_MOSFET_TRANSISTOR_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: mosfetTransistorList });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_ALL_LIKE_DISIP_MAX_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getAllMosfetTransistorLikeDisipMaxController,
}; 