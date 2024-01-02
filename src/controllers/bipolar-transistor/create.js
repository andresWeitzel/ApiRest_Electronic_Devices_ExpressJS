//External
require('dotenv').config();
//Services
const {
  createBipolarTransistorService,
} = require('../../services/bipolar-transistor/create');
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
const ADD_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in createBipolarTransistorController() function.';
const ADD_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL =
  'Bad request, could not add a bipolar transistor.';
//Vars
// Pagination
let newBipolarTransistor;
let msgResponse;
let msgLog;

/**
 * @description create a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createBipolarTransistorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    newBipolarTransistor = await createBipolarTransistorService(req);

    switch (newBipolarTransistor) {
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
          error: ADD_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          typeof newBipolarTransistor === 'object' &&
          newBipolarTransistor.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(newBipolarTransistor);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: newBipolarTransistor });
        break;
    }
  } catch (error) {
    msgResponse = ADD_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  createBipolarTransistorController,
};
