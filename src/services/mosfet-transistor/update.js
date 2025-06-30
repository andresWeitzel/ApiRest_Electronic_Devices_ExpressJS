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
const UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in updateMosfetTransistorService() function.';
const UPDATE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not update mosfet transistor.';
//Vars
let updatedMosfetTransistor;
let msgResponse;
let msgLog;

/**
 * @description update a mosfet transistor in database
 * @param {any} req any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateMosfetTransistorService = async (req) => {
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

    // Extract data from request
    const { id } = req.params;
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
    if (!id) {
      msgResponse = UPDATE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL;
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

    // Check if component exists if id_componente is provided
    if (id_componente) {
      const existingComponent = await Component.findByPk(id_componente);
      if (!existingComponent) {
        msgResponse = 'Component not found';
        msgLog = msgResponse;
        console.log(msgLog);
        return msgResponse;
      }
    }

    // Prepare update data
    const updateData = {};
    if (id_componente !== undefined) updateData.id_componente = id_componente;
    if (tipo !== undefined) updateData.tipo = tipo;
    if (voltaje_drenaje_fuente !== undefined) updateData.voltaje_drenaje_fuente = voltaje_drenaje_fuente;
    if (corriente_cc_drenaje !== undefined) updateData.corriente_cc_drenaje = corriente_cc_drenaje;
    if (disip_max !== undefined) updateData.disip_max = disip_max;
    if (temp_op_max !== undefined) updateData.temp_op_max = temp_op_max;
    if (conduct_drenaje_sustrato !== undefined) updateData.conduct_drenaje_sustrato = conduct_drenaje_sustrato;
    if (resist_drenaje_fuente !== undefined) updateData.resist_drenaje_fuente = resist_drenaje_fuente;

    // Update mosfet transistor
    await existingMosfetTransistor.update(updateData);

    // Get updated mosfet transistor
    updatedMosfetTransistor = await MosfetTransistor.findByPk(id, {
      include: [
        {
          model: Component,
          as: 'component',
          attributes: ['id', 'codigo', 'imagen', 'nro_pieza', 'categoria', 'descripcion', 'fabricante', 'stock', 'precio']
        }
      ]
    });

    return updatedMosfetTransistor;

  } catch (error) {
    msgResponse = UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return msgResponse;
  }
};

module.exports = {
  updateMosfetTransistorService,
}; 