//Models
const { ElectrolycticCapacitor } = require('../../models/sequelize/electrolytic_capacitor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_COMPONENT_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL =
  'Error in getElectrolyticCapacitorByComponentIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//electrolytic capacitors
let electrolyticCapacitorList;
//params
let componentIdParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get electrolytic capacitors according to component id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getElectrolyticCapacitorByComponentIdService = async (req, res) => {
  try {
    electrolyticCapacitorList = null;
    params = null;
    componentIdParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      componentIdParam = params.componentId ? parseInt(params.componentId) : null;
    }
    //-- end with params  ---

    if (ElectrolycticCapacitor != (null && undefined)) {
      await ElectrolycticCapacitor.findAll({
        attributes: {},
        where: {
          id_componente: componentIdParam,
        },
        raw: true,
        nest: true,
      })
        .then(async (electrolyticCapacitorItems) => {
          electrolyticCapacitorList = electrolyticCapacitorItems;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_COMPONENT_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          electrolyticCapacitorList = await checkErrors(error, error.name);
        });
    } else {
      electrolyticCapacitorList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_COMPONENT_ID_ELECTROLYTIC_CAPACITOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    electrolyticCapacitorList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return electrolyticCapacitorList;
};

module.exports = {
  getElectrolyticCapacitorByComponentIdService,
}; 