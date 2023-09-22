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
const orderBy = [["id", "ASC"]];
let newComponent;
let componentList;
let component;
let queryStrParams;
let pageSizeNro = 30;
let idParam;
let codigoParam;
let pageNro = 0;
let msg;
let params;
let imagenParam;
let nroPiezaParam;
let categoriaParam;
let descripcionParam;
let fabricanteParam;
let stockParam;
let stockMin;
let stockMax;
let priceParam;
let priceMinParam;
let priceMaxParam;

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
                  objectUpdated: `No se ha actualizado el componente según el id ${idParam}. Comprobar si el componente existe en la db.`
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
 * @description delete a componente from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentService = async (req, res) => {
  try {
    deleteComponent = null;
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
      await Component.destroy(
        {
          where: {
            id: idParam
          }
        }
      )
        .then(async (componentItem) => {
          deleteComponent =
            componentItem == 1
              ? {
                objectDeleted: `Se ha eliminado correctamente el componente según el id ${idParam}`
                }
              : {
                  objectDeleted: `No se ha eliminado el componente según el id ${idParam}. Comprobar si el componente existe en la db.`
                };
        })
        .catch(async (error) => {
          msg = `Error in deleteComponentService() function when trying to delete a component. Caused by ${error}`;
          console.log(msg);

          deleteComponent = await checkErrors(error, error.name);
        });
    } else {
      deleteComponent = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in deleteComponentService() function. Caused by ${error}`;
    console.log(msg);
    deleteComponent = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return deleteComponent;
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
const getAllComponentLikeCodeService = async (req, res) => {
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
const getAllComponentLikeImageService = async (req, res) => {
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
          msg = `Error in getAllComponentLikeImageService() function when trying to get a component by imagen. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeImageService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its part number from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePartNumberService = async (req, res) => {
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
          msg = `Error in getAllComponentLikePartNumberService() function when trying to get a component by nro de pieza. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikePartNumberService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its category and maker from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCategoryAndMakerService = async (req, res) => {
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
          msg = `Error in getAllComponentLikeCategoryAndMakerService() function when trying to get all paginated component by categoria and fabricante. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeCategoryAndMakerService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its description from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeDescriptionService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    descripcionParam = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      descripcionParam = params.descripcion ? params.descripcion : null;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
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
          descripcion: {
            [Op.like]: `%${descripcionParam}%`
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
          msg = `Error in getAllComponentLikeDescriptionService() function when trying to get all paginated component by description. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeDescriptionService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its stock from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    stockParam = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      stockParam = params.stock ? parseInt(params.stock) : null;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
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
          stock: {
            [Op.eq]: stockParam
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
          msg = `Error in getAllComponentLikeStockService() function when trying to get all paginated component by stock. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeStockService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its stock max from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMaxService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    stockMax = 100;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      stockMax = params.stock ? parseInt(params.stock) : null;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
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
          stock: {
            [Op.gt]: 0,
            [Op.lte]: stockMax
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
          msg = `Error in getAllComponentLikeStockMaxService() function when trying to get all paginated component by stock max. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeStockMaxService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its stock min and max from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMinMaxService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    stockMin = 0;
    stockMax = 100;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      stockMin = queryStrParams.stockMin
        ? parseInt(queryStrParams.stockMin)
        : stockMin;
      stockMax = queryStrParams.stockMax
        ? parseInt(queryStrParams.stockMax)
        : stockMax;
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
          stock: {
            [Op.gte]: stockMin,
            [Op.lte]: stockMax
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
          msg = `Error in getAllComponentLikeStockMinMaxService() function when trying to get all paginated component by stock min and stock max. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikeStockMinMaxService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its price from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    priceParam = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      priceParam = params.precio ? parseFloat(params.precio) : null;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
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
          precio: {
            [Op.eq]: priceParam
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
          msg = `Error in getAllComponentLikePriceService() function when trying to get all paginated component by price. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikePriceService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its max price from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceMaxService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    priceMaxParam = null;

    //-- start with params ---
    params = req.params;

    if (params != value.IS_NULL) {
      priceMaxParam = params.precioMax ? parseFloat(params.precioMax) : null;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
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
          precio: {
            [Op.gt]: 0,
            [Op.lte]: priceMaxParam
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
          msg = `Error in getAllComponentLikePriceMaxService() function when trying to get all paginated component by price. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikePriceMaxService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

/**
 * @description get all paginated components list according to its min and max price from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceMinMaxService = async (req, res) => {
  try {
    componentList = null;
    msg = null;
    queryStrParams = null;
    priceMinParam = null;
    priceMaxParam = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != value.IS_NULL) {
      priceMinParam = queryStrParams.precioMin
        ? parseFloat(queryStrParams.precioMin)
        : null;
      priceMaxParam = queryStrParams.precioMax
        ? parseFloat(queryStrParams.precioMax)
        : null;

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
          precio: {
            [Op.gte]: priceMinParam,
            [Op.lte]: priceMaxParam
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
          msg = `Error in getAllComponentLikePriceMinMaxService() function when trying to get all paginated component by price. Caused by ${error}`;
          console.log(msg);

          componentList = await checkErrors(error, error.name);
        });
    } else {
      componentList = await checkErrors(null, statusName.CONNECTION_REFUSED);
    }
  } catch (error) {
    msg = `Error in getAllComponentLikePriceMinMaxService() function. Caused by ${error}`;
    console.log(msg);

    componentList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentList;
};

module.exports = {
  addComponentService,
  updateComponentService,
  deleteComponentService,
  getAllComponentService,
  getAllWithAttributesComponentService,
  getAllComponentWithDetailsService,
  getAllComponentWithBipolarTransistorService,
  getAllComponentWithAllModelsService,
  getComponentByIdService,
  getAllComponentLikeCodeService,
  getAllComponentLikeImageService,
  getAllComponentLikePartNumberService,
  getAllComponentLikeCategoryAndMakerService,
  getAllComponentLikeDescriptionService,
  getAllComponentLikeStockService,
  getAllComponentLikeStockMaxService,
  getAllComponentLikeStockMinMaxService,
  getAllComponentLikePriceService,
  getAllComponentLikePriceMaxService,
  getAllComponentLikePriceMinMaxService
};
