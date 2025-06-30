//External
require('dotenv').config();
//Database
const { dbConnection } = require('../../db/config');
//Models
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName, statusDetails } = require('../../enums/database/status');
const { statusCode } = require('../../enums/http/status-code');
//Const
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL = statusDetails.CONNECTION_REFUSED_DETAIL;
const DELETE_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in deleteMosfetTransistorService() function.';
const DELETE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not delete mosfet transistor.';
//Vars
let msgResponse;
let msgLog;

/**
 * @description delete a mosfet transistor from database
 * @param {any} req any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteMosfetTransistorService = async (req) => {
  try {
    msgResponse = null;
    msgLog = null;

    // Check database connection
    if (!dbConnection) {
      msgResponse = CONNECTION_ERROR_STATUS;
      msgLog = CONNECTION_ERROR_STATUS_DETAIL;
      console.log(msgLog);
      return msgResponse;
    }

    // Check if database is connected
    try {
      await dbConnection.authenticate();
    } catch (error) {
      msgResponse = CONNECTION_REFUSED_STATUS;
      msgLog = CONNECTION_REFUSED_STATUS_DETAIL;
      console.log(msgLog);
      return msgResponse;
    }

    // Extract id from request
    const { id } = req.params;
    if (!id) {
      msgResponse = DELETE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL;
      msgLog = msgResponse;
      console.log(msgLog);
      return msgResponse;
    }

    // Find mosfet transistor
    const existingMosfetTransistor = await MosfetTransistor.findByPk(id);
    if (!existingMosfetTransistor) {
      msgResponse = 'Mosfet transistor not found';
      msgLog = msgResponse;
      console.log(msgLog);
      return msgResponse;
    }

    // Delete mosfet transistor
    await existingMosfetTransistor.destroy();
    return { message: 'Mosfet transistor deleted successfully' };

  } catch (error) {
    msgResponse = DELETE_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  deleteMosfetTransistorService,
}; 