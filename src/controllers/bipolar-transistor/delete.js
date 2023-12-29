//External
require('dotenv').config();
//Services
const {
  deleteBipolarTransistorService,
} = require('../../services/bipolar-transistor/delete');
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
const DELETE_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in deleteBipolarTransistorController() function.';
const DELETE_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL =
  'Bad request, could not delete a bipolar transistor.';
//Vars
let deletedBipolarTransistor;
let msgResponse;
let msgLog;

/**
 * @description delete a bipolar transistor from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteBipolarTransistorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    deletedBipolarTransistor = await deleteBipolarTransistorService(req);

    switch (deletedBipolarTransistor) {
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
          .send({ error: DELETE_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL });
        break;
      default:
        if (
          typeof deletedBipolarTransistor === 'object' &&
          deletedBipolarTransistor.hasOwnProperty('objectDeleted')
        ) {
          res.status(OK_CODE).send(deletedBipolarTransistor);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: deletedBipolarTransistor });
        break;
    }
  } catch (error) {
    msgResponse = DELETE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  deleteBipolarTransistorController,
};
