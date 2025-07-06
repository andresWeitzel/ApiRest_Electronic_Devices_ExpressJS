const { component } = require("../../../enums/names/fields");
const {
  createMappings,
} = require("../../../helpers/validations/format/fields");
//Const-vars
let msgResponse;
let msgLog;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, items, totalPages, currentPage };
};

/**
 * @description Maps and validates the "orderBy" query string parameter to a specific field value
 * @param {String} orderBy The input string
 * @returns {String|null} The mapped field value or null if invalid
 */
const checkOrderBy = (orderBy) => {
  try {
    if (typeof orderBy !== "string") return null;

    const orderByMapping = {
      [component.ID]: component.ID,
      [component.ID_COMPONENTE]: component.ID_COMPONENTE,
      [component.TIPO]: component.TIPO,
      [component.VOLTAJE_DRENAJE_FUENTE]: component.VOLTAJE_DRENAJE_FUENTE,
      [component.CORRIENTE_CC_DRENAJE]: component.CORRIENTE_CC_DRENAJE,
      [component.DISIP_MAX]: component.DISIP_MAX,
      [component.TEMP_OP_MAX]: component.TEMP_OP_MAX,
      [component.CONDUCT_DRENAJE_SUSTRATO]: component.CONDUCT_DRENAJE_SUSTRATO,
      [component.RESIST_DRENAJE_FUENTE]: component.RESIST_DRENAJE_FUENTE,
    };

    const mapping = createMappings(orderByMapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;
  } catch (error) {
    msgResponse =
      "ERROR in checkOrderBy() helper function from mosfet-transistor.js.";
    msgLog = msgResponse + ` Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  getPagination,
  getPagingData,
  checkOrderBy,
}; 