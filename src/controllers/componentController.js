//External
require("dotenv").config();
//Services
const { addComponentService } = require("../services/componentService");
//Enums
const { statusName } = require("../enums/connection/statusName");
const { statusCode } = require("../enums/http/statusCode");
const { value } = require("../enums/general/value");
//Const-vars
let newUser;
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
    newUser = await addComponentService(req);

    switch (newUser) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msg);
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msg =
          `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msg);
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msg = "Bad request, could not add user.";
        res.status(code).send(msg);
      default:
        code = statusCode.OK;
        res.status(code).send(newUser);
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in addComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(newUser);
  }
};

module.exports = {
  addComponentController,
};
