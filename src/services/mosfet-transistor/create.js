//External
require('dotenv').config();
//Database
const { dbConnection } = require('../../db/config');
//Models
const {
  MosfetTransistor,
} = require('../../models/sequelize/mosfet-transistor');
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
const ADD_MOSFET_TRANSISTOR_ERROR_DETAIL = 'Error in createMosfetTransistorService function. Caused by ';
const ADD_MOSFET_TRANSISTOR_BAD_REQUEST_DETAIL = 'Bad request, could not add a mosfet transistor.';
//Vars
let newMosfetTransistor;
let idComponenteParam;
let tipoParam;
let voltajeDrenajeFuenteParam;
let corrienteCcDrenajeParam;
let disipMaxParam;
let tempOpMaxParam;
let conductDrenajeSustratoParam;
let resistDrenajeFuenteParam;
let reqBody;
let msgLog;
let msgResponse;

/**
 * @description create a mosfet-transistor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createMosfetTransistorService = async (req, res) => {
  try {
    newMosfetTransistor = null;
    reqBody = null;
    idComponenteParam = null;
    tipoParam = null;
    voltajeDrenajeFuenteParam = null;
    corrienteCcDrenajeParam = null;
    disipMaxParam = null;
    tempOpMaxParam = null;
    conductDrenajeSustratoParam = null;
    resistDrenajeFuenteParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with body ---
    reqBody = req.body;
    if (reqBody == (null || undefined)) {
      return null;
    }
    idComponenteParam = reqBody.id_componente
      ? reqBody.id_componente
      : idComponenteParam;
    tipoParam = reqBody.tipo ? reqBody.tipo : tipoParam;
    voltajeDrenajeFuenteParam = reqBody.voltaje_drenaje_fuente
      ? reqBody.voltaje_drenaje_fuente
      : voltajeDrenajeFuenteParam;
    corrienteCcDrenajeParam = reqBody.corriente_cc_drenaje
      ? reqBody.corriente_cc_drenaje
      : corrienteCcDrenajeParam;
    disipMaxParam = reqBody.disip_max ? reqBody.disip_max : disipMaxParam;
    tempOpMaxParam = reqBody.temp_op_max ? reqBody.temp_op_max : tempOpMaxParam;
    conductDrenajeSustratoParam = reqBody.conduct_drenaje_sustrato
      ? reqBody.conduct_drenaje_sustrato
      : conductDrenajeSustratoParam;
    resistDrenajeFuenteParam = reqBody.resist_drenaje_fuente
      ? reqBody.resist_drenaje_fuente
      : resistDrenajeFuenteParam;
    //-- end with body ---

    if (MosfetTransistor != (null && undefined)) {
      await MosfetTransistor.create({
        id_componente: idComponenteParam,
        tipo: tipoParam,
        voltaje_drenaje_fuente: voltajeDrenajeFuenteParam,
        corriente_cc_drenaje: corrienteCcDrenajeParam,
        disip_max: disipMaxParam,
        temp_op_max: tempOpMaxParam,
        conduct_drenaje_sustrato: conductDrenajeSustratoParam,
        resist_drenaje_fuente: resistDrenajeFuenteParam,
      })
        .then(async (object) => {
          newMosfetTransistor = object.dataValues;
        })
        .catch(async (error) => {
          msgResponse = ADD_MOSFET_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);
          newMosfetTransistor = await checkErrors(error, error.name);
        });
    } else {
      newMosfetTransistor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS,
      );
    }
  } catch (error) {
    msgLog = ADD_MOSFET_TRANSISTOR_ERROR_DETAIL + error;
    console.log(msgLog);
    newMosfetTransistor = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS,
    );
  }
  return newMosfetTransistor;
};

module.exports = {
  createMosfetTransistorService,
}; 