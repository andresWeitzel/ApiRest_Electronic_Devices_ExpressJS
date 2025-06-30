//External
require('dotenv').config();
//Services
const {
  getAllComponentDetailLikeVoltajeMaxEntradaService,
} = require('../../services/component-detail/get-all-like-voltaje-max-entrada');
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
const GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL =
  'ERROR in getAllComponentDetailLikeVoltajeMaxEntradaController() function.';
const GET_ALL_COMPONENT_DETAIL_BAD_REQUEST_DETAIL =
  'Bad request, could not get component details with the requested maximum input voltage.';
const GET_ALL_COMPONENT_DETAIL_NOT_FOUND_DETAIL =
  'No component details found with the specified maximum input voltage.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description get all component details based on maximum input voltage from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentDetailLikeVoltajeMaxEntradaController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentDetailList = await getAllComponentDetailLikeVoltajeMaxEntradaService(req);

    switch (componentDetailList) {
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
          error: GET_ALL_COMPONENT_DETAIL_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          (typeof componentDetailList === 'object' &&
            componentDetailList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentDetailList) && componentDetailList.length)
        ) {
          res.status(OK_CODE).send(componentDetailList);
          break;
        } else if (
          (typeof componentDetailList === 'object' &&
            Object.keys(componentDetailList).length == 0) ||
          (Array.isArray(componentDetailList) && componentDetailList.length == 0)
        ) {
          res.status(OK_CODE).send({ ok: GET_ALL_COMPONENT_DETAIL_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentDetailList });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getAllComponentDetailLikeVoltajeMaxEntradaController,
}; 