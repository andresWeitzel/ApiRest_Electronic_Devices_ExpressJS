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
let newComponentDetail;
let updateComponentDetail;
let deleteComponentDetail;
let idComponenteParam;
let hojaDatosParam;
let longitudParam;
let anchoParam;
let materialParam;
let voltajeRecParam;
let voltajeMinEntrParam;
let voltajeMaxEntrParam;

//For check

/**
 * @description add a component-detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentDetailService = async (req, res) => {
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
  addComponentDetailService,
  updateComponentDetailService,
  deleteComponentDetailService,
  getAllComponentDetailService,
  getAllWithAttributesComponentDetailService,
};
