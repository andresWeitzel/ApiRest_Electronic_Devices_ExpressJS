//Externals
const { Sequelize, Op } = require("sequelize");
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
let idParam;
let codigoParam;
let pageNro = 0;
const orderBy = [["id", "ASC"]];
let msg;
let params;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let stockParam;
let precioParam;

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
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with pagination  ---

    if (Component != null) {
      await Component.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
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
 * @description get all paginated components list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesComponentService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    codigoParam = null;
    imagenParam = null;
    nroPiezaParam = null;
    categoriaParam = null;
    descripcionParam = null;
    fabricanteParam = null;
    stockParam = null;
    precioParam = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      codigoParam = queryStrParams.codigo ? queryStrParams.codigo : codigoParam;
      imagenParam = queryStrParams.imagen ? queryStrParams.imagen : imagenParam;
      nroPiezaParam = queryStrParams.nroPieza
        ? queryStrParams.nroPieza
        : nroPiezaParam;
      categoriaParam = queryStrParams.categoria
        ? queryStrParams.categoria
        : categoriaParam;
      descripcionParam = queryStrParams.descripcion
        ? queryStrParams.descripcion
        : descripcionParam;
      fabricanteParam = queryStrParams.fabricante
        ? queryStrParams.fabricante
        : fabricanteParam;
      stockParam = queryStrParams.stock ? parseInt(queryStrParams.stock) : stockParam;
      precioParam = queryStrParams.precio ? queryStrParams.precio : precioParam;
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with querys params and pagination  ---

    if (Component != null) {
      await Component.findAll({
        attributes: {},
        where: {
          [Op.or]: {
            codigo: {
              [Op.like]: `%${codigoParam}%`,
            },
            imagen: {
              [Op.like]: `%${imagenParam}%`,
            },
            nro_pieza: {
              [Op.like]: `%${nroPiezaParam}%`,
            },
            categoria: {
              [Op.like]: `%${categoriaParam}%`,
            },
            descripcion: {
              [Op.like]: `%${descripcionParam}%`,
            },
            fabricante: {
              [Op.like]: `%${fabricanteParam}%`,
            },
            stock: {
              [Op.eq]: stockParam,
            },
            precio: {
              [Op.eq]: precioParam,
            },
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
      })
        .then((componentItems) => {
          componentList = componentItems;
        })
        .catch((error) => {
          msg = `Error in getAllWithAttributesComponentService() function when trying to get all paginated component by all attributes. Caused by ${error}`;
          console.log(error);
          componentList = statusName.CONNECTION_REFUSED;
        });
    } else {
      componentList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getAllWithAttributesComponentService() function. Caused by ${error}`;
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

    if (params != value.IS_NULL) {
      idParam = params.id ? parseInt(params.id) : null;
    }
    //-- end with params  ---

    if (Component != null) {
      await Component.findByPk(idParam, {
        attributes: {},
      })
        .then((componentItem) => {
          component = componentItem;
        })
        .catch((error) => {
          msg = `Error in getComponentByIdService() function when trying to get a component by id. Caused by ${error}`;
          console.log(error);
          component = statusName.CONNECTION_REFUSED;
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

/**
 * @description get all paginated components list according to its code from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCodigoService = async (req, res) => {
  try {
    componentList = null;
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      codigoParam = params.codigo ? params.codigo : null;
    }
    //-- end with params  ---

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
      await Component.findAll({
        attributes: {},
        where: {
          codigo: {
            [Op.like]: `%${codigoParam}%`, //containing what is entered, less strictmatch
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
      })
        .then((componentItems) => {
          componentList = componentItems;
        })
        .catch((error) => {
          msg = `Error in getComponentLikeCodigoService() function when trying to get a component by codigo. Caused by ${error}`;
          console.log(error);
          componentList = statusName.CONNECTION_REFUSED;
        });
    } else {
      componentList = statusName.CONNECTION_REFUSED;
    }
  } catch (error) {
    msg = `Error in getComponentLikeCodigoService() function. Caused by ${error}`;
    console.log(msg);
    componentList = statusName.CONNECTION_ERROR;
  }
  return componentList;
};

module.exports = {
  addComponentService,
  getAllComponentService,
  getAllWithAttributesComponentService,
  getComponentByIdService,
  getAllComponentLikeCodigoService,
};
