//External
require('dotenv').config();
//Database
const { dbConnection } = require('../../db/config');
//Models
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { paginationNameValueError } = require('../../enums/pagination/errors');
//Helpers
const {
  checkOrderBy,
} = require("../../helpers/pagination/mosfet-transistor/mosfet-transistor");
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
const { checkErrors } = require("../../helpers/sequelize/errors");
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL =
  "Error in getAllMosfetTransistorService() function.";
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let mosfetTransistorList;
let queryStrParams;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated mosfet transistors from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllMosfetTransistorService = async (req, res) => {
  try {
    mosfetTransistorList = null;
    queryStrParams = null;
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = "id";
    orderAt = "ASC";
    msgLog = null;
    msgResponse = null;

    //-- start with pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != null) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(await queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page
        ? parseInt(await queryStrParams.page)
        : pageNro;
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

    if (MosfetTransistor != (null && undefined)) {
      await MosfetTransistor.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
      })
        .then(async (mosfetTransistorItems) => {
          mosfetTransistorList = mosfetTransistorItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          mosfetTransistorList = await checkErrors(error, error.name);
        });
    } else {
      mosfetTransistorList = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME
      );
    }
  } catch (error) {
    msgResponse = GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    mosfetTransistorList = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME
    );
  }
  return mosfetTransistorList;
};

module.exports = {
  getAllMosfetTransistorService,
}; 