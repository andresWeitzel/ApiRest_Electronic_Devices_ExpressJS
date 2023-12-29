//Models
const {
  BipolarTransistor,
} = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors details
const UPDATE_OBJECT_DETAILS =
  'Bipolar Transistor has been successfully updated based on id ';
const UPDATE_OBJECT_ERROR_DETAILS =
  'Check if the bipolar transistor you want to updated exists in the db. The bipolar transistor has not been updated based on the id ';
const UPDATE_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in updateBipolarTransistorService service function.';
  //status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let updateBipolarTransistor;
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
let idParam;
let msgLog;
let msgResponse;

/**
 * @description update a bipolar transistor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateBipolarTransistorService = async (req, res) => {
  try {
    updateBipolarTransistor = null;
    reqBody = null;
    idComponenteParam = null;
    idParam = null;
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

    if (BipolarTransistor != null && idParam != null) {
      await BipolarTransistor.update(
        {
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
        },
        {
          where: {
            id: idParam,
          },
        },
      )
        .then(async (bipolarTransistorItem) => {
          updateBipolarTransistor =
            bipolarTransistorItem[0] == 1
            ? {
              objectUpdated: UPDATE_OBJECT_DETAILS + idParam,
            }
          : {
              objectUpdated: UPDATE_OBJECT_ERROR_DETAILS + idParam,
            };
        })
        .catch(async (error) => {
          msgResponse = UPDATE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          updateBipolarTransistor = await checkErrors(error, error.name);
        });
    } else {
      updateBipolarTransistor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = UPDATE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    updateBipolarTransistor = await checkErrors(
      error,
      CONNECTION_ERROR,
    );
  }
  return updateBipolarTransistor;
};

module.exports = {
  updateBipolarTransistorService,
};
