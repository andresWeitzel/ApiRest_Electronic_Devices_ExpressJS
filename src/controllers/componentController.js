//External
require("dotenv").config();
//Services
const {
  addComponentService,
  getAllComponentService,
  getComponentByIdService,
} = require("../services/componentService");
//Enums
const { statusName } = require("../enums/connection/statusName");
const { statusCode } = require("../enums/http/statusCode");
const { value } = require("../enums/general/value");
//Const-vars
let newComponent;
let msg;
let code;

/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;
    console.log({ req: req });
    newComponent = await addComponentService(req);

    switch (newComponent) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg = "Bad request, could not add a component.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(newComponent);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in addComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;
    console.log({ req: req });

    componentList = await getAllComponentService(req);

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg = "Bad request, could not get all paginated list components.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get a component based its id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getComponentByIdController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getComponentByIdService(req);

    console.log({ "COMPONENT LIST": componentList });

    switch (componentList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg =
          "Bad request, could not get a component with the requested id. Check if the component exist into the database";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getComponentByIdController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

module.exports = {
  addComponentController,
  getAllComponentController,
  getComponentByIdController,
};
