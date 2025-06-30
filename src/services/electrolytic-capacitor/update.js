//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors details
const UPDATE_OBJECT_DETAILS =
  'Electrolytic capacitor has been successfully updated based on id ';
const UPDATE_OBJECT_ERROR_DETAILS =
  'Check if the electrolytic capacitor you want to updated exists in the db. The electrolytic capacitor has not been updated based on the id ';
const UPDATE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in updateElectrolyticCapacitorService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let params;
let idParam;
let updateElectrolyticCapacitor;
let updateData;
let reqBody;
let msgLog;
let msgResponse;

/**
 * @description update an electrolytic capacitor to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateElectrolyticCapacitorService = async (req, res) => {
  try {
    idParam = null;
    updateElectrolyticCapacitor = null;
    updateData = {};
    reqBody = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params == (null || undefined)) {
      return null;
    }

    idParam = params?.id ? params.id : idParam;
    //-- end with params  ---

    //-- start with body ---
    reqBody = req.body;
    if (reqBody == (null || undefined)) {
      return null;
    }

    // Only include fields that are provided in the request body
    if (reqBody.id_componente !== undefined) {
      updateData.id_componente = reqBody.id_componente;
    }
    if (reqBody.tipo !== undefined) {
      updateData.tipo = reqBody.tipo;
    }
    if (reqBody.capacitancia !== undefined) {
      updateData.capacitancia = reqBody.capacitancia;
    }
    if (reqBody.tolerancia !== undefined) {
      updateData.tolerancia = reqBody.tolerancia;
    }
    if (reqBody.rango_temperatura !== undefined) {
      updateData.rango_temperatura = reqBody.rango_temperatura;
    }
    if (reqBody.rango_tension_nominal !== undefined) {
      updateData.rango_tension_nominal = reqBody.rango_tension_nominal;
    }

    //-- end with body ---

    if (ElectrolycticCapacitor != null && idParam != null && Object.keys(updateData).length > 0) {
      await ElectrolycticCapacitor.update(
        updateData,
        {
          where: {
            id: idParam,
          },
        },
      )
        .then(async (electrolyticCapacitorItem) => {
          updateElectrolyticCapacitor =
            electrolyticCapacitorItem[0] == 1
              ? {
                  objectUpdated: UPDATE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectUpdated: UPDATE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = UPDATE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          updateElectrolyticCapacitor = await checkErrors(error, error.name);
        });
    } else {
      updateElectrolyticCapacitor = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = UPDATE_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    updateElectrolyticCapacitor = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return updateElectrolyticCapacitor;
};

module.exports = {
  updateElectrolyticCapacitorService,
}; 