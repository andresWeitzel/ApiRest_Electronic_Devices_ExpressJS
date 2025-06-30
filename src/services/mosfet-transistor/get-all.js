//External
require('dotenv').config();
//Database
const { dbConnection } = require('../../db/config');
//Models
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
const { Component } = require('../../models/sequelize/component');
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
const GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in getAllMosfetTransistorService() function.';
const GET_ALL_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not get mosfet transistors.';
//Vars
let mosfetTransistors;
let msgResponse;
let msgLog;

/**
 * @description get all mosfet transistors from database
 * @param {any} req any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllMosfetTransistorService = async (req) => {
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

    // Get all mosfet transistors with component information
    mosfetTransistors = await MosfetTransistor.findAll({
      include: [
        {
          model: Component,
          as: 'component',
          attributes: ['id', 'codigo', 'imagen', 'nro_pieza', 'categoria', 'descripcion', 'fabricante', 'stock', 'precio']
        }
      ]
    });

    return mosfetTransistors;

  } catch (error) {
    msgResponse = GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  getAllMosfetTransistorService,
}; 