//Models
const { MosfetTransistor } = require('../../models/sequelize/mosfet-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_ID_MOSFET_TRANSISTOR_ERROR_DETAIL =
  'Error in getMosfetTransistorByIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//mosfet transistors
let mosfetTransistor;
//params
let idParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get a mosfet transistor according to its identifier from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getMosfetTransistorByIdService = async (req, res) => {
  try {
    mosfetTransistor = null;
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

    if (MosfetTransistor != (null && undefined)) {
      await MosfetTransistor.findByPk(idParam, {
        attributes: {},
        raw: true,
        nest: true,
      })
        .then(async (mosfetTransistorItem) => {
          mosfetTransistor = mosfetTransistorItem;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_ID_MOSFET_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          mosfetTransistor = await checkErrors(error, error.name);
        });
    } else {
      mosfetTransistor = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_ID_MOSFET_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    mosfetTransistor = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return mosfetTransistor;
};

module.exports = {
  getMosfetTransistorByIdService,
}; 