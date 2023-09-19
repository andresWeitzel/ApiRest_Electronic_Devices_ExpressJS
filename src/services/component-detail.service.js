//Externals
const { Op } = require("sequelize");
//Models
const { Component } = require("../models/sequelize/component");
const { ComponentDetail } = require("../models/sequelize/component-detail");
//Enums
const { statusName } = require("../enums/database/status");
const { value } = require("../enums/general/value");
//Const-vars
let componentDetailList;
let queryStrParams;
let pageSizeNro = 30;
let pageNro = 0;
const orderBy = [["id", "ASC"]];
let msg;

//Completed
/**
 * @description get all paginated components details from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentDetailService = async (req, res) => {
  try {
    componentDetailList = null;
    queryStrParams = null;
    msg = null;

    //-- start with pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with pagination  ---

    if (Component != null) {
      await ComponentDetail.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
      })
        .then((componentItems) => {
          componentDetailList = componentItems;
        })
        .catch((error) => {
          msg = `Error in getAllComponentDetailService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(error);
          componentDetailList = statusName.CONNECTION_REFUSED;
        });
    } else {
      componentDetailList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getAllComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    componentDetailList = statusName.CONNECTION_ERROR;
  }
  return componentDetailList;
};

module.exports = {
    getAllComponentDetailService,
};
