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
const ADD_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in createMosfetTransistorService() function.';
const ADD_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not add a mosfet transistor.';
//Vars
let newMosfetTransistor;
let msgResponse;
let msgLog;

/**
 * @description create a mosfet transistor to database
 * @param {any} req any type
 * @returns a json object with the transaction performed
 * @example
 */
const createMosfetTransistorService = async (req) => {
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

    // Extract data from request body
    const {
      id_componente,
      tipo,
      voltaje_drenaje_fuente,
      corriente_cc_drenaje,
      disip_max,
      temp_op_max,
      conduct_drenaje_sustrato,
      resist_drenaje_fuente
    } = req.body;

    // Validate required fields
    if (!id_componente || !tipo) {
      msgResponse = ADD_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL;
      msgLog = msgResponse;
      console.log(msgLog);
      return msgResponse;
    }

    // Check if component exists
    const existingComponent = await Component.findByPk(id_componente);
    if (!existingComponent) {
      msgResponse = 'Component not found';
      msgLog = msgResponse;
      console.log(msgLog);
      return msgResponse;
    }

    // Create mosfet transistor
    newMosfetTransistor = await MosfetTransistor.create({
      id_componente,
      tipo,
      voltaje_drenaje_fuente,
      corriente_cc_drenaje,
      disip_max,
      temp_op_max,
      conduct_drenaje_sustrato,
      resist_drenaje_fuente
    });

    return newMosfetTransistor;

  } catch (error) {
    msgResponse = ADD_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  createMosfetTransistorService,
}; 