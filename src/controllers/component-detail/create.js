//External
require('dotenv').config();
//Services
const {
  createComponentDetailService,
} = require('../../services/component-detail/create');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
//Const-vars
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
let newComponentDetail;
let msgResponse;
let msgLog;

/**
 * @description create a component detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createComponentDetailController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    newComponentDetail = await createComponentDetailService(req);

    switch (newComponentDetail) {
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
          error: 'Bad request, could not add a component detail to database.',
        });
        break;
      default:
        if (
          typeof newComponentDetail === 'object' &&
          newComponentDetail.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(newComponentDetail);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: newComponentDetail });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in addComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  createComponentDetailController,
};
