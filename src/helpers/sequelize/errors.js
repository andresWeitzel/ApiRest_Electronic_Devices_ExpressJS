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
      const name = String(error.name || '').toLowerCase();
      const constraintErrors = [
        sequelizeConstraint.UNIQUE_CONSTRAINT_ERROR,
        sequelizeConstraint.FOREIGN_KEY_CONSTRAINT_ERROR,
        sequelizeConstraint.EXCLUSION_CONSTRAINT_ERROR,
      ].map((v) => v.toLowerCase());
      const connectionErrors = [
        sequelizeConnection.CONNECTION_ERROR,
        sequelizeConnection.CONNECTION_REFUSED_ERROR,
        sequelizeConnection.INVALID_CONNECTION_ERROR,
        sequelizeConnection.CONNECTION_TIMEOUT_ERROR,
      ].map((v) => v.toLowerCase());

      const isKnown =
        constraintErrors.includes(name) || connectionErrors.includes(name);
      const detail =
        error.parent?.detail ||
        error.parent?.message ||
        error.original?.message ||
        error.message;

      check = isKnown
        ? `${error.name} : ${detail || 'unknown'}`
        : detail
          ? `${error.name || 'Error'} : ${detail}`
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
