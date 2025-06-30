//Externals
const { Op } = require('sequelize');
//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/electrolytic-capacitor/electrolytic-capacitor');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in getAllElectrolyticCapacitorLikeCapacitanciaService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
//electrolytic capacitors
let electrolyticCapacitorList;
//params
let queryStrParams;
let capacitanciaParam;
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
 * @description get all paginated electrolytic capacitors list according to its capacitancia from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllElectrolyticCapacitorLikeCapacitanciaService = async (req) => {
  try {
    electrolyticCapacitorList = null;
    capacitanciaParam = null;
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
      capacitanciaParam = params.capacitancia ? params.capacitancia : capacitanciaParam;
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

    if (ElectrolycticCapacitor != (null && undefined)) {
      await ElectrolycticCapacitor.findAll({
        attributes: {},
        where: {
          capacitancia: {
            [Op.iLike]: `%${capacitanciaParam}%`,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
      })
        .then(async (electrolyticCapacitorItems) => {
          electrolyticCapacitorList = electrolyticCapacitorItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          electrolyticCapacitorList = await checkErrors(error, error.name);
        });
    } else {
      electrolyticCapacitorList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_ALL_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    electrolyticCapacitorList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return electrolyticCapacitorList;
};

module.exports = {
  getAllElectrolyticCapacitorLikeCapacitanciaService,
}; 