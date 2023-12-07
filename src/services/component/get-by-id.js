//Models
const { Component } = require('../../models/sequelize/component');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const
const GET_BY_ID_COMPONENT_ERROR_DETAIL =
  'Error in getComponentByIdService() function.';
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//components
let component;
//params
let idParam;
let params;
//pagination
let msgLog;
let msgResponse;

/**
 * @description get a component according to its identifier from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getComponentByIdService = async (req, res) => {
  try {
    component = null;
    params = null;
    idParam = null;
    msg = null;
    //Pagination
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      idParam = params.id ? parseInt(params.id) : null;
    }
    //-- end with params  ---

    if (Component != (null && undefined)) {
      await Component.findByPk(idParam, {
        attributes: {},
        raw: true,
        nest: true,
      })
        .then(async (componentItem) => {
          component = componentItem;
        })
        .catch(async (error) => {
          msgResponse = GET_BY_ID_COMPONENT_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          component = await checkErrors(error, error.name);
        });
    } else {
      component = await checkErrors(null, CONNECTION_REFUSED_STATUS_NAME);
    }
  } catch (error) {
    msgResponse = GET_BY_ID_COMPONENT_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    component = await checkErrors(error, CONNECTION_ERROR_STATUS_NAME);
  }
  return component;
};

module.exports = {
  getComponentByIdService,
};
