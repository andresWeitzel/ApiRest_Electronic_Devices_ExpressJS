//External
require('dotenv').config();
//Services
const {
  getAllWithAttributesMosfetTransistorService,
} = require('../../services/mosfet-transistor/get-all-with-attributes');
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
const CONNECTION_REFUSED_STATUS_DETAIL = statusDetails.CONNECTION_REFUSED_DETAIL;
const GET_ALL_WITH_ATTRIBUTES_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in getAllWithAttributesMosfetTransistorController() function.';
const GET_ALL_WITH_ATTRIBUTES_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not get mosfet transistors with attributes.';
//Vars
let mosfetTransistors;
let msgResponse;
let msgLog;

/**
 * @description get all mosfet transistors with specific attributes from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesMosfetTransistorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    mosfetTransistors = await getAllWithAttributesMosfetTransistorService(req);

    switch (mosfetTransistors) {
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
        res.status(BAD_REQUEST_CODE).send({
          error: GET_ALL_WITH_ATTRIBUTES_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (Array.isArray(mosfetTransistors)) {
          res.status(OK_CODE).send(mosfetTransistors);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: mosfetTransistors });
        break;
    }
  } catch (error) {
    msgResponse = GET_ALL_WITH_ATTRIBUTES_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getAllWithAttributesMosfetTransistorController,
}; 