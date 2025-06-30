const { component } = require("../../../enums/names/fields");
const {
  createMappings,
} = require("../../../helpers/validations/format/fields");
//Const-vars
let msgResponse;
let msgLog;

/**
 * @description Checks the "orderBy" query string parameter to map it to a specific field value
 * @param {String} orderBy The input string
 * @returns {String|null} The mapped field value or null if invalid
 */
const checkOrderBy = (orderBy) => {
  try {
    if (typeof orderBy !== "string") {
      return null;
    }

    const orderByMapping = {
      [component.ID]: component.ID,
      [component.ID_COMPONENTE]: component.ID_COMPONENTE,
      [component.TIPO]: component.TIPO,
      [component.CAPACITANCIA]: component.CAPACITANCIA,
      [component.TOLERANCIA]: component.TOLERANCIA,
      [component.RANGO_TEMPERATURA]: component.RANGO_TEMPERATURA,
      [component.RANGO_TENSION_NOMINAL]: component.RANGO_TENSION_NOMINAL,
    };

    const mapping = createMappings(orderByMapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;
  } catch (error) {
    msgResponse =
      "ERROR in checkOrderBy() helper function from electrolytic-capacitor.js.";
    msgLog = msgResponse + ` Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
}; 