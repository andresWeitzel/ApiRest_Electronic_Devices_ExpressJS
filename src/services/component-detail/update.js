//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { value } = require('../../enums/general/value');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const-vars
let msg;
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



/**
 * @description update a component-detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentDetailService = async (req, res) => {
  try {
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

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      idParam = params.id ? params.id : null;
    }
    //-- end with params  ---

    if (ComponentDetail != null && idParam != null) {
      await ComponentDetail.update(
        {
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
                  objectUpdated: `Se ha actualizado correctamente el componente según el id ${idParam}`,
                }
              : {
                  objectUpdated: `No se ha actualizado el componente según el id ${idParam}. Comprobar si el componente existe en la db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in updateComponentDetailService() function when trying to create a component. Caused by ${error}`;
          console.log(msg);
          updateComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      updateComponentDetail = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in updateComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    updateComponentDetail = await checkErrors(
      error,
      statusName.CONNECTION_ERROR,
    );
  }
  return updateComponentDetail;
};


module.exports={
    updateComponentDetailService
}