//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const-vars
let msg;
let newComponentDetail;
let idComponenteParam;
let hojaDatosParam;
let longitudParam;
let anchoParam;
let materialParam;
let voltajeMinEntrParam;
let voltajeMaxEntrParam;

//For refactor

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
    msg = null;
    idComponenteParam = null;
    hojaDatosParam = null;
    longitudParam = null;
    anchoParam = null;
    materialParam = null;
    voltajeRecParam = null;
    voltajeMinEntrParam = null;
    voltajeMaxEntrParam = null;

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

    if (ComponentDetail != null) {
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
          msg = `Error in addComponentDetailService() function when trying to create a component detail. Caused by ${error}`;
          console.log(msg);
          newComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      newComponentDetail = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in addComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    newComponentDetail = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return newComponentDetail;
};

module.exports = {
  createComponentDetailService,
};
