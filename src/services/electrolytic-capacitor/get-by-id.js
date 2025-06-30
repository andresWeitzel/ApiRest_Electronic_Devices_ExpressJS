//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in getElectrolyticCapacitorByIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//electrolytic capacitors
let electrolyticCapacitor;
//params
let idParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get an electrolytic capacitor according to its identifier from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getElectrolyticCapacitorByIdService = async (req, res) => {
  try {
    electrolyticCapacitor = null;
    params = null;
    idParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      idParam = params.id ? parseInt(params.id) : null;
    }
    //-- end with params  ---

    if (ElectrolycticCapacitor != (null && undefined)) {
      await ElectrolycticCapacitor.findByPk(idParam, {
        attributes: {},
        raw: true,
        nest: true,
      })
        .then(async (electrolyticCapacitorItem) => {
          electrolyticCapacitor = electrolyticCapacitorItem;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          electrolyticCapacitor = await checkErrors(error, error.name);
        });
    } else {
      electrolyticCapacitor = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    electrolyticCapacitor = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return electrolyticCapacitor;
};

module.exports = {
  getElectrolyticCapacitorByIdService,
}; 