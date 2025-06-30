//Externals
const { Op } = require('sequelize');
//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/component-detail/component-detail');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL =
  'Error in getAllWithAttributesComponentDetailService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let componentDetailList;
let queryStrParams;
let idComponenteParam;
let hojaDatosParam;
let longitudParam;
let anchoParam;
let pesoParam;
let materialParam;
let voltajeRecParam;
let voltajeMinEntrParam;
let voltajeMaxEntrParam;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

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
    //Pagination
    pageSizeNro = 10;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;
    msgResponse = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != null) {
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
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = checkOrderAt(orderAt);

    if (orderAt == (undefined || null)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];
    //-- end with querys params and pagination  ---

    if (ComponentDetail != (null && undefined)) {
      // Construir el objeto where dinámicamente solo con atributos que tienen valores
      const whereConditions = {};
      
      if (idComponenteParam && idComponenteParam > 0) {
        whereConditions.id_componente = {
          [Op.eq]: idComponenteParam,
        };
      }
      
      if (hojaDatosParam && hojaDatosParam.trim() !== '') {
        whereConditions.hoja_de_datos = {
          [Op.iLike]: `%${hojaDatosParam}%`,
        };
      }
      
      if (longitudParam && longitudParam.trim() !== '') {
        whereConditions.longitud = {
          [Op.iLike]: `%${longitudParam}%`,
        };
      }
      
      if (anchoParam && anchoParam.trim() !== '') {
        whereConditions.ancho = {
          [Op.iLike]: `%${anchoParam}%`,
        };
      }
      
      if (pesoParam && pesoParam.trim() !== '') {
        whereConditions.peso = {
          [Op.iLike]: `%${pesoParam}%`,
        };
      }
      
      if (materialParam && materialParam.trim() !== '') {
        whereConditions.material = {
          [Op.iLike]: `%${materialParam}%`,
        };
      }
      
      if (voltajeRecParam && voltajeRecParam.trim() !== '') {
        whereConditions.voltaje_recomendado = {
          [Op.iLike]: `%${voltajeRecParam}%`,
        };
      }
      
      if (voltajeMinEntrParam && voltajeMinEntrParam.trim() !== '') {
        whereConditions.voltaje_min_entrada = {
          [Op.iLike]: `%${voltajeMinEntrParam}%`,
        };
      }
      
      if (voltajeMaxEntrParam && voltajeMaxEntrParam.trim() !== '') {
        whereConditions.voltaje_max_entrada = {
          [Op.iLike]: `%${voltajeMaxEntrParam}%`,
        };
      }

      await ComponentDetail.findAll({
        attributes: {},
        where: whereConditions,
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
      })
        .then(async (componentDetailsItems) => {
          componentDetailList = componentDetailsItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          componentDetailList = await checkErrors(error, error.name);
        });
    } else {
      componentDetailList = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    componentDetailList = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return componentDetailList;
};

module.exports = {
  getAllWithAttributesComponentDetailService,
};
