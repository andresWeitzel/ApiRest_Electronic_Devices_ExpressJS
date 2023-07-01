//Models
const { Component } = require("../models/sequelize/component");
//Enums
const { statusName } = require("../enums/connection/statusName");
const { value } = require("../enums/general/value");
//Const-vars
let newComponent;
let componentList;
let component;
let queryStrParams;
let pageSizeNro = 30;
let pageNro = 0;
const orderBy = [["id", "ASC"]];
let msg;

/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentService = async (req, res) => {
  try {
    newComponent = null;
    msg = null;

    //console.log({'COMPONENTE SERVICE':component});

    if (Component != null) {
      await Component.create({
        codigo: req.body.codigo,
        imagen: req.body.imagen,
        nro_pieza: req.body.nro_pieza,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        fabricante: req.body.fabricante,
        stock: req.body.stock,
        precio: req.body.precio,
       })
        .then((componentItem) => {
          newComponent = componentItem;
        })
        .catch((error) => {
          msg = `Error in addComponentService() function when trying to create a component. Caused by ${error}`;
          console.log(error);
          newComponent = statusName.CONNECTION_REFUSED;
        });
    } else {
      newComponent = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in addComponentService() function. Caused by ${error}`;
    console.log(msg);
    newComponent = statusName.CONNECTION_ERROR;
  }
  return newComponent;
};



/**
 * @description get all paginated components to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentService = async (req, res) => {
  try {
    componentList = null;
    msg = null;

      //-- start with pagination  ---
      queryStrParams = req.query;

      if (queryStrParams != value.IS_NULL) {
        pageSizeNro = (queryStrParams.limit) ? parseInt(queryStrParams.limit) : pageSizeNro;
        pageNro = (queryStrParams.page) ? parseInt(queryStrParams.page) : pageNro;
      }
      //-- end with pagination  ---

    if (Component != null) {
      await Component.findAll({
        atrributes:{},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy
      })
        .then((componentItems) => {
          componentList = componentItems;
        })
        .catch((error) => {
          msg = `Error in getAllComponentService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(error);
          componentList = statusName.CONNECTION_REFUSED;
        });
    } else {
      componentList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getAllComponentService() function. Caused by ${error}`;
    console.log(msg);
    componentList = statusName.CONNECTION_ERROR;
  }
  return componentList;
};





module.exports = {
  addComponentService,
  getAllComponentService
};
