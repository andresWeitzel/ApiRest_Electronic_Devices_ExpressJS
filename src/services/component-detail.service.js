//Externals
const { Op } = require('sequelize');
//Models
const { ComponentDetail } = require('../models/sequelize/component-detail');
//Enums
const { statusName } = require('../enums/database/status');
const { value } = require('../enums/general/value');
const { checkErrors } = require('../helpers/sequelize/errors');
//Const-vars
const orderBy = [['id', 'ASC']];
let componentDetailList;
let queryStrParams;
let pageSizeNro = 30;
let pageNro = 0;
let msg;
let params;
let idParam;
let deleteComponentDetail;
let idComponenteParam;
let hojaDatosParam;
let longitudParam;
let anchoParam;
let materialParam;
let voltajeRecParam;
let voltajeMinEntrParam;
let voltajeMaxEntrParam;



/**
 * @description delete a component detail from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentDetailService = async (req, res) => {
  try {
    deleteComponentDetail = null;
    msg = null;
    params = null;
    idParam = 0;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      idParam = params.id ? params.id : null;
    }
    //-- end with params  ---

    if (ComponentDetail != null && idParam != null) {
      await ComponentDetail.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (componentDetailItem) => {
          deleteComponentDetail =
            componentDetailItem == 1
              ? {
                  objectDeleted: `Se ha eliminado correctamente el detalle de componente según el id ${idParam}`,
                }
              : {
                  objectDeleted: `No se ha eliminado el detalle del componente según el id ${idParam}. Comprobar si el mismo existe en la db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in deleteComponentDetailService() function when trying to delete a component detail. Caused by ${error}`;
          console.log(msg);

          deleteComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      deleteComponentDetail = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in deleteComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    deleteComponentDetail = await checkErrors(
      error,
      statusName.CONNECTION_ERROR,
    );
  }
  return deleteComponentDetail;
};

/**
 * @description get all paginated components details from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentDetailService = async (req, res) => {
  try {
    componentDetailList = null;
    queryStrParams = null;
    msg = null;

    //-- start with pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with pagination  ---

    if (ComponentDetail != null) {
      await ComponentDetail.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
      })
        .then(async (componentDetailsItems) => {
          componentDetailList = componentDetailsItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentDetailService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(error);

          componentDetailList = await checkErrors(error, error.name);
        });
    } else {
      componentDetailList = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in getAllComponentDetailService() function. Caused by ${error}`;
    console.log(msg);

    componentDetailList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentDetailList;
};

/**
 * @description get all paginated components details list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesComponentDetailService = async (req, res) => {
  try {
    componentDetailList = null;
    msg = null;
    queryStrParams = null;
    idComponenteParam = 0;
    hojaDatosParam = null;
    longitudParam = null;
    anchoParam = null;
    pesoParam = null;
    materialParam = null;
    voltajeRecParam = null;
    voltajeMinEntrParam = null;
    voltajeMaxEntrParam = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      idComponenteParam = queryStrParams.idComponente
        ? queryStrParams.idComponente
        : idComponenteParam;
      hojaDatosParam = queryStrParams.hojaDatos
        ? queryStrParams.hojaDatos
        : hojaDatosParam;
      longitudParam = queryStrParams.longitud
        ? queryStrParams.longitud
        : longitudParam;
      anchoParam = queryStrParams.ancho ? queryStrParams.ancho : anchoParam;
      pesoParam = queryStrParams.peso ? queryStrParams.peso : pesoParam;
      materialParam = queryStrParams.material
        ? queryStrParams.material
        : materialParam;
      voltajeRecParam = queryStrParams.voltajeRecom
        ? queryStrParams.voltajeRecom
        : voltajeRecParam;
      voltajeMinEntrParam = queryStrParams.voltajeMinEntr
        ? queryStrParams.voltajeMinEntr
        : voltajeMinEntrParam;
      voltajeMaxEntrParam = queryStrParams.voltajeMaxEntr
        ? queryStrParams.voltajeMaxEntr
        : voltajeMaxEntrParam;
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with querys params and pagination  ---

    if (ComponentDetail != null) {
      await ComponentDetail.findAll({
        attributes: {},
        where: {
          [Op.or]: {
            id_componente: {
              [Op.eq]: `${idComponenteParam}`,
            },
            hoja_de_datos: {
              [Op.like]: `%${hojaDatosParam}%`,
            },
            longitud: {
              [Op.like]: `%${longitudParam}%`,
            },
            ancho: {
              [Op.like]: `%${anchoParam}%`,
            },
            peso: {
              [Op.like]: `%${pesoParam}%`,
            },
            material: {
              [Op.like]: `%${materialParam}%`,
            },
            voltaje_recomendado: {
              [Op.like]: `%${voltajeRecParam}%`,
            },
            voltaje_min_entrada: {
              [Op.like]: `%${voltajeMinEntrParam}%`,
            },
            voltaje_max_entrada: {
              [Op.like]: `%${voltajeMaxEntrParam}%`,
            },
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
      })
        .then(async (componentDetailsItems) => {
          componentDetailList = componentDetailsItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllWithAttributesComponentDetailService() function when trying to get all paginated component details by all attributes. Caused by ${error}`;
          console.log(msg);
          componentDetailList = await checkErrors(error, error.name);
        });
    } else {
      componentDetailList = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in getAllWithAttributesComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    componentDetailList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentDetailList;
};

module.exports = {
  deleteComponentDetailService,
  getAllComponentDetailService,
  getAllWithAttributesComponentDetailService,
};
