//Externals
const { Op } = require('sequelize');
//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/component/component');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_COMPONENT_ERROR_DETAIL =
  'Error in getAllComponentLikeStockMaxService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
//components
let componentList;
//params
let queryStrParams;
let params;
let stockMax;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated components list according to its stock max from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMaxService = async (req, res) => {
  try {
    componentList = null;
    queryStrParams = null;
    stockMax = 100;
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
      stockMax = params.stock ? parseInt(params.stock) : stockMax;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
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

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          stock: {
            [Op.gt]: 0,
            [Op.lte]: stockMax,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_COMPONENT_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_ALL_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    componentList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return componentList;
};

module.exports = {
  getAllComponentLikeStockMaxService,
};
