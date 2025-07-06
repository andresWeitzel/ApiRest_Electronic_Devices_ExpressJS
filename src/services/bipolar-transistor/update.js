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
    
    // Only assign values if they are provided in the request body
    if (reqBody.hasOwnProperty('id_componente')) {
      idComponenteParam = reqBody.id_componente;
    }
    if (reqBody.hasOwnProperty('tipo')) {
      tipoParam = reqBody.tipo;
    }
    if (reqBody.hasOwnProperty('voltaje_colec_emis')) {
      voltajeColecEmisParam = reqBody.voltaje_colec_emis;
    }
    if (reqBody.hasOwnProperty('voltaje_colec_base')) {
      voltajeColecBaseParam = reqBody.voltaje_colec_base;
    }
    if (reqBody.hasOwnProperty('voltaje_emis_base')) {
      voltajeEmisBaseParam = reqBody.voltaje_emis_base;
    }
    if (reqBody.hasOwnProperty('voltaje_colec_emis_sat')) {
      voltajeColecEmisSatParam = reqBody.voltaje_colec_emis_sat;
    }
    if (reqBody.hasOwnProperty('corriente_colec')) {
      corrienteColecParam = reqBody.corriente_colec;
    }
    if (reqBody.hasOwnProperty('ganancia_hfe')) {
      gananciaHfeParam = reqBody.ganancia_hfe;
    }
    if (reqBody.hasOwnProperty('disip_max')) {
      disipMaxParam = reqBody.disip_max;
    }
    if (reqBody.hasOwnProperty('temp_juntura')) {
      tempJuntParam = reqBody.temp_juntura;
    }
    //-- end with body ---

    if (BipolarTransistor != null && idParam != null) {
      // Build update object only with provided values (including null values if explicitly provided)
      const updateData = {};
      
      if (reqBody.hasOwnProperty('id_componente')) updateData.id_componente = idComponenteParam;
      if (reqBody.hasOwnProperty('tipo')) updateData.tipo = tipoParam;
      if (reqBody.hasOwnProperty('voltaje_colec_emis')) updateData.voltaje_colec_emis = voltajeColecEmisParam;
      if (reqBody.hasOwnProperty('voltaje_colec_base')) updateData.voltaje_colec_base = voltajeColecBaseParam;
      if (reqBody.hasOwnProperty('voltaje_emis_base')) updateData.voltaje_emis_base = voltajeEmisBaseParam;
      if (reqBody.hasOwnProperty('voltaje_colec_emis_sat')) updateData.voltaje_colec_emis_sat = voltajeColecEmisSatParam;
      if (reqBody.hasOwnProperty('corriente_colec')) updateData.corriente_colec = corrienteColecParam;
      if (reqBody.hasOwnProperty('ganancia_hfe')) updateData.ganancia_hfe = gananciaHfeParam;
      if (reqBody.hasOwnProperty('disip_max')) updateData.disip_max = disipMaxParam;
      if (reqBody.hasOwnProperty('temp_juntura')) updateData.temp_juntura = tempJuntParam;

      // Only update if there are fields to update
      if (Object.keys(updateData).length === 0) {
        updateBipolarTransistor = {
          objectUpdated: 'No fields to update provided',
        };
        return updateBipolarTransistor;
      }

      await BipolarTransistor.update(
        updateData,
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
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return updateBipolarTransistor;
};

module.exports = {
  updateBipolarTransistorService,
};
