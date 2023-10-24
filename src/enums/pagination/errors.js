/**
 * @description pagination errors names
 * @returns the name value of the pagination error
 * @example
 */
const paginationNameValueError = {
  ORDER_BY_NAME_VALUE_ERROR: 'OrderByNameValueError',
  ORDER_AT_NAME_VALUE_ERROR: 'OrderAtNameValueError',
};

/**
 * @description pagination errors description
 * @returns the description value of the pagination error
 * @example
 */
const paginationDescriptionValueError = {
  ORDER_BY_DESCRIPTION_VALUE_ERROR:
    'It is not possible to apply sorting based on the requested orderBy value. Invalid field',
  ORDER_AT_DESCRIPTION_VALUE_ERROR:
    'It is not possible to apply sorting based on the requested orderAt value. Invalid field',
};

module.exports = { paginationNameValueError, paginationDescriptionValueError };
