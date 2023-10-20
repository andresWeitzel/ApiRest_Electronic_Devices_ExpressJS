//External
require('dotenv').config();
//Services
const {
  getAllComponentDetailService,
  addComponentDetailService,
  updateComponentDetailService,
  deleteComponentDetailService,
  getAllWithAttributesComponentDetailService,
} = require('../services/component-detail.service');
//Enums
const { statusName, statusDetails } = require('../enums/database/status');
const { statusCode } = require('../enums/http/status-code');
//Const-vars
const INTERNAL_SERVER_ERROR_CODE = statusCode.INTERNAL_SERVER_ERROR;
const BAD_REQUEST_CODE = statusCode.BAD_REQUEST;
const OK_CODE = statusCode.OK;
const CONNECTION_ERROR_STATUS = statusName.CONNECTION_ERROR;
const CONNECTION_ERROR_STATUS_DETAIL = statusDetails.CONNECTION_ERROR_DETAIL;
const CONNECTION_REFUSED_STATUS = statusName.CONNECTION_REFUSED;
const CONNECTION_REFUSED_STATUS_DETAIL =
  statusDetails.CONNECTION_REFUSED_DETAIL;
let newComponentDetail;
let updateComponentDetail;
let deletedComponentDetail;
let componentDetailList;
let msgResponse;
let msgLog;

/**
 * @description add a component detail to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentDetailController = async (req, res) => {
  try {
    msgResponse = null;
    msgLog = null;
    newComponentDetail = await addComponentDetailService(req);

    switch (newComponentDetail) {
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
          error: 'Bad request, could not add a component detail to database.',
        });
        break;
      default:
        if (
          typeof newComponentDetail === 'object' &&
          newComponentDetail.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(newComponentDetail);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: newComponentDetail });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in addComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;
    updateComponentDetail = await updateComponentDetailService(req);

    switch (updateComponentDetail) {
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
            'Bad request, could not update a component detail to database.',
        });
        break;
      default:
        if (
          typeof updateComponentDetail === 'object' &&
          updateComponentDetail.hasOwnProperty('objectUpdated')
        ) {
          res.status(OK_CODE).send(updateComponentDetail);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: updateComponentDetail });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in updateComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgResponse = null;
    msgLog = null;
    deletedComponentDetail = await deleteComponentDetailService(req);

    switch (deletedComponentDetail) {
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
        res
          .status(BAD_REQUEST_CODE)
          .send({ error: 'Bad request, could not delete a component detail.' });
        break;
      default:
        if (
          typeof deletedComponentDetail === 'object' &&
          deletedComponentDetail.hasOwnProperty('objectDeleted')
        ) {
          res.status(OK_CODE).send(deletedComponentDetail);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: deletedComponentDetail });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in deleteComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send({ error: msgResponse });
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
    msgLog = null;

    componentDetailList = await getAllComponentDetailService(req);

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
            'Bad request, could not get all paginated list component details.',
        });
        break;
      default:
        if (
          typeof componentDetailList === 'object' &&
          componentDetailList[0]?.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(componentDetailList);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: componentDetailList });
        break;
    }
  } catch (error) {
    msgResponse = 'ERROR in getAllComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send(msgResponse);
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
    msgResponse = null;
    msgLog = null;
    componentDetailList = null;

    componentDetailList = await getAllWithAttributesComponentDetailService(req);

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
            'Bad request, failed to get all paginated components details list according to all attributes.',
        });
        break;
      default:
        if (
          (typeof componentDetailList === 'object' ||
            Array.isArray(componentDetailList)) &&
          componentDetailList[0]?.hasOwnProperty('id')
        ) {
          res.status(OK_CODE).send(componentDetailList);
          break;
        }
        res.status(BAD_REQUEST_CODE).send({ error: componentDetailList });
        break;
    }
  } catch (error) {
    msgResponse =
      'ERROR in getAllWithAttributesComponentDetailController() function.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    res.status(INTERNAL_SERVER_ERROR_CODE).send(msgResponse);
  }
};

module.exports = {
  addComponentDetailController,
  updateComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailController,
  getAllWithAttributesComponentDetailController,
};
