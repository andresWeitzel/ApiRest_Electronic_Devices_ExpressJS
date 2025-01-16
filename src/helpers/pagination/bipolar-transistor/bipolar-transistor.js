const { component } = require("../../../enums/names/fields");

//Const-vars
let msgResponse;
let msgLog;

// /**
//  * @description checks the order by value of the query string param to assign a field value
//  * @param {String} orderBy String type
//  * @returns a string with the field value or null
//  */
// const checkOrderBy = async (orderBy) => {
//   try {
//     msgResponse = null;
//     msgLog = null;

//     switch (orderBy.toLowerCase()) {
//       case 'id':
//         orderBy = 'id';
//         break;
//       case 'id_componente':
//       case 'id componente':
//       case 'idcomponente':
//         orderBy = 'id_componente';
//         break;
//       case 'tipo':
//         orderBy = 'tipo';
//         break;
//       case 'voltaje_colec_emis':
//       case 'voltaje colec emis':
//       case 'voltaje colector emisor':
//       case 'voltajecolecemis':
//         orderBy = 'voltaje_colec_emis';
//         break;
//       case 'voltaje_colec_base':
//       case 'voltaje colec base':
//       case 'voltaje colector base':
//       case 'voltajecolecbase':
//         orderBy = 'voltaje_colec_base';
//         break;
//       case 'voltaje_emis_base':
//       case 'voltaje emis base':
//       case 'voltaje emisor base':
//       case 'voltajeemisbase':
//         orderBy = 'voltaje_emis_base';
//         break;
//       case 'voltaje_colec_emis_sat':
//       case 'voltaje colec emis sat':
//       case 'voltaje colector emisor saturacion':
//       case 'voltajecolecemissat':
//         orderBy = 'voltaje_colec_emis_sat';
//         break;
//       case 'corriente_colec':
//       case 'corriente colec':
//       case 'corriente colector':
//       case 'corrientecolec':
//         orderBy = 'corriente_colec';
//         break;
//       case 'ganancia_hfe':
//       case 'ganancia hfe':
//       case 'gananciahfe':
//         orderBy = 'ganancia_hfe';
//         break;
//       case 'disip_max':
//       case 'disip max':
//       case 'disipacion maxima':
//       case 'disipmax':
//         orderBy = 'disip_max';
//         break;
//       case 'temp_juntura':
//       case 'temp juntura':
//       case 'temperatura juntura':
//       case 'tempjuntura':
//         orderBy = 'temp_juntura';
//         break;
//       default:
//         orderBy = null;
//     }
//     return orderBy;
//   } catch (error) {
//     msgResponse =
//       'ERROR in checkOrderBy() helper function from bipolar-transistor.js.';
//     msgLog = msgResponse + `Caused by ${error}`;
//     console.log(msgLog);
//     return null;
//   }
// };

/**
 * @description Maps and validates the "orderBy" query string parameter to a specific field value
 * @param {String} orderBy The input string
 * @returns {String|null} The mapped field value or null if invalid
 */
