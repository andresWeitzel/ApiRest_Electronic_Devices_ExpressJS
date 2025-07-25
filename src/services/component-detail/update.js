//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors details
const UPDATE_OBJECT_DETAILS =
  'Component detail has been successfully updated based on id ';
const UPDATE_OBJECT_ERROR_DETAILS =
  'Check if the component detail you want to updated exists in the db. The component detail has not been updated based on the id ';
const UPDATE_COMPONENT_DETAIL_ERROR_DETAIL =
  'Error in updateComponentDetailService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let params;
let idParam;
let updateComponentDetail;
let updateData;
let reqBody;
let msgLog;
let msgResponse;

/**
 * @description update a component-detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentDetailService = async (req, res) => {
  try {
    idParam = null;
    updateComponentDetail = null;
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
    if (reqBody.hoja_de_datos !== undefined) {
      updateData.hoja_de_datos = reqBody.hoja_de_datos;
    }
    if (reqBody.longitud !== undefined) {
      updateData.longitud = reqBody.longitud;
    }
    if (reqBody.ancho !== undefined) {
      updateData.ancho = reqBody.ancho;
    }
    if (reqBody.peso !== undefined) {
      updateData.peso = reqBody.peso;
    }
    if (reqBody.material !== undefined) {
      updateData.material = reqBody.material;
    }
    if (reqBody.voltaje_recomendado !== undefined) {
      updateData.voltaje_recomendado = reqBody.voltaje_recomendado;
    }
    if (reqBody.voltaje_min_entrada !== undefined) {
      updateData.voltaje_min_entrada = reqBody.voltaje_min_entrada;
    }
    if (reqBody.voltaje_max_entrada !== undefined) {
      updateData.voltaje_max_entrada = reqBody.voltaje_max_entrada;
    }

    //-- end with body ---

    if (ComponentDetail != null && idParam != null && Object.keys(updateData).length > 0) {
      await ComponentDetail.update(
        updateData,
        {
          where: {
            id: idParam,
          },
        },
      )
        .then(async (componentDetailItem) => {
          updateComponentDetail =
            componentDetailItem[0] == 1
              ? {
                  objectUpdated: UPDATE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectUpdated: UPDATE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = UPDATE_COMPONENT_DETAIL_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          updateComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      updateComponentDetail = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = UPDATE_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    updateComponentDetail = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return updateComponentDetail;
};

module.exports = {
  updateComponentDetailService,
};
