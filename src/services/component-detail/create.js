//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
//errors
const ADD_COMPONENT_DETAIL_ERROR_DETAIL =
  'Error in createComponentDetailService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let newComponentDetail;
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
 * @description create a component-detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const createComponentDetailService = async (req, res) => {
  try {
    newComponentDetail = null;
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

    if (ComponentDetail != (null && undefined)) {
      await ComponentDetail.create({
        id_componente: idComponenteParam,
        hoja_de_datos: hojaDatosParam,
        longitud: longitudParam,
        ancho: anchoParam,
        peso: pesoParam,
        material: materialParam,
        voltaje_recomendado: voltajeRecomendadoParam,
        voltaje_min_entrada: voltajeMinEntrParam,
        voltaje_max_entrada: voltajeMaxEntrParam,
      })
        .then(async (componentDetailItem) => {
          newComponentDetail = componentDetailItem.dataValues;
        })
        .catch(async (error) => {
          msgResponse = ADD_COMPONENT_DETAIL_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          newComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      newComponentDetail = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = ADD_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    newComponentDetail = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return newComponentDetail;
};

module.exports = {
  createComponentDetailService,
};
