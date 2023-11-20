//External
require("dotenv").config();
//Services
const {
  getAllWithAttributesBipolarTransistor,
} = require("../../services/bipolar-transistor/get-all-with-attributes");
//Enums
const { statusName, statusDetails } = require("../../enums/database/status");
const { statusCode } = require("../../enums/http/status-code");
//Const
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
//Vars
let componentDetailList;
let msgResponse;
let msgLog;

/**
 * @description get all paginated bipolar transistor with attributes to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesBipolarTransistorController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;

    componentDetailList = await getAllWithAttributesBipolarTransistor(req);

    switch (componentDetailList) {
      case CONNECTION_ERROR_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_ERROR_STATUS_DETAIL });
        break;
      case CONNECTION_REFUSED_STATUS:
        res
          .status(INTERNAL_SERVER_ERROR_CODE)
          .send({ error: CONNECTION_REFUSED_STATUS_DETAIL });
        break;
      case 0:
      case undefined:
      case null:
        res.status(BAD_REQUEST_CODE).send({
          error:
            "Bad request, could not get all paginated list bipolar transistor with attributes.",
        });
        break;
      default:
        if (
          typeof componentDetailList === "object" &&
          componentDetailList[0]?.hasOwnProperty("id")
        ) {
          res.status(OK_CODE).send(componentDetailList);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: componentDetailList });
        break;
    }
  } catch (error) {
    msgResponse =
      "ERROR in getAllWithAttributesBipolarTransistorController() function.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send(msgResponse);
  }
};

module.exports = {
  getAllWithAttributesBipolarTransistorController,
};
