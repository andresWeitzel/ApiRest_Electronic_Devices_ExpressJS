//External
require('dotenv').config();
//Services
const {
  getAllBipolarTransistorLikeVoltajeEmisBaseService,
} = require('../../services/bipolar-transistor/get-all-like-voltaje-emis-base');
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
const GET_ALL_LIKE_VOLTAJE_EMIS_BASE_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'ERROR in getAllBipolarTransistorLikeVoltajeEmisBaseController() function.';
const GET_ALL_LIKE_VOLTAJE_EMIS_BASE_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL =
  'Bad request, could not get bipolar transistors with the requested voltaje_emis_base. Check if the voltaje_emis_base exist into the database.';
const GET_ALL_LIKE_VOLTAJE_EMIS_BASE_BIPOLAR_TRANSISTOR_NOT_FOUND_DETAIL =
  'No bipolar transistors found according to the voltaje_emis_base.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description get bipolar transistors based voltaje_emis_base from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllBipolarTransistorLikeVoltajeEmisBaseController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    bipolarTransistorList = await getAllBipolarTransistorLikeVoltajeEmisBaseService(req);

    switch (bipolarTransistorList) {
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
          error: GET_ALL_LIKE_VOLTAJE_EMIS_BASE_BIPOLAR_TRANSISTOR_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          (typeof bipolarTransistorList === 'object' &&
            bipolarTransistorList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(bipolarTransistorList) && bipolarTransistorList.length)
        ) {
          res.status(OK_CODE).send(bipolarTransistorList);
          break;
        } else if (
          (typeof bipolarTransistorList === 'object' &&
            Object.keys(bipolarTransistorList).length == 0) ||
          (Array.isArray(bipolarTransistorList) && bipolarTransistorList.length == 0)
        ) {
          res.status(OK_CODE).send({ ok: GET_ALL_LIKE_VOLTAJE_EMIS_BASE_BIPOLAR_TRANSISTOR_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: bipolarTransistorList });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_ALL_LIKE_VOLTAJE_EMIS_BASE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getAllBipolarTransistorLikeVoltajeEmisBaseController,
}; 