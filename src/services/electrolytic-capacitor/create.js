//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors
const ADD_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in createElectrolyticCapacitorService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let newElectrolyticCapacitor;
let idComponenteParam;
let tipoParam;
let capacitanciaParam;
let toleranciaParam;
let rangoTemperaturaParam;
let rangoTensionNominalParam;
let msgLog;
let msgResponse;

/**
 * @description create an electrolytic-capacitor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createElectrolyticCapacitorService = async (req, res) => {
  try {
    newElectrolyticCapacitor = null;
    idComponenteParam = null;
    tipoParam = null;
    capacitanciaParam = null;
    toleranciaParam = null;
    rangoTemperaturaParam = null;
    rangoTensionNominalParam = null;
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
    capacitanciaParam = reqBody.capacitancia
      ? reqBody.capacitancia
      : capacitanciaParam;
    toleranciaParam = reqBody.tolerancia
      ? reqBody.tolerancia
      : toleranciaParam;
    rangoTemperaturaParam = reqBody.rango_temperatura
      ? reqBody.rango_temperatura
      : rangoTemperaturaParam;
    rangoTensionNominalParam = reqBody.rango_tension_nominal
      ? reqBody.rango_tension_nominal
      : rangoTensionNominalParam;
    //-- end with body ---

    if (ElectrolycticCapacitor != (null && undefined)) {
      await ElectrolycticCapacitor.create({
        id_componente: idComponenteParam,
        tipo: tipoParam,
        capacitancia: capacitanciaParam,
        tolerancia: toleranciaParam,
        rango_temperatura: rangoTemperaturaParam,
        rango_tension_nominal: rangoTensionNominalParam,
      })
        .then(async (electrolyticCapacitorItem) => {
          newElectrolyticCapacitor = electrolyticCapacitorItem.dataValues;
        })
        .catch(async (error) => {
          msgResponse = ADD_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          newElectrolyticCapacitor = await checkErrors(error, error.name);
        });
    } else {
      newElectrolyticCapacitor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = ADD_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    newElectrolyticCapacitor = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return newElectrolyticCapacitor;
};

module.exports = {
  createElectrolyticCapacitorService,
}; 