//External
require('dotenv').config();
//Services
const { deleteComponentService } = require('../../services/component/delete');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
//Const-vars
//status-code
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
const DELETE_COMPONENT_ERROR_DETAIL =
  'Error in deleteComponentController() function. Caused by ';
// Pagination
let deletedComponent;
let msgResponse;
let msgLog;

/**
 * @description delete a component from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    deletedComponent = await deleteComponentService(req);

    switch (deletedComponent) {
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
          .send({ error: 'Bad request, could not delete a component.' });
        break;
      default:
        if (
          typeof deletedComponent === 'object' &&
          deletedComponent.hasOwnProperty('objectDeleted')
        ) {
          res.status(OK_CODE).send(deletedComponent);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: deletedComponent });
        break;
    }
  } catch (error) {
    msgResponse = DELETE_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + error;
    console.log(msgLog);

    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  deleteComponentController,
};
