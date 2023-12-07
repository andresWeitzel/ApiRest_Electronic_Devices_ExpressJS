//Models
const {
  BipolarTransistor,
} = require('../../models/sequelize/bipolar-transistor');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const-vars
const orderBy = [['id', 'ASC']];
let bipolarTransistorList;
let queryStrParams;
let pageSizeNro = 30;
let pageNro = 0;
let msg;

/**
 * @description get all paginated bipolar transistors from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllBipolarTransistorService = async (req, res) => {
  try {
    bipolarTransistorList = null;
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

    if (BipolarTransistor != null) {
      await BipolarTransistor.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
      })
        .then(async (bipolarTransistorItems) => {
          bipolarTransistorList = bipolarTransistorItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllBipolarTransistorService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(error);

          bipolarTransistorList = await checkErrors(error, error.name);
        });
    } else {
      bipolarTransistorList = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in getAllBipolarTransistorService() function. Caused by ${error}`;
    console.log(msg);

    bipolarTransistorList = await checkErrors(
      error,
      statusName.CONNECTION_ERROR,
    );
  }
  return bipolarTransistorList;
};

module.exports = {
  getAllBipolarTransistorService,
};
