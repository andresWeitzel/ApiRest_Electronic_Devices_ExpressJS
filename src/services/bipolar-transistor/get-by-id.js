//Models
const { BipolarTransistor } = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_ID_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in getBipolarTransistorByIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//bipolar transistors
let bipolarTransistor;
//params
let idParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get a bipolar transistor according to its identifier from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getBipolarTransistorByIdService = async (req, res) => {
  try {
    bipolarTransistor = null;
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

    if (BipolarTransistor != (null && undefined)) {
      await BipolarTransistor.findByPk(idParam, {
        attributes: {},
        raw: true,
        nest: true,
      })
        .then(async (bipolarTransistorItem) => {
          bipolarTransistor = bipolarTransistorItem;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_ID_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          bipolarTransistor = await checkErrors(error, error.name);
        });
    } else {
      bipolarTransistor = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_ID_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    bipolarTransistor = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return bipolarTransistor;
};

module.exports = {
  getBipolarTransistorByIdService,
}; 