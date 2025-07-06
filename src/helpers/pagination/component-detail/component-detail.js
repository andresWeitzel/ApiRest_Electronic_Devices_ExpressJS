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
      [component.HOJA_DE_DATOS]: component.HOJA_DE_DATOS,
      [component.LONGITUD]: component.LONGITUD,
      [component.ANCHO]: component.ANCHO,
      [component.PESO]: component.PESO,
      [component.MATERIAL]: component.MATERIAL,
      [component.VOLTAJE_RECOMENDADO]: component.VOLTAJE_RECOMENDADO,
      [component.VOLTAJE_MIN_ENTRADA]: component.VOLTAJE_MIN_ENTRADA,
      [component.VOLTAJE_MAX_ENTRADA]: component.VOLTAJE_MAX_ENTRADA,
    };

    const mapping = createMappings(orderByMapping);

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;
  } catch (error) {
    msgResponse =
      "ERROR in checkOrderBy() helper function from component-detail.js.";
    msgLog = msgResponse + ` Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

/**
 * @description Maps and validates the "orderAt" query string parameter to ASC or DESC
 * @param {String} orderAt The input string
 * @returns {String|null} The mapped direction value or null if invalid
 */
const checkOrderAt = (orderAt) => {
  try {
    if (typeof orderAt !== "string") return null;

    const orderAtMapping = {
      'ASC': 'ASC',
      'asc': 'ASC',
      'Asc': 'ASC',
      'DESC': 'DESC',
      'desc': 'DESC',
      'Desc': 'DESC'
    };

    return orderAtMapping[orderAt] || null;
  } catch (error) {
    msgResponse = "ERROR in checkOrderAt() helper function from component-detail.js";
    msgLog = msgResponse + ` Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  getPagination,
  getPagingData,
  checkOrderBy,
  checkOrderAt,
};
