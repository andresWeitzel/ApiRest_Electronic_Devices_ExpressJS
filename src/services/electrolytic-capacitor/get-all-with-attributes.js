//Externals
const { Op } = require('sequelize');
//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
const { paginationNameValueError } = require('../../enums/pagination/errors');
const {
  checkOrderBy,
} = require('../../helpers/pagination/electrolytic-capacitor/electrolytic-capacitor');
const { checkOrderAt } = require('../../helpers/pagination/ordering/orderAt');
//Const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
const GET_ALL_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in getAllWithAttributesElectrolyticCapacitorService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let electrolyticCapacitorList;
let queryStrParams;
let idComponenteParam;
let tipoParam;
let capacitanciaParam;
let toleranciaParam;
let rangoTemperaturaParam;
let rangoTensionNominalParam;
//pagination
let pageSizeNro;
let pageNro;
let orderBy;
let orderAt;
let order;
let msgLog;
let msgResponse;

/**
 * @description get all paginated electrolytic capacitors list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesElectrolyticCapacitorService = async (req, res) => {
  try {
    electrolyticCapacitorList = null;
    queryStrParams = null;
    idComponenteParam = 0;
    tipoParam = null;
    capacitanciaParam = null;
    toleranciaParam = null;
    rangoTemperaturaParam = null;
    rangoTensionNominalParam = null;
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
      tipoParam = queryStrParams.tipo
        ? queryStrParams.tipo
        : tipoParam;
      capacitanciaParam = queryStrParams.capacitancia
        ? queryStrParams.capacitancia
        : capacitanciaParam;
      toleranciaParam = queryStrParams.tolerancia
        ? queryStrParams.tolerancia
        : toleranciaParam;
      rangoTemperaturaParam = queryStrParams.rangoTemperatura
        ? queryStrParams.rangoTemperatura
        : rangoTemperaturaParam;
      rangoTensionNominalParam = queryStrParams.rangoTensionNominal
        ? queryStrParams.rangoTensionNominal
        : rangoTensionNominalParam;
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

    if (ElectrolycticCapacitor != (null && undefined)) {
      await ElectrolycticCapacitor.findAll({
        attributes: {},
        where: {
          [Op.or]: {
            id_componente: {
              [Op.eq]: `${idComponenteParam}`,
            },
            tipo: {
              [Op.iLike]: `%${tipoParam}%`,
            },
            capacitancia: {
              [Op.iLike]: `%${capacitanciaParam}%`,
            },
            tolerancia: {
              [Op.iLike]: `%${toleranciaParam}%`,
            },
            rango_temperatura: {
              [Op.iLike]: `%${rangoTemperaturaParam}%`,
            },
            rango_tension_nominal: {
              [Op.iLike]: `%${rangoTensionNominalParam}%`,
            },
          },
        },
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
  getAllWithAttributesElectrolyticCapacitorService,
}; 