//Externals
const { Op } = require('sequelize');
//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
  checkOrderAt,
} = require('../../helpers/pagination/components/component');
const { paginationNameValueError } = require('../../enums/pagination/errors');
//const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
//components
let componentList;
//params
let queryStrParams;
let params;
let stockMax;
//pagination
let pageSizeNro = 30;
let pageNro = 0;
let orderBy;
let orderAt;
let order;
let msg;

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
    msg = null;
    queryStrParams = null;
    stockMax = 100;
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

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

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

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
          msg = `Error in getAllComponentLikeStockMaxService() function when trying to get all paginated component by stock max. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeStockMaxService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

module.exports = {
  getAllComponentLikeStockMaxService,
};
