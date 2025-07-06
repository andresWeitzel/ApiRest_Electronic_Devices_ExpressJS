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
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL = statusDetails.CONNECTION_REFUSED_DETAIL;
const UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in updateMosfetTransistorService() function.';
const UPDATE_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not update mosfet transistor.';
//errors details
const UPDATE_OBJECT_DETAILS =
  'Mosfet Transistor has been successfully updated based on id ';
const UPDATE_OBJECT_ERROR_DETAILS =
  'Check if the mosfet transistor you want to updated exists in the db. The mosfet transistor has not been updated based on the id ';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let updatedMosfetTransistor;
let msgResponse;
let msgLog;
let updateMosfetTransistor;
let idComponenteParam;
let tipoParam;
let voltajeDrenajeFuenteParam;
let corrienteCcDrenajeParam;
let disipMaxParam;
let tempOpMaxParam;
let conductDrenajeSustratoParam;
let resistDrenajeFuenteParam;
let reqBody;
let idParam;
let params;

/**
 * @description update a mosfet transistor in database
 * @param {any} req any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateMosfetTransistorService = async (req, res) => {
  try {
    updateMosfetTransistor = null;
    reqBody = null;
    idComponenteParam = null;
    idParam = null;
    tipoParam = null;
    voltajeDrenajeFuenteParam = null;
    corrienteCcDrenajeParam = null;
    disipMaxParam = null;
    tempOpMaxParam = null;
    conductDrenajeSustratoParam = null;
    resistDrenajeFuenteParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params == (null || undefined)) {
      return null;
    }

    idParam = params.id ? params.id : idParam;
    //-- end with params  ---

    //-- start with body ---
    reqBody = req.body;
    if (reqBody == (null || undefined)) {
      return null;
    }
    
    // Only assign values if they are provided in the request body
    if (reqBody.hasOwnProperty('id_componente')) {
      idComponenteParam = reqBody.id_componente;
    }
    if (reqBody.hasOwnProperty('tipo')) {
      tipoParam = reqBody.tipo;
    }
    if (reqBody.hasOwnProperty('voltaje_drenaje_fuente')) {
      voltajeDrenajeFuenteParam = reqBody.voltaje_drenaje_fuente;
    }
    if (reqBody.hasOwnProperty('corriente_cc_drenaje')) {
      corrienteCcDrenajeParam = reqBody.corriente_cc_drenaje;
    }
    if (reqBody.hasOwnProperty('disip_max')) {
      disipMaxParam = reqBody.disip_max;
    }
    if (reqBody.hasOwnProperty('temp_op_max')) {
      tempOpMaxParam = reqBody.temp_op_max;
    }
    if (reqBody.hasOwnProperty('conduct_drenaje_sustrato')) {
      conductDrenajeSustratoParam = reqBody.conduct_drenaje_sustrato;
    }
    if (reqBody.hasOwnProperty('resist_drenaje_fuente')) {
      resistDrenajeFuenteParam = reqBody.resist_drenaje_fuente;
    }
    //-- end with body ---

    if (MosfetTransistor != null && idParam != null) {
      // Build update object only with provided values (including null values if explicitly provided)
    const updateData = {};
      
      if (reqBody.hasOwnProperty('id_componente')) updateData.id_componente = idComponenteParam;
      if (reqBody.hasOwnProperty('tipo')) updateData.tipo = tipoParam;
      if (reqBody.hasOwnProperty('voltaje_drenaje_fuente')) updateData.voltaje_drenaje_fuente = voltajeDrenajeFuenteParam;
      if (reqBody.hasOwnProperty('corriente_cc_drenaje')) updateData.corriente_cc_drenaje = corrienteCcDrenajeParam;
      if (reqBody.hasOwnProperty('disip_max')) updateData.disip_max = disipMaxParam;
      if (reqBody.hasOwnProperty('temp_op_max')) updateData.temp_op_max = tempOpMaxParam;
      if (reqBody.hasOwnProperty('conduct_drenaje_sustrato')) updateData.conduct_drenaje_sustrato = conductDrenajeSustratoParam;
      if (reqBody.hasOwnProperty('resist_drenaje_fuente')) updateData.resist_drenaje_fuente = resistDrenajeFuenteParam;

      // Only update if there are fields to update
      if (Object.keys(updateData).length === 0) {
        updateMosfetTransistor = {
          objectUpdated: 'No fields to update provided',
        };
        return updateMosfetTransistor;
      }

      await MosfetTransistor.update(
        updateData,
        {
          where: {
            id: idParam,
          },
        },
      )
        .then(async (mosfetTransistorItem) => {
          updateMosfetTransistor =
            mosfetTransistorItem[0] == 1
            ? {
              objectUpdated: UPDATE_OBJECT_DETAILS + idParam,
            }
          : {
              objectUpdated: UPDATE_OBJECT_ERROR_DETAILS + idParam,
            };
        })
        .catch(async (error) => {
          msgResponse = UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          updateMosfetTransistor = await checkErrors(error, error.name);
        });
    } else {
      updateMosfetTransistor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = UPDATE_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    updateMosfetTransistor = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return updateMosfetTransistor;
};

module.exports = {
  updateMosfetTransistorService,
}; 