//Externals
const { Op } = require('sequelize');
//Models
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/mosfet-transistor/mosfet-transistor');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL =
  'Error in getAllMosfetTransistorLikeDisipMaxService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
//mosfet transistors
let mosfetTransistorList;
//params
let queryStrParams;
let disipMaxParam;
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
 * @description get all paginated mosfet transistors list according to its disip_max from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllMosfetTransistorLikeDisipMaxService = async (req) => {
  try {
    mosfetTransistorList = null;
    disipMaxParam = null;
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
      disipMaxParam = params.disipMax ? params.disipMax : disipMaxParam;
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

    if (MosfetTransistor != (null && undefined)) {
      await MosfetTransistor.findAll({
        attributes: {},
        where: {
          disip_max: {
            [Op.iLike]: `%${disipMaxParam}%`,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
      mosfetTransistorList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_ALL_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    mosfetTransistorList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return mosfetTransistorList;
};

module.exports = {
  getAllMosfetTransistorLikeDisipMaxService,
}; 