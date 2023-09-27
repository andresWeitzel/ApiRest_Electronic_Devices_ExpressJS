//External
require("dotenv").config();
//Services
const {
  getAllComponentDetailService, addComponentDetailService
} = require("../services/component-detail.service");
//Enums
const { statusName, statusDetails } = require("../enums/database/status");
const { statusCode } = require("../enums/http/status-code");
const { value } = require("../enums/general/value");
//Const-vars
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
const statusConnectionError = statusName.CONNECTION_ERROR;
const statusConnectionErrorDetail = statusDetails.CONNECTION_ERROR_DETAIL;
const statusConnectionRefused = statusName.CONNECTION_REFUSED;
const statusConnectionRefusedDetail = statusDetails.CONNECTION_REFUSED_DETAIL;
let newComponentDetail;
let componentDetailList;
let msg;
let code;

/**
 * @description add a component detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentDetailController = async (req, res) => {
  try {
    msg = null;
    newComponentDetail = await addComponentDetailService(req);

    switch (newComponentDetail) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res
          .status(statusCodeBadRequest)
          .send({
            error: "Bad request, could not add a component detail to database."
          });
        break;
      default:
        if (
          typeof newComponentDetail === "object" &&
          newComponentDetail.hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(newComponentDetail);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: newComponentDetail });
        break;
    }
  } catch (error) {
    msg = {
      error: `Error in addComponentDetailController() function. Caused by ${error}`
    };
    console.log(msg);
    res.status(statusCodeInternalServerError).send(msg);
  }
};



/**
 * @description get all paginated components details to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentDetailsController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentDetailList = await getAllComponentDetailService(req);

    switch (componentDetailList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res
          .status(statusCodeBadRequest)
          .send({
            error:
              "Bad request, could not get all paginated list component details."
          });
        break;
      default:
        if (
          typeof componentDetailList === "object" &&
          componentDetailList[0]?.hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentDetailList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentDetailList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentDetailsController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

module.exports = {
  addComponentDetailController,
  getAllComponentDetailsController
};
