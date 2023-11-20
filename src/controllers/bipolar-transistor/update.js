//External
require('dotenv').config();
//Services
const {
  updateBipolarTransistorService,
} = require('../../services/bipolar-transistor/update');
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
let updateComponentDetail;
let msgResponse;
let msgLog;

/**
 * @description update a bipolar transistor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateBipolarTransistorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    updateComponentDetail = await updateBipolarTransistorService(req);

    switch (updateComponentDetail) {
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
          error:
            'Bad request, could not update a biplar transistor to database.',
        });
        break;
      default:
        if (
          typeof updateComponentDetail === 'object' &&
          updateComponentDetail.hasOwnProperty('objectUpdated')
        ) {
          res.status(OK_CODE).send(updateComponentDetail);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: updateComponentDetail });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in updateBipolarTransistorController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
  }
};

module.exports = {
  updateBipolarTransistorController,
};
