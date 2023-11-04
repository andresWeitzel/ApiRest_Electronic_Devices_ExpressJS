//Models
const { ComponentDetail } = require('../../models/sequelize/component-detail');
//Enums
const { statusName } = require('../../enums/database/status');
const { checkErrors } = require('../../helpers/sequelize/errors');
//Const-vars
let msg;
let params;
let idParam;
let deleteComponentDetail;

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
                  objectDeleted: `Se ha eliminado correctamente el detalle de componente según el id ${idParam}`,
                }
              : {
                  objectDeleted: `No se ha eliminado el detalle del componente según el id ${idParam}. Comprobar si el mismo existe en la db.`,
                };
        })
        .catch(async (error) => {
          msg = `Error in deleteComponentDetailService() function when trying to delete a component detail. Caused by ${error}`;
          console.log(msg);

          deleteComponentDetail = await checkErrors(error, error.name);
        });
    } else {
      deleteComponentDetail = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED,
      );
    }
  } catch (error) {
    msg = `Error in deleteComponentDetailService() function. Caused by ${error}`;
    console.log(msg);
    deleteComponentDetail = await checkErrors(
      error,
      statusName.CONNECTION_ERROR,
    );
  }
  return deleteComponentDetail;
};

module.exports = {
  deleteComponentDetailService,
};