const checkOrderBy = async (orderBy) => {
  try {
    if (typeof orderBy !== "string") return null;

    // const orderByMapping = {
    //   [component.ID]: component.ID,
    //   [component.ID.toUpperCase()]: component.ID,
    //   id_componente: orderByFields.ID_COMPONENTE,
    //   "id componente": orderByFields.ID_COMPONENTE,
    //   idcomponente: orderByFields.ID_COMPONENTE,
    //   tipo: orderByFields.TIPO,
    //   voltaje_colec_emis: orderByFields.VOLTAJE_COLEC_EMIS,
    //   "voltaje colec emis": orderByFields.VOLTAJE_COLEC_EMIS,
    //   "voltaje colector emisor": orderByFields.VOLTAJE_COLEC_EMIS,
    //   voltajecolecemis: orderByFields.VOLTAJE_COLEC_EMIS,
    //   voltaje_colec_base: orderByFields.VOLTAJE_COLEC_BASE,
    //   "voltaje colec base": orderByFields.VOLTAJE_COLEC_BASE,
    //   "voltaje colector base": orderByFields.VOLTAJE_COLEC_BASE,
    //   voltajecolecbase: orderByFields.VOLTAJE_COLEC_BASE,
    //   voltaje_emis_base: orderByFields.VOLTAJE_EMIS_BASE,
    //   "voltaje emis base": orderByFields.VOLTAJE_EMIS_BASE,
    //   "voltaje emisor base": orderByFields.VOLTAJE_EMIS_BASE,
    //   voltajeemisbase: orderByFields.VOLTAJE_EMIS_BASE,
    //   voltaje_colec_emis_sat: orderByFields.VOLTAJE_COLEC_EMIS_SAT,
    //   "voltaje colec emis sat": orderByFields.VOLTAJE_COLEC_EMIS_SAT,
    //   "voltaje colector emisor saturacion": orderByFields.VOLTAJE_COLEC_EMIS_SAT,
    //   voltajecolecemissat: orderByFields.VOLTAJE_COLEC_EMIS_SAT,
    //   corriente_colec: orderByFields.CORRIENTE_COLEC,
    //   "corriente colec": orderByFields.CORRIENTE_COLEC,
    //   "corriente colector": orderByFields.CORRIENTE_COLEC,
    //   corrientecolec: orderByFields.CORRIENTE_COLEC,
    //   ganancia_hfe: orderByFields.GANANCIA_HFE,
    //   "ganancia hfe": orderByFields.GANANCIA_HFE,
    //   gananciahfe: orderByFields.GANANCIA_HFE,
    //   disip_max: orderByFields.DISIP_MAX,
    //   "disip max": orderByFields.DISIP_MAX,
    //   "disipacion maxima": orderByFields.DISIP_MAX,
    //   disipmax: orderByFields.DISIP_MAX,
    //   temp_juntura: orderByFields.TEMP_JUNTURA,
    //   "temp juntura": orderByFields.TEMP_JUNTURA,
    //   "temperatura juntura": orderByFields.TEMP_JUNTURA,
    //   tempjuntura: orderByFields.TEMP_JUNTURA,
    // };


    const orderByMapping = {
      [component.ID]: component.ID,
      // [component.ID.toUpperCase()]: component.ID,
      // [component.ID_COMPONENTE]: component.ID_COMPONENTE,
      // [component.ID_COMPONENTE.toUpperCase()]: component.ID_COMPONENTE,
      // [component.ID_COMPONENTE.replace(/_/g, " ").toLowerCase()]: component.ID_COMPONENTE,
      // [component.TIPO]: component.TIPO,
      // [component.VOLTAJE_COLEC_EMIS]: component.VOLTAJE_COLEC_EMIS,
      // "voltaje colec emis": component.VOLTAJE_COLEC_EMIS,
      // "voltaje colector emisor": component.VOLTAJE_COLEC_EMIS,
      // voltajecolecemis: component.VOLTAJE_COLEC_EMIS,
      // [component.VOLTAJE_COLEC_BASE]: component.VOLTAJE_COLEC_BASE,
      // "voltaje colec base": component.VOLTAJE_COLEC_BASE,
      // "voltaje colector base": component.VOLTAJE_COLEC_BASE,
      // voltajecolecbase: component.VOLTAJE_COLEC_BASE,
      // [component.VOLTAJE_EMIS_BASE]: component.VOLTAJE_EMIS_BASE,
      // "voltaje emis base": component.VOLTAJE_EMIS_BASE,
      // "voltaje emisor base": component.VOLTAJE_EMIS_BASE,
      // voltajeemisbase: component.VOLTAJE_EMIS_BASE,
      // [component.VOLTAJE_COLEC_EMIS_SAT]: component.VOLTAJE_COLEC_EMIS_SAT,
      // "voltaje colec emis sat": component.VOLTAJE_COLEC_EMIS_SAT,
      // "voltaje colector emisor saturacion": component.VOLTAJE_COLEC_EMIS_SAT,
      // voltajecolecemissat: component.VOLTAJE_COLEC_EMIS_SAT,
      // [component.CORRIENTE_COLEC]: component.CORRIENTE_COLEC,
      // "corriente colec": component.CORRIENTE_COLEC,
      // "corriente colector": component.CORRIENTE_COLEC,
      // corrientecolec: component.CORRIENTE_COLEC,
      // [component.GANANCIA_HFE]: component.GANANCIA_HFE,
      // "ganancia hfe": component.GANANCIA_HFE,
      // gananciahfe: component.GANANCIA_HFE,
      // [component.DISIP_MAX]: component.DISIP_MAX,
      // "disip max": component.DISIP_MAX,
      // "disipacion maxima": component.DISIP_MAX,
      // disipmax: component.DISIP_MAX,
      // [component.TEMP_JUNTURA]: component.TEMP_JUNTURA,
      // "temp juntura": component.TEMP_JUNTURA,
      // "temperatura juntura": component.TEMP_JUNTURA,
      // tempjuntura: component.TEMP_JUNTURA,
    };

    return orderByMapping[orderBy.toLowerCase()] || null;
  } catch (error) {
    msgResponse =
      "ERROR in checkOrderBy() helper function from bipolar-transistor.js.";
    msgLog = msgResponse + ` Caused by ${error}`;
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
      case 'asc':
        orderAt = 'ASC';
        break;
      case 'desc':
        orderAt = 'DESC';
        break;
      default:
        orderAt = null;
    }
    return orderAt;
  } catch (error) {
    msgResponse =
      'ERROR in checkOrderAt() helper function from bipolar-transistor.js.';
    msgLog = msgResponse + `Caused by ${error}`;
    console.log(msgLog);
    return null;
  }
};

module.exports = {
  checkOrderBy,
  checkOrderAt,
};
