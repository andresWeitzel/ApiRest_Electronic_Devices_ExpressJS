//Models
const {
  BipolarTransistor,
} = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
//Helpers
const { checkErrors } = require('../../helpers/sequelize/errors');
//const
const GENERIC_ERROR_LOG_MESSAGE =
  'Error in createBipolarTransistorService function. Caused by ';
//vars
let newBipolarTransistor;
let idComponenteParam;
let tipoParam;
let voltajeColecEmisParam;
let voltajeColecBaseParam;
let voltajeEmisBaseParam;
let voltajeColecEmisSatParam;
let corrienteColecParam;
let gananciaHfeParam;
let disipMaxParam;
let tempJuntParam;
let reqBody;
let msgLog;

//Updated here

/**
 * @description create a bipolar-transistor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createBipolarTransistorService = async (req, res) => {
  try {
    newBipolarTransistor = null;
    reqBody = null;
    idComponenteParam = null;
    tipoParam = null;
    voltajeColecEmisParam = null;
    voltajeColecBaseParam = null;
    voltajeEmisBaseParam = null;
    voltajeColecEmisSatParam = null;
    corrienteColecParam = null;
    gananciaHfeParam = null;
    disipMaxParam = null;
    tempJuntParam = null;
    msgLog = null;

    //-- start with body ---
    reqBody = req.body;
    if (reqBody == (null || undefined)) {
      return null;
    }
    idComponenteParam = reqBody.id_componente
      ? reqBody.id_componente
      : idComponenteParam;
    tipoParam = reqBody.tipo ? reqBody.tipo : tipoParam;
    voltajeColecEmisParam = reqBody.voltaje_colec_emis
      ? reqBody.voltaje_colec_emis
      : voltajeColecEmisParam;
    voltajeColecBaseParam = reqBody.voltaje_colec_base_param
      ? reqBody.voltaje_colec_base_param
      : voltajeColecBaseParam;
    voltajeEmisBaseParam = reqBody.voltaje_emis_base
      ? reqBody.voltaje_emis_base
      : voltajeEmisBaseParam;
    voltajeColecEmisSatParam = reqBody.voltaje_colec_emis_sat
      ? reqBody.voltaje_colec_emis_sat
      : voltajeColecEmisSatParam;
    corrienteColecParam = reqBody.corriente_colec
      ? reqBody.corriente_colec
      : corrienteColecParam;
    gananciaHfeParam = reqBody.ganancia_hfe
      ? reqBody.ganancia_hfe
      : gananciaHfeParam;
    disipMaxParam = reqBody.disip_max ? reqBody.disip_max : disipMaxParam;
    tempJuntParam = reqBody.temp_juntura ? reqBody.temp_juntura : tempJuntParam;
    //-- end with body ---

    if (BipolarTransistor != (null && undefined)) {
      await BipolarTransistor.create({
        id_componente: idComponenteParam,
        tipo: tipoParam,
        voltaje_colec_emis: voltajeColecEmisParam,
        voltaje_colec_base_param: voltajeColecBaseParam,
        voltaje_emis_base: voltajeEmisBaseParam,
        voltaje_colec_emis_sat: voltajeColecEmisSatParam,
        corriente_colec: corrienteColecParam,
        ganancia_hfe: gananciaHfeParam,
        disip_max: disipMaxParam,
        temp_juntura: tempJuntParam,
      })
        .then(async (object) => {
          newBipolarTransistor = object.dataValues;
        })
        .catch(async (error) => {
          msgLog = GENERIC_ERROR_LOG_MESSAGE + error;
          console.log(msgLog);
          newBipolarTransistor = await checkErrors(error, error.name);
        });
    } else {
      newBipolarTransistor = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msgLog = GENERIC_ERROR_LOG_MESSAGE + error;
    console.log(msgLog);
    newBipolarTransistor = await checkErrors(
      error,
      statusName.CONNECTION_ERROR,
    );
  }
  return newBipolarTransistor;
};

module.exports = {
  createBipolarTransistorService,
};
