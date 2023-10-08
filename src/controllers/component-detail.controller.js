//External
require("dotenv").config();
//Services
const {
  getAllComponentDetailService, addComponentDetailService, updateComponentDetailService, deleteComponentDetailService, getAllWithAttributesComponentDetailService
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
let updateComponentDetail;
let deletedComponentDetail;
let componentDetailList;
let msg;
let newComponent;
let msgResponse;
let msgLog;
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
 * @description update a component detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentDetailController = async (req, res) => {
  try {
    msg = null;
    updateComponentDetail = await updateComponentDetailService(req);

    switch (updateComponentDetail) {
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
            error: "Bad request, could not update a component detail to database."
          });
        break;
      default:
        if (
          typeof updateComponentDetail === "object" &&
          updateComponentDetail.hasOwnProperty("objectUpdated")
        ) {
          res.status(statusCodeOk).send(updateComponentDetail);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: updateComponentDetail });
        break;
    }
  } catch (error) {
    msg = {
      error: `Error in updateComponentDetailController() function. Caused by ${error}`
    };
    console.log(msg);
    res.status(statusCodeInternalServerError).send(msg);
  }
};


/**
 * @description delete a component detail from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentDetailController = async (req, res) => {
  try {
    msg = null;
    deletedComponentDetail = await deleteComponentDetailService(req);

    switch (deletedComponentDetail) {
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
          .send({ error: "Bad request, could not delete a component detail." });
        break;
      default:
        if (
          typeof deletedComponentDetail === "object" &&
          deletedComponentDetail.hasOwnProperty("objectDeleted")
        ) {
          res.status(statusCodeOk).send(deletedComponentDetail);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: deletedComponentDetail });
        break;
    }
  } catch (error) {
    msg = {
      error: `Error in deleteComponentDetailController() function. Caused by ${error}`
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
const getAllComponentDetailController = async (req, res) => {
  try {
    msgResponse = null;
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
    msgResponse = 'ERROR in getAllComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`; 
    console.log(msgLog);
    res.status(code).send(msgResponse);
  }
};

/**
 * @description get all paginated components deatails list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesComponentDetailController = async (req, res) => {
  try {
    msg = null;
    code = null;
    componentDetailList = null;

    componentDetailList = await getAllWithAttributesComponentDetailService(req);

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
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, failed to get all paginated components details list according to all attributes."
        });
        break;
      default:
        if (
          (typeof componentDetailList === "object" || Array.isArray(componentDetailList)) &&
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
    msg = `Error in getAllWithAttributesComponentDetailController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

module.exports = {
  addComponentDetailController,
  updateComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailController,
  getAllWithAttributesComponentDetailController
};
