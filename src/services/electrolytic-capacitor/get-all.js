//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { paginationNameValueError } = require('../../enums/pagination/errors');
//Helpers
const {
  checkOrderBy,
} = require('../../helpers/pagination/electrolytic-capacitor/electrolytic-capacitor');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in getAllElectrolyticCapacitorService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let electrolyticCapacitorList;
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
 * @description get all paginated electrolytic capacitors from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllElectrolyticCapacitorService = async (req, res) => {
  try {
    electrolyticCapacitorList = null;
    queryStrParams = null;
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msgLog = null;
    msgResponse = null;

    //-- start with pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
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

    if (ElectrolycticCapacitor != (null && undefined)) {
      await ElectrolycticCapacitor.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
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
      electrolyticCapacitorList = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME,
      );
    }
  } catch (error) {
    msgResponse = GET_ALL_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    electrolyticCapacitorList = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME,
    );
  }
  return electrolyticCapacitorList;
};

module.exports = {
  getAllElectrolyticCapacitorService,
}; 