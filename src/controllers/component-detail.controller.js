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
let msgResponse;
let msgLog;
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
    msgResponse = null;
    code = null;

    componentDetailList = await getAllComponentDetailService(req);

    switch (componentDetailList) {
      case statusName.CONNECTION_ERROR:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msgResponse =
          "ERROR. An error has occurred with the connection or query to the database.";
        res.status(code).send(msgResponse);
        break;
      case statusName.CONNECTION_REFUSED:
        code = statusCode.INTERNAL_SERVER_ERROR;
        msgResponse = `ECONNREFUSED. An error has occurred in the process operations and queries with the database Caused by SequelizeConnectionRefusedError: connect ECONNREFUSED ${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}.`;
        res.status(code).send(msgResponse);
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        code = statusCode.BAD_REQUEST;
        msgResponse = "BAD REQUEST, could not get all paginated list component details.";
        res.status(code).send(msgResponse);
        break;
      default:
        code = statusCode.OK;
        res.status(code).send(componentDetailList);
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msgResponse = 'ERROR in getAllComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`; 
    console.log(msgLog);
    res.status(code).send(msgResponse);
  }
};




module.exports = {
    getAllComponentDetailController,
  
};