//External
require('dotenv').config();
//Services
const {
  getBipolarTransistorByIdService,
} = require('../../services/bipolar-transistor/get-by-id');
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
const GET_BY_ID_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'ERROR in getBipolarTransistorByIdController() function.';
const GET_BY_ID_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL =
  'Bad request, could not get bipolar transistor with the requested id. Check if the bipolar transistor exist into the database.';
const GET_BY_ID_BIPOLAR_TRANSISTOR_NOT_FOUND_DETAIL =
  'No bipolar transistor found according to the id.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description get bipolar transistor based id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getBipolarTransistorByIdController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    bipolarTransistor = await getBipolarTransistorByIdService(req);

    switch (bipolarTransistor) {
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
          error: GET_BY_ID_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          typeof bipolarTransistor === 'object' &&
          bipolarTransistor.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(bipolarTransistor);
          break;
        } else if (
          typeof bipolarTransistor === 'object' &&
          Object.keys(bipolarTransistor).length == 0
        ) {
          res.status(OK_CODE).send({ ok: GET_BY_ID_BIPOLAR_TRANSISTOR_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: bipolarTransistor });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_BY_ID_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getBipolarTransistorByIdController,
}; 