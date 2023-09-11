//Externals
const { Op } = require("sequelize");
//Models
const { Component } = require("../models/sequelize/component");
const { ComponentDetail } = require("../models/sequelize/component-detail");
const { BipolarTransistor } = require("../models/sequelize/bipolar-transistor");
const { MosfetTransistor } = require("../models/sequelize/mosfet-transistor");
const {
  ElectrolycticCapacitor
} = require("../models/sequelize/electrolytic_capacitor");
//Enums
const { statusName } = require("../enums/database/status");
const { value } = require("../enums/general/value");
const { checkErrors } = require("../helpers/sequelize/errors");

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

    if (Component != null) {
      await Component.create({
        codigo: req.body.codigo,
        imagen: req.body.imagen,
        nro_pieza: req.body.nro_pieza,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion,
        fabricante: req.body.fabricante,
        stock: req.body.stock,
        precio: req.body.precio
      })
        .then(async (componentItem) => {
          newComponent = componentItem.dataValues;
        })
        .catch(async (error) => {
          msg = `Error in addComponentService() function when trying to create a component. Caused by ${error}`;
          console.log(msg);
          newComponent = await checkErrors(error, error.name);
        });
    } else {
      newComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in addComponentService() function. Caused by ${error}`;
    console.log(msg);
    newComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return newComponent;
};

/**
 * @description update a componente from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentService = async (req, res) => {
  try {
    updatedComponent = null;
    msg = null;
    params = null;
    idParam = 0;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      idParam = params.id ? parseInt(params.id) : null;
    }
    //-- end with params  ---

    if (Component != null && idParam != null) {
      await Component.update(
        {
          codigo: req.body.codigo,
          imagen: req.body.imagen,
          nro_pieza: req.body.nro_pieza,
          categoria: req.body.categoria,
          descripcion: req.body.descripcion,
          fabricante: req.body.fabricante,
          stock: req.body.stock,
          precio: req.body.precio
        },
        {
          where: {
            id: idParam
          }
        }
      )
      .then(async (componentItem) => {
        updatedComponent =
          componentItem[0] == 1
            ? {
                objectUpdated: `Se ha actualizado correctamente el componente según el id ${idParam}`
              }
            : {
                objectUpdated: `No se ha actualizado el componente según el id ${idParam}`
              };
      })
        .catch(async (error) => {
          msg = `Error in updateComponentService() function when trying to update a component. Caused by ${error}`;
          console.log(msg);

          updatedComponent = await checkErrors(error, error.name);
        });
    } else {
      updatedComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in updateComponentService() function. Caused by ${error}`;
    console.log(msg);
    updatedComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return updatedComponent;
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
      await Component.findAll({
        attributes: {},
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(msg);
          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentService() function. Caused by ${error}`;
    console.log(msg);
    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
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
      stockParam = queryStrParams.stock
        ? parseInt(queryStrParams.stock)
        : stockParam;
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
              [Op.like]: `%${codigoParam}%`
            },
            imagen: {
              [Op.like]: `%${imagenParam}%`
            },
            nro_pieza: {
              [Op.like]: `%${nroPiezaParam}%`
            },
            categoria: {
              [Op.like]: `%${categoriaParam}%`
            },
            descripcion: {
              [Op.like]: `%${descripcionParam}%`
            },
            fabricante: {
              [Op.like]: `%${fabricanteParam}%`
            },
            stock: {
              [Op.eq]: stockParam
            },
            precio: {
              [Op.eq]: precioParam
            }
          }
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllWithAttributesComponentService() function when trying to get all paginated component by all attributes. Caused by ${error}`;
          console.log(msg);
          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllWithAttributesComponentService() function. Caused by ${error}`;
    console.log(msg);
    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components with component_details from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentWithDetailsService = async (req, res) => {
  try {
    componentList = null;
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
      await Component.findAll({
        attributes: {},
        include: [{ model: ComponentDetail, required: true }],
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentWithDetailsService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentWithDetailsService() function. Caused by ${error}`;
    console.log(msg);
    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components with bipolar-transistor from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentWithBipolarTransistorService = async (req, res) => {
  try {
    componentList = null;
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
      await Component.findAll({
        attributes: {},
        where: {
          categoria: {
            [Op.like]: `%Transistores BJT%` //containing what is entered, less strictmatch
          }
        },
        include: [{ model: BipolarTransistor, required: true }],
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentWithBipolarTransistorService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentWithBipolarTransistorService() function. Caused by ${error}`;
    console.log(msg);
    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components with all models from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentWithAllModelsService = async (req, res) => {
  try {
    componentList = null;
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
      await Component.findAll({
        attributes: {},
        where: {},
        include: [
          { model: ComponentDetail, required: false },
          { model: BipolarTransistor, required: false },
          { model: MosfetTransistor, required: false },
          { model: ElectrolycticCapacitor, required: false }
        ],
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentWithAllModelsService() function when trying to get all paginated components. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentWithAllModelsService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
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
    params = null;
    idParam = null;
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
        raw: true,
        nest: true
      })
        .then(async (componentItem) => {
          component = componentItem;
        })
        .catch(async (error) => {
          msg = `Error in getComponentByIdService() function when trying to get a component by id. Caused by ${error}`;
          console.log(msg);

          component = await checkErrors(error, error.name);
        });
    } else {
      component = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getComponentByIdService() function. Caused by ${error}`;
    console.log(msg);

    component = await checkErrors(error, statusName.CONNECTION_ERROR);
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
    codigoParam = null;
    queryStrParams = null;
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
            [Op.like]: `%${codigoParam}%`
          }
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getComponentLikeCodigoService() function when trying to get a component by codigo. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getComponentLikeCodigoService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its imagen from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeImagenService = async (req, res) => {
  try {
    componentList = null;
    imagenParam = null;
    queryStrParams = null;
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      imagenParam = params.imagen ? params.imagen : null;
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
          imagen: {
            [Op.like]: `%${imagenParam}%`
          }
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentLikeImagenService() function when trying to get a component by imagen. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeImagenService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its nro de pieza from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeNroPiezaService = async (req, res) => {
  try {
    componentList = null;
    nroPiezaParam = null;
    queryStrParams = null;
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      nroPiezaParam = params.nroPieza ? params.nroPieza : null;
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
          nro_pieza: {
            [Op.like]: `%${nroPiezaParam}%`
          }
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentLikeNroPiezaService() function when trying to get a component by nro de pieza. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeNroPiezaService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its categoria and fabricante from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCategoriaFabricanteService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    categoriaParam = null;
    fabricanteParam = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      categoriaParam = queryStrParams.categoria
        ? queryStrParams.categoria
        : categoriaParam;
      fabricanteParam = queryStrParams.fabricante
        ? queryStrParams.fabricante
        : fabricanteParam;
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
            categoria: {
              [Op.like]: `%${categoriaParam}%`
            },
            fabricante: {
              [Op.like]: `%${fabricanteParam}%`
            }
          }
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
        nest: true
      })
        .then(async (componentItems) => {
          componentList = componentItems;
        })
        .catch(async (error) => {
          msg = `Error in getAllComponentLikeCategoriaFabricanteService() function when trying to get all paginated component by categoria and fabricante. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeCategoriaFabricanteService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

module.exports = {
  addComponentService,
  updateComponentService,
  getAllComponentService,
  getAllWithAttributesComponentService,
  getAllComponentWithDetailsService,
  getAllComponentWithBipolarTransistorService,
  getAllComponentWithAllModelsService,
  getComponentByIdService,
  getAllComponentLikeCodigoService,
  getAllComponentLikeImagenService,
  getAllComponentLikeNroPiezaService,
  getAllComponentLikeCategoriaFabricanteService
};