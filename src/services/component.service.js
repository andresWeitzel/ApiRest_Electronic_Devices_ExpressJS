//Externals
const { Op } = require('sequelize');
//Models
const { Component } = require('../models/sequelize/component');
//Enums
const { statusName } = require('../enums/database/status');
const { checkErrors } = require('../helpers/sequelize/errors');
const {
  checkOrderBy,
  checkOrderAt,
} = require('../helpers/pagination/components/component');
const { paginationNameValueError } = require('../enums/pagination/errors');
//const
const ORDER_BY_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_BY_NAME_VALUE_ERROR;
const ORDER_AT_NAME_VALUE_ERROR =
  paginationNameValueError.ORDER_AT_NAME_VALUE_ERROR;
//componentss
let componentList;
//params
let queryStrParams;
let params;
let stockParam;
let stockMin;
let stockMax;
let priceParam;
let priceMinParam;
let priceMaxParam;
//pagination
let pageSizeNro = 30;
let pageNro = 0;
let orderBy;
let orderAt;
let order;
let msg;

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
    queryStrParams = null;
    stockParam = null;
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      stockParam = params.stock ? parseInt(params.stock) : stockParam;
    }
    //-- end with params ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          stock: {
            [Op.eq]: stockParam,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      stockMax = params.stock ? parseInt(params.stock) : stockMax;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          stock: {
            [Op.gt]: 0,
            [Op.lte]: stockMax,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      //stock
      stockMin = queryStrParams.stockMin
        ? parseInt(queryStrParams.stockMin)
        : stockMin;
      stockMax = queryStrParams.stockMax
        ? parseInt(queryStrParams.stockMax)
        : stockMax;
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          stock: {
            [Op.gte]: stockMin,
            [Op.lte]: stockMax,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      priceParam = params.precio ? parseFloat(params.precio) : priceParam;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          precio: {
            [Op.eq]: priceParam,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      priceMaxParam = params.precioMax
        ? parseFloat(params.precioMax)
        : priceMaxParam;
    }
    //-- end with params  ---

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          precio: {
            [Op.gt]: 0,
            [Op.lte]: priceMaxParam,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
    //Pagination
    pageSizeNro = 5;
    pageNro = 0;
    orderBy = 'id';
    orderAt = 'ASC';
    msg = null;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != (null && undefined)) {
      //Prices
      priceMinParam = queryStrParams.precioMin
        ? parseFloat(queryStrParams.precioMin)
        : null;
      priceMaxParam = queryStrParams.precioMax
        ? parseFloat(queryStrParams.precioMax)
        : null;
      //Pagination
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
      orderBy = queryStrParams.orderBy ? queryStrParams.orderBy : orderBy;
      orderAt = queryStrParams.orderAt ? queryStrParams.orderAt : orderAt;
    }

    orderBy = await checkOrderBy(orderBy);

    if (orderBy == (null || undefined)) {
      return ORDER_BY_NAME_VALUE_ERROR;
    }

    orderAt = await checkOrderAt(orderAt);

    if (orderAt == (null || undefined)) {
      return ORDER_AT_NAME_VALUE_ERROR;
    }

    order = [[orderBy, orderAt]];

    //-- end with pagination  ---

    if (Component != (null && undefined)) {
      await Component.findAll({
        attributes: {},
        where: {
          precio: {
            [Op.gte]: priceMinParam,
            [Op.lte]: priceMaxParam,
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: order,
        raw: true,
        nest: true,
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
  getAllComponentLikeStockService,
  getAllComponentLikeStockMaxService,
  getAllComponentLikeStockMinMaxService,
  getAllComponentLikePriceService,
  getAllComponentLikePriceMaxService,
  getAllComponentLikePriceMinMaxService,
};
