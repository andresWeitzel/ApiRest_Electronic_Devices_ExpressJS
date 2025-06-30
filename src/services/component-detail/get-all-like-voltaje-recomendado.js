//Externals
const { Op } = require('sequelize');
//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/component-detail/component-detail');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL =
  'Error in getAllComponentDetailLikeVoltajeRecomendadoService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
//component details
let componentDetailList;
//params
let queryStrParams;
let voltajeRecomendadoParam;
let params;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated component details list according to its recommended voltage from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentDetailLikeVoltajeRecomendadoService = async (req) => {
  try {
    componentDetailList = null;
    voltajeRecomendadoParam = null;
    queryStrParams = null;
    //Pagination
    pageSizeNro = 10;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      voltajeRecomendadoParam = params.voltajeRecomendado ? params.voltajeRecomendado : voltajeRecomendadoParam;
    }
    //-- end with params  ---

    //-- start with pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
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

    //-- end with pagination  ---

    if (ComponentDetail != (null && undefined)) {
      await ComponentDetail.findAll({
        attributes: {},
        where: {
          voltaje_recomendado: {
            [Op.iLike]: `%${voltajeRecomendadoParam}%`,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
      })
        .then(async (componentDetailItems) => {
          componentDetailList = componentDetailItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          componentDetailList = await checkErrors(error, error.name);
        });
    } else {
      componentDetailList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_ALL_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    componentDetailList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return componentDetailList;
};

module.exports = {
  getAllComponentDetailLikeVoltajeRecomendadoService,
}; 