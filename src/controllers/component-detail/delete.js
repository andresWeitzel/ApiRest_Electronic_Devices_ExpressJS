//External
require('dotenv').config();
//Services
const { deleteComponentDetailService } = require('../../services/component-detail/delete');
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
let deletedComponentDetail;
let msgResponse;
let msgLog;



/**
 * @description delete a component detail from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentDetailController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    deletedComponentDetail = await deleteComponentDetailService(req);

    switch (deletedComponentDetail) {
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
          .send({ error: 'Bad request, could not delete a component detail.' });
        break;
      default:
        if (
          typeof deletedComponentDetail === 'object' &&
          deletedComponentDetail.hasOwnProperty('objectDeleted')
        ) {
          res.status(OK_CODE).send(deletedComponentDetail);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: deletedComponentDetail });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in deleteComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports ={
    deleteComponentDetailController
}