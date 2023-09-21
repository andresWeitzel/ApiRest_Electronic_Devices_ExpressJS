//Externals
const { Op } = require("sequelize");
//Models
const { ComponentDetail } = require("../models/sequelize/component-detail");
//Enums
const { statusName } = require("../enums/database/status");
const { value } = require("../enums/general/value");
const { checkErrors } = require("../helpers/sequelize/errors");
//Const-vars
const orderBy = [["id", "ASC"]];
let componentDetailList;
let queryStrParams;
let pageSizeNro = 30;
let pageNro = 0;
let msg;
let newComponentDetail;


/**
 * @description add a component-detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentDetailService = async (req, res) => {
  try {
    newComponentDetail = null;
    msg = null;

    if (ComponentDetail != null) {
      await ComponentDetail.create({
        hoja_de_datos: req.body.hoja_de_datos,
        longitud: req.body.longitud,
        ancho: req.body.ancho,
        peso: req.body.peso,
        material: req.body.material,
        voltaje_recomendado: req.body.voltaje_recomendado,
        voltaje_min_entrada: req.body.voltaje_min_entrada,
        voltaje_max_entrada: req.body.voltaje_max_entrada
      })
        .then(async (componentDetailItem) => {
          newComponentDetail = componentDetailItem.dataValues;
        })
        .catch(async (error) => {
          msg = `Error in addComponentDetailService() function when trying to create a component. Caused by ${error}`;
          console.log(msg);
          newComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      newComponentDetail = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in addComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    newComponentDetail = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return newComponentDetail;
};

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

    if (ComponentDetail != null) {
      await ComponentDetail.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true
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
  addComponentDetailService
};
