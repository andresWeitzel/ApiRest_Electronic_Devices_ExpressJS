//External
require('dotenv').config();
//Services
const {
  getAllComponentWithAllModelsService,
} = require('../../services/component/get-all-with-models');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
const {
  paginationNameValueError,
  paginationDescriptionValueError,
} = require('../../enums/pagination/errors');
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
const GET_ALL_COMPONENT_ERROR_DETAIL =
  'ERROR in getAllWithAllModelsComponentController() function.';
const GET_ALL_COMPONENT_BAD_REQUEST_DETAIL =
  'Bad request, failed to get all paginated components list and bipolar_transistor according to all attributes.';
const GET_ALL_COMPONENT_NOT_FOUND_DETAIL =
  'No items found according to the all models.';
// Pagination
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const ORDER_BY_DESCRIPTION_VALUE_ERROR =
  paginationDescriptionValueError.ORDER_BY_DESCRIPTION_VALUE_ERROR;
const ORDER_AT_DESCRIPTION_VALUE_ERROR =
  paginationDescriptionValueError.ORDER_AT_DESCRIPTION_VALUE_ERROR;
//Vars
let msgResponse;
let msgLog;

/**
 * @description get all paginated components list with all models/table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAllModelsComponentController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentList = await getAllComponentWithAllModelsService(req);

    switch (componentList) {
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
      case ORDER_BY_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_BY_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case ORDER_AT_NAME_VALUE_ERROR:
        res.status(BAD_REQUEST_CODE).send({
          error: ORDER_AT_DESCRIPTION_VALUE_ERROR,
        });
        break;
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error: GET_ALL_COMPONENT_BAD_REQUEST_DETAIL,
        });
        break;
      default:
        if (
          (typeof componentList === 'object' &&
            componentList[0]?.hasOwnProperty('id')) ||
          (Array.isArray(componentList) && componentList.length)
        ) {
          res.status(OK_CODE).send(componentList);
          break;
        } else if (
          (typeof componentList === 'object' &&
            Object.keys(componentList).length == 0) ||
          (Array.isArray(componentList) && componentList.length == 0)
        ) {
          res.status(OK_CODE).send({ ok: GET_ALL_COMPONENT_NOT_FOUND_DETAIL });
        } else {
          res.status(BAD_REQUEST_CODE).send({ error: componentList });
          break;
        }
    }
  } catch (error) {
    msgResponse = GET_ALL_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  getAllWithAllModelsComponentController,
};
