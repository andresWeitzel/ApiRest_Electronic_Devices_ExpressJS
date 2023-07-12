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
let params;

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
 * @description get all paginated components from the database
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
        attributes:{},
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
    msg = null;


        //-- start with params ---
        params = req.params;
        //check https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express

        // if (params != value.IS_NULL) {
        //   pageSizeNro = (params.limit) ? parseInt(queryStrParams.limit) : pageSizeNro;
        //   pageNro = (queryStrParams.page) ? parseInt(queryStrParams.page) : pageNro;
        // }
        //-- end with params  ---


    if (Component != null) {
      await Component.findByPk(id,{
        attributes:{}
      })
        .then((componentItem) => {
          component = componentItem;
        })
        .catch((error) => {
          msg = `Error in getComponentByIdService() function when trying to get a component by id. Caused by ${error}`;
          console.log(error);
          componentList = statusName.CONNECTION_REFUSED;
        });
    } else {
      component = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getComponentByIdService() function. Caused by ${error}`;
    console.log(msg);
    component = statusName.CONNECTION_ERROR;
  }
  return component;
};





module.exports = {
  addComponentService,
  getAllComponentService,
  getComponentByIdService
};
