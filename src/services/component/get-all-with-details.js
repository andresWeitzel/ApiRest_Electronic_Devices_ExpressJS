//Models
const { Component } = require('../../models/sequelize/component');
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { paginationNameValueError } = require('../../enums/pagination/errors');
//Helpers
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
  checkOrderAt,
} = require('../../helpers/pagination/components/component');
//const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
//componentss
let componentList;
//params
let queryStrParams;
//pagination
let pageSizeNro = 30;
let pageNro = 0;
let orderBy;
let orderAt;
let order;
let msg;

/**
 * @description get all paginated components with component_details from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentWithDetailsService = async (req, res) => {
  try {
    //params
    componentList = null;
    queryStrParams = null;
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

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

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (undefined || null)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];
    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        include: [{ model: ComponentDetail, required: true }],
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
          msg = `Error in getAllComponentWithDetailsService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentWithDetailsService() function. Caused by ${error}`;
    console.log(msg);
    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

module.exports = {
  getAllComponentWithDetailsService,
};
