//Models
const {
  BipolarTransistor,
} = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const-vars
let msg;
let params;
let idParam;
let updateBipolarTransistor;
let idComponenteParam;
let tipoParam;
let longitudParam;
let anchoParam;
let materialParam;
let voltajeMinEntrParam;
let voltajeMaxEntrParam;

//For check 

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
    msg = null;
    idParam = null;
    idComponenteParam = null;
    tipoParam = null;
    longitudParam = null;
    anchoParam = null;
    materialParam = null;
    voltajeRecParam = null;
    voltajeMinEntrParam = null;
    voltajeMaxEntrParam = null;

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
    tipoParam = reqBody.tipo ? reqBody.tipo : tipoParam;
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

    if (BipolarTransistor != null && idParam != null) {
      await BipolarTransistor.update(
        {
          id_componente: idComponenteParam,
          hoja_de_datos: tipoParam,
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
        .then(async (BipolarTransistorItem) => {
          updateBipolarTransistor =
            BipolarTransistorItem[0] == 1
              ? {
                  objectUpdated: `Se ha actualizado correctamente el componente según el id ${idParam}`,
                }
              : {
                  objectUpdated: `No se ha actualizado el componente según el id ${idParam}. Comprobar si el componente existe en la db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in updateBipolarTransistorService() function when trying to create a component. Caused by ${error}`;
          console.log(msg);
          updateBipolarTransistor = await checkErrors(error, error.name);
        });
    } else {
      updateBipolarTransistor = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in updateBipolarTransistorService() function. Caused by ${error}`;
    console.log(msg);
    updateBipolarTransistor = await checkErrors(
      error,
      statusName.CONNECTION_ERROR,
    );
  }
  return updateBipolarTransistor;
};

module.exports = {
  updateBipolarTransistorService,
};
