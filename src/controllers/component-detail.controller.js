//External
require("dotenv").config();
//Services
const { getAllComponentDetailService } = require("../services/component-detail.service");
//Enums
const { statusName } = require("../enums/database/status");
const { statusCode } = require("../enums/http/status-code");
const { value } = require("../enums/general/value");
//Const-vars
let newComponent;
let msg;
let code;



/**
 * @description get all paginated components to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentDetailController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentDetailList = await getAllComponentDetailService(req);

    switch (componentDetailList) {
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
        msg = "Bad request, could not get all paginated list component details.";
        res.status(code).send(msg);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentDetailList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentDetailController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};




module.exports = {
    getAllComponentDetailController,
  
};