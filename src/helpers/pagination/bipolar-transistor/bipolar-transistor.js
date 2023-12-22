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
      case 'id':
        orderBy = 'id';
        break;
      case 'id_componente':
      case 'id componente':
      case 'idcomponente':
        orderBy = 'id_componente';
        break;
      case 'tipo':
        orderBy = 'tipo';
        break;
      case 'voltaje_colec_emis':
      case 'voltaje colec emis':
      case 'voltaje colector emisor':
      case 'voltajecolecemis':
        orderBy = 'voltaje_colec_emis';
        break;
      case 'voltaje_colec_base':
      case 'voltaje colec base':
      case 'voltaje colector base':
      case 'voltajecolecbase':
        orderBy = 'voltaje_colec_base';
        break;
      case 'voltaje_emis_base':
      case 'voltaje emis base':
      case 'voltaje emisor base':
      case 'voltajeemisbase':
        orderBy = 'voltaje_emis_base';
        break;
      case 'voltaje_colec_emis_sat':
      case 'voltaje colec emis sat':
      case 'voltaje colector emisor saturacion':
      case 'voltajecolecemissat':
        orderBy = 'voltaje_colec_emis_sat';
        break;
      case 'corriente_colec':
      case 'corriente colec':
      case 'corriente colector':
      case 'corrientecolec':
        orderBy = 'corriente_colec';
        break;
      case 'ganancia_hfe':
      case 'ganancia hfe':
      case 'gananciahfe':
        orderBy = 'ganancia_hfe';
        break;
      case 'disip_max':
      case 'disip max':
      case 'disipacion maxima':
      case 'disipmax':
        orderBy = 'disip_max';
        break;
      case 'temp_juntura':
      case 'temp juntura':
      case 'temperatura juntura':
      case 'tempjuntura':
        orderBy = 'temp_juntura';
        break;
      default:
        orderBy = null;
    }
    return orderBy;
  } catch (error) {
    msgResponse =
      'ERROR in checkOrderBy() helper function from bipolar-transistor.js.';
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
