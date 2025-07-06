//Models
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_COMPONENT_ID_MOSFET_TRANSISTOR_ERROR_DETAIL =
  'Error in getMosfetTransistorByComponentIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//mosfet transistors
let mosfetTransistorList;
//params
let componentIdParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get mosfet transistors according to component id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getMosfetTransistorByComponentIdService = async (req, res) => {
  try {
    mosfetTransistorList = null;
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

    if (MosfetTransistor != (null && undefined)) {
      await MosfetTransistor.findAll({
        attributes: {},
        where: {
          id_componente: componentIdParam,
        },
        raw: true,
        nest: true,
      })
        .then(async (mosfetTransistorItems) => {
          mosfetTransistorList = mosfetTransistorItems;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_COMPONENT_ID_MOSFET_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          mosfetTransistorList = await checkErrors(error, error.name);
        });
    } else {
      mosfetTransistorList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_COMPONENT_ID_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    mosfetTransistorList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return mosfetTransistorList;
};

module.exports = {
  getMosfetTransistorByComponentIdService,
}; 