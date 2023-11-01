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

    if (ComponentDetail != null) {
      await ComponentDetail.create({
        id_componente: req.body?.id_componente
          ? req.body.id_componente
          : idComponenteParam,
        hoja_de_datos: req.body?.hoja_de_datos
          ? req.body.hoja_de_datos
          : hojaDatosParam,
        longitud: req.body?.longitud ? req.body.longitud : longitudParam,
        ancho: req.body?.ancho ? req.body.ancho : anchoParam,
        peso: req.body?.peso ? req.body.peso : pesoParam,
        material: req.body?.material ? req.body.material : materialParam,
        voltaje_recomendado: req.body?.voltaje_recomendado
          ? req.body.voltaje_recomendado
          : voltajeRecomendadoParam,
        voltaje_min_entrada: req.body?.voltaje_min_entrada
          ? req.body.voltaje_min_entrada
          : voltajeMinEntrParam,
        voltaje_max_entrada: req.body?.voltaje_max_entrada
          ? req.body.voltaje_max_entrada
          : voltajeMaxEntrParam,
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
    createComponentDetailService
}