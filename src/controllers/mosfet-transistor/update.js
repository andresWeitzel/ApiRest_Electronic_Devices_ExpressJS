//External
require('dotenv').config();
//Services
const {
  updateMosfetTransistorService,
} = require('../../services/mosfet-transistor/update');
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
const UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in updateMosfetTransistorController() function.';
const UPDATE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not update mosfet transistor.';
//Vars
let updatedMosfetTransistor;
let msgResponse;
let msgLog;

/**
 * @description update a mosfet transistor in database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateMosfetTransistorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    updatedMosfetTransistor = await updateMosfetTransistorService(req);

    switch (updatedMosfetTransistor) {
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
          error: UPDATE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          typeof updatedMosfetTransistor === 'object' &&
          updatedMosfetTransistor.hasOwnProperty('id_componente')
        ) {
          res.status(OK_CODE).send(updatedMosfetTransistor);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: updatedMosfetTransistor });
        break;
    }
  } catch (error) {
    msgResponse = UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  updateMosfetTransistorController,
}; 