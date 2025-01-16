const { component } = require("../../../enums/names/fields");
const { names } = require("../../../enums/pagination/acronym");
const {
  createMappings,
} = require("../../../helpers/validations/format/fields");

//Const-vars
let msgResponse;
let msgLog;

/**
 * @description Maps and validates the "orderBy" query string parameter to a specific field value
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
      [component.CODIGO]: component.CODIGO,
      [component.CODE]: component.CODIGO,
      [component.IMAGEN]: component.IMAGEN,
      [component.IMAGE]: component.IMAGEN,
      [component.NRO_PIEZA]: component.NRO_PIEZA,
      [component.NRO_PART]: component.NRO_PIEZA,
      // [component.CATEGORIA]: component.CATEGORIA,
      // [component.CATEGORIA.toUpperCase()]: component.CATEGORIA,
      // [component.CATEGORY]: component.CATEGORIA,
      // [component.CATEGORY.toUpperCase()]: component.CATEGORIA,
      // [component.DESCRIPCION]: component.DESCRIPCION,
      // [component.DESCRIPCION.toUpperCase()]: component.DESCRIPCION,
      // [component.DESCRIPTION]: component.DESCRIPCION,
      // [component.DESCRIPTION.toUpperCase()]: component.DESCRIPCION,
      // [component.FABRICANTE]: component.FABRICANTE,
      // [component.FABRICANTE.toUpperCase()]: component.FABRICANTE,
      // [component.MANUFACTURER]: component.FABRICANTE,
      // [component.MANUFACTURER.toUpperCase()]: component.FABRICANTE,
      // [maker]: component.FABRICANTE,
      // [component.STOCK]: component.STOCK,
      // [component.STOCK.toUpperCase()]: component.STOCK,
      // [component.PRECIO]: component.PRECIO,
      // [component.PRECIO.toUpperCase()]: component.PRECIO,
      // [component.PRICE]: component.PRECIO,
      // [component.PRICE.toUpperCase()]: component.PRECIO,
    };

    const mapping = createMappings(orderByMapping);

    console.log(orderBy)
    console.log(mapping)

    // Comprobar si orderBy coincide con alguna de las claves del mapeo
    if (mapping.hasOwnProperty(orderBy)) {
      return mapping[orderBy];
    }

    return null;

  } catch (error) {
    msgResponse = "ERROR in checkOrderBy() helper function from component.js";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

/**
 * @description checks the order at value of the query string param to assign a field value
 * @param {String} orderAt String type
 * @returns a string with the field value or null
 */
const checkOrderAt = async (orderAt) => {
  try {
    if (typeof orderAt != "string") {
      return null;
    }

    const orderAtMapping = {
      [names.ASCENDENTE]: names.ASCENDENTE,
      [names.ASCENDENTE.toLowerCase()]: names.ASCENDENTE,
      [names.DESCENDENTE]: names.DESCENDENTE,
      [names.DESCENDENTE.toLowerCase()]: names.DESCENDENTE,
    };

    return orderAtMapping[orderAt.toLowerCase()] || null;
  } catch (error) {
    msgResponse = "ERROR in checkOrderAt() helper function from component.js";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
  checkOrderAt,
};
