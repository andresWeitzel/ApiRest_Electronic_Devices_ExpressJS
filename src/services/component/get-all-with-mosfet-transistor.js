//Externals
const { Op } = require('sequelize');
//Models
const { Component } = require('../../models/sequelize/component');
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { paginationNameValueError } = require('../../enums/pagination/errors');
//Helpers
const { checkErrors } = require('../../helpers/sequelize/errors');
const { checkOrderBy } = require('../../helpers/pagination/component/component');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR = paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR = paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_COMPONENT_ERROR_DETAIL = 'Error in getAllComponentWithMosfetTransistorService() function.';
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let componentList;
let queryStrParams;
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated components with MOSFET transistors from the database
 * @param {any} req any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentWithMosfetTransistorService = async (req) => {
  try {
    componentList = null;
    queryStrParams = null;
    pageSizeNro = 10;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;
    msgResponse = null;

    queryStrParams = req.query;
    if (queryStrParams != (null && undefined)) {
      pageSizeNro = queryStrParams.limit ? parseInt(queryStrParams.limit) : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }
    orderBy = checkOrderBy(orderBy);
    if (orderBy == (null || undefined)) return ORDER_BY_NAME_VALUE_ERROR;
    orderAt = checkOrderAt(orderAt);
    if (orderAt == (undefined || null)) return ORDER_AT_NAME_VALUE_ERROR;
    order = [[orderBy, orderAt]];

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          categoria: {
            [Op.iLike]: `%Transistores MOSFET%`,
          },
        },
        include: [
          { model: MosfetTransistor, required: true },
        ],
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
  getAllComponentWithMosfetTransistorService,
}; 