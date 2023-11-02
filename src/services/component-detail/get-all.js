//Models
const { ComponentDetail } = require("../../models/sequelize/component-detail");
//Enums
const { statusName } = require("../../enums/database/status");
const { checkErrors } = require("../../helpers/sequelize/errors");
//Const-vars
const orderBy = [["id", "ASC"]];
let componentDetailList;
let queryStrParams;
let pageSizeNro = 30;
let pageNro = 0;
let msg;

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

    if (queryStrParams != null) {
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with pagination  ---

    if (ComponentDetail != null) {
      await ComponentDetail.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
      })
        .then(async (componentDetailsItems) => {
          componentDetailList = componentDetailsItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentDetailService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(error);

          componentDetailList = await checkErrors(error, error.name);
        });
    } else {
      componentDetailList = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED
      );
    }
  } catch (error) {
    msg = `Error in getAllComponentDetailService() function. Caused by ${error}`;
    console.log(msg);

    componentDetailList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentDetailList;
};

module.exports = {
  getAllComponentDetailService,
};
