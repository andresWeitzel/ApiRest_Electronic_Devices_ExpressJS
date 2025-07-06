//External
const { Op } = require('sequelize');
//Models
const { BipolarTransistor } = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_ALL_LIKE_VOLTAJE_COLEC_BASE_BIPOLAR_TRANSISTOR_ERROR_DETAIL =
  'Error in getAllBipolarTransistorLikeVoltajeColecBaseService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//bipolar transistors
let bipolarTransistorList;
//params
let voltajeColecBaseParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get bipolar transistors according to voltaje_colec_base from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllBipolarTransistorLikeVoltajeColecBaseService = async (req) => {
  try {
    bipolarTransistorList = null;
    params = null;
    voltajeColecBaseParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      voltajeColecBaseParam = params.voltajeColecBase ? params.voltajeColecBase : null;
    }
    //-- end with params  ---

    if (BipolarTransistor != (null && undefined)) {
      await BipolarTransistor.findAll({
        where: {
          voltaje_colec_base: {
            [Op.like]: `%${voltajeColecBaseParam}%`,
          },
        },
        attributes: {},
        raw: true,
        nest: true,
      })
        .then(async (bipolarTransistorItems) => {
          bipolarTransistorList = bipolarTransistorItems;
        })
        .catch(async (error) => {
          msgResponse = GET_ALL_LIKE_VOLTAJE_COLEC_BASE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          bipolarTransistorList = await checkErrors(error, error.name);
        });
    } else {
      bipolarTransistorList = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_ALL_LIKE_VOLTAJE_COLEC_BASE_BIPOLAR_TRANSISTOR_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    bipolarTransistorList = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return bipolarTransistorList;
};

module.exports = {
  getAllBipolarTransistorLikeVoltajeColecBaseService,
}; 