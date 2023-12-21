//Const-vars
let msgResponse;
let msgLog;

/**
 * @description checks the order by value of the query string param to assign a field value
 * @param {String} orderBy String type
 * @returns a string with the field value or null
 */
const checkOrderBy = async (orderBy) => {
  try {
    msgResponse = null;
    msgLog = null;

    switch (orderBy.toLowerCase()) {
      case "id":
        orderBy = "id";
        break;
      case "hojadedatos":
      case "hoja de datos":
      case "hoja_de_datos":
        orderBy = "hoja_de_datos";
        break;
      case "longitud":
        orderBy = "longitud";
        break;
      case "ancho":
        orderBy = "ancho";
        break;
      case "peso":
        orderBy = "peso";
        break;
      case "material":
        orderBy = "material";
        break;
      case "voltajerrecomendado":
      case "voltaje recomendado":
      case "voltaje_recomendado":
        orderBy = "voltaje_recomendado";
        break;
      case "voltajeminentrada":
      case "voltaje min entrada":
      case "voltaje_min_entrada":
        orderBy = "voltaje_min_entrada";
        break;
      case "voltajemaxentrada":
      case "voltaje max entrada":
      case "voltaje_max_entrada":
        orderBy = "voltaje_max_entrada";
        break;
      default:
        orderBy = null;
    }
    return orderBy;
  } catch (error) {
    msgResponse = "ERROR in checkOrderBy() helper function from component-detail.js.";
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
    msgResponse = null;
    msgLog = null;

    switch (orderAt.toLowerCase()) {
      case "asc":
        orderAt = "ASC";
        break;
      case "desc":
        orderAt = "DESC";
        break;
      default:
        orderAt = null;
    }
    return orderAt;
  } catch (error) {
    msgResponse = "ERROR in checkOrderAt() helper function from component-detail.js.";
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
  checkOrderAt,
};
