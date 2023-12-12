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
let idComponenteParam;
let hojaDatosParam;
let longitudParam;
let anchoParam;
let materialParam;
let voltajeMinEntrParam;
let voltajeMaxEntrParam;
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
    msg = null;
    idComponenteParam = null;
    hojaDatosParam = null;
    longitudParam = null;
    anchoParam = null;
    materialParam = null;
    voltajeRecParam = null;
    voltajeMinEntrParam = null;
    voltajeMaxEntrParam = null;
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
    idComponenteParam = reqBody.id_componente
      ? reqBody.id_componente
      : idComponenteParam;
    hojaDatosParam = reqBody.hoja_de_datos
      ? reqBody.hoja_de_datos
      : hojaDatosParam;
    longitudParam = reqBody.longitud ? reqBody.longitud : longitudParam;
    anchoParam = reqBody.ancho ? reqBody.ancho : anchoParam;
    pesoParam = reqBody.peso ? reqBody.peso : pesoParam;
    materialParam = reqBody.material ? reqBody.material : materialParam;
    voltajeRecomendadoParam = reqBody.voltaje_recomendado
      ? reqBody.voltaje_recomendado
      : voltajeRecomendadoParam;
    voltajeMinEntrParam = reqBody.voltaje_min_entrada
      ? reqBody.voltaje_min_entrada
      : voltajeMinEntrParam;
    voltajeMaxEntrParam = reqBody.voltaje_max_entrada
      ? reqBody.voltaje_max_entrada
      : voltajeMaxEntrParam;

    //-- end with body ---

    if (ComponentDetail != null && idParam != null) {
      await ComponentDetail.update(
        {
          id_componente: idComponenteParam,
          hoja_de_datos: hojaDatosParam,
          longitud: longitudParam,
          ancho: anchoParam,
          peso: pesoParam,
          material: materialParam,
          voltaje_recomendado: voltajeRecomendadoParam,
          voltaje_min_entrada: voltajeMinEntrParam,
          voltaje_max_entrada: voltajeMaxEntrParam,
        },
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
