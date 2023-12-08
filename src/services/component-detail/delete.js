//Models
const { ComponentDetail } = require("../../models/sequelize/component-detail");
//Enums
const { statusName } = require("../../enums/database/status");
const { checkErrors } = require("../../helpers/sequelize/errors");
//Const
//errors details
const DELETE_COMPONENT_DETAIL_ERROR_DETAIL =
  "Error in deleteComponentDetailService() function.";
const DELETE_OBJECT_DETAILS =
  "Component detail has been successfully removed based on id ";
const DELETE_OBJECT_ERROR_DETAILS =
  "Check if the component detail you want to remove exists in the db. The component detail has not been removed based on the id ";
//status
const CONNECTION_REFUSED_STATUS_NAME = statusName.CONNECTION_REFUSED;
const CONNECTION_ERROR_STATUS_NAME = statusName.CONNECTION_ERROR;
//Vars
let params;
let idParam;
let deleteComponentDetail;
let msgLog;
let msgResponse;

/**
 * @description delete a component detail from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const deleteComponentDetailService = async (req, res) => {
  try {
    deleteComponentDetail = null;
    msg = null;
    params = null;
    idParam = null;
    msgLog = null;
    msgResponse = null;

    //-- start with params ---
    params = req.params;

    if (params != (null && undefined)) {
      idParam = params.id ? params.id : idParam;
    }
    //-- end with params  ---

    if (ComponentDetail != null && idParam != null) {
      await ComponentDetail.destroy({
        where: {
          id: idParam,
        },
      })
        .then(async (componentDetailItem) => {
          deleteComponentDetail =
            componentDetailItem == 1
              ? {
                  objectDeleted: DELETE_OBJECT_DETAILS + idParam,
                }
              : {
                  objectDeleted: DELETE_OBJECT_ERROR_DETAILS + idParam,
                };
        })
        .catch(async (error) => {
          msgResponse = DELETE_COMPONENT_DETAIL_ERROR_DETAIL;
          msgLog = msgResponse + `Caused by ${error}`;
          console.log(msgLog);

          deleteComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      deleteComponentDetail = await checkErrors(
        null,
        CONNECTION_REFUSED_STATUS_NAME
      );
    }
  } catch (error) {
    msgResponse = DELETE_COMPONENT_DETAIL_ERROR_DETAIL;
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);

    deleteComponentDetail = await checkErrors(
      error,
      CONNECTION_ERROR_STATUS_NAME
    );
  }
  return deleteComponentDetail;
};

module.exports = {
  deleteComponentDetailService,
};
