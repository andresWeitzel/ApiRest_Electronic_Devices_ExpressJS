"use strict";
//Enums
const {
  sequelizeContraint,
  sequelizeConnection,
} = require("../../enums/sequelize/errors");
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
    check=null;
    if (error != (null || undefined)) {
      check =
        error.name ==
        (sequelizeContraint.UNIQUE_CONSTRAINT_ERROR ||
          sequelizeContraint.FOREIGN_KEY_CONSTRAINT_ERROR ||
          sequelizeContraint.EXCLUSION_CONSTRAINT_ERROR ||
          sequelizeConnection.CONNECTION_ERROR ||
          sequelizeConnection.CONNECTION_REFUSED_ERROR ||
          sequelizeConnection.INVALID_CONNECTION_ERROR ||
          sequelizeConnection.CONNECTION_TIMEOUT_ERROR)
          ? `${error.name} : ${error.parent?.detail}`
          : msg;
    }else{
      check = msg;
    }
  } catch (error) {
    console.error(
      `Error in checkErrors() function. Caused by ${error}. Specific stack is ${error.stack}`
    );
    check = error;
  }

  return check;
};

module.exports = {
  checkErrors,
};
