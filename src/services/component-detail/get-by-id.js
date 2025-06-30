//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_ID_COMPONENT_DETAIL_ERROR_DETAIL =
  'Error in getComponentDetailByIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//component details
let componentDetail;
//params
let idParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get a component detail according to its identifier from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getComponentDetailByIdService = async (req, res) => {
  try {
    componentDetail = null;
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

    if (ComponentDetail != (null && undefined)) {
      await ComponentDetail.findByPk(idParam, {
        attributes: {},
        raw: true,
        nest: true,
      })
        .then(async (componentDetailItem) => {
          componentDetail = componentDetailItem;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_ID_COMPONENT_DETAIL_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          componentDetail = await checkErrors(error, error.name);
        });
    } else {
      componentDetail = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_ID_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    componentDetail = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return componentDetail;
};

module.exports = {
  getComponentDetailByIdService,
}; 