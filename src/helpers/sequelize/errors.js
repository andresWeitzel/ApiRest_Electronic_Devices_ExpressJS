//Enums
const {
  sequelizeConstraint,
  sequelizeConnection,
} = require('../../enums/sequelize/errors');
//Const-vars
let check;

/**
 * @description check all sequelize errors according to the defined enumerates
 * @param {object} error error type
 * @param {string} msg string type
 * @returns the type of error with msg
 */
const checkErrors = async (error, msg) => {
  try {
    check = null;
    if (error != (null || undefined)) {
      check =
        error.name.toLowerCase() ==
          sequelizeConstraint.UNIQUE_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConstraint.FOREIGN_KEY_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConstraint.EXCLUSION_CONSTRAINT_ERROR.toLowerCase() ||
        sequelizeConnection.CONNECTION_ERROR.toLowerCase() ||
        sequelizeConnection.CONNECTION_REFUSED_ERROR.toLowerCase() ||
        sequelizeConnection.INVALID_CONNECTION_ERROR.toLowerCase() ||
        sequelizeConnection.CONNECTION_TIMEOUT_ERROR.toLowerCase()
          ? `${error.name} : ${error.parent?.detail || error.parent?.error}`
          : msg;
    } else {
      check = msg;
    }
  } catch (error) {
    msg = `Error in checkErrors() function. Caused by ${error}.`;
    console.log(msg);
  }

  return check;
};

module.exports = {
  checkErrors,
};
