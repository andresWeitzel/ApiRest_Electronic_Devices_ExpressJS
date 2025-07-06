"use strict";
//Helpers
const {
  checkOrderBy
} = require("../../../../../helpers/pagination/component-detail/component-detail");
//Const
const MOCK_NUMBER_VALUE = process.env.MOCK_NUMBER_01;
const MOCK_STRING_VALUE = process.env.MOCK_STRING_01;
const MOCK_BOOLEAN_VALUE = process.env.MOCK_BOOLEAN_01;
const MOCK_ID_NAME_VALUE = process.env.MOCK_ID_NAME;
const MOCK_DATASHEET_NAME_VALUE = process.env.MOCK_DATASHEET_NAME;
const MOCK_VOLUME_NAME_VALUE = process.env.MOCK_VOLUME_NAME;
//Vars
let mockDatasheetNameModifiedValue = MOCK_DATASHEET_NAME_VALUE;
let mockOrderAtAscNameValue = process.env.MOCK_ORDER_AT_ASC_NAME;
let mockOrderAtDescNameValue = process.env.MOCK_ORDER_AT_DESC_NAME;
let msg;
let checkOrderByResult;
let checkOrderAtResult;

describe("- checkOrderBy helper (Unit Test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg =
      "Should return a string value if a valid string argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_DATASHEET_NAME_VALUE);
      await expect(typeof checkOrderByResult == "string").toBe(true);
    });

    msg =
      "Should return a null value if a invalid string argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_VOLUME_NAME_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a number type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a boolean type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_BOOLEAN_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return null if others invalid arguments are passed (this function expects a string argument).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(
        MOCK_BOOLEAN_VALUE,
        MOCK_NUMBER_VALUE,
        MOCK_STRING_VALUE
      );
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a null value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(null);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a undefined value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(undefined);
      await expect(checkOrderByResult == null).toBe(true);
    });
  });

  describe("2) Check cases for return cases.", () => {
    msg =
      "Should return a string type with 'id' value if a 'id' or 'ID' value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_ID_NAME_VALUE);
      await expect(checkOrderByResult == MOCK_ID_NAME_VALUE).toBe(true);
      checkOrderByResult = await checkOrderBy(MOCK_ID_NAME_VALUE.toUpperCase());
      await expect(checkOrderByResult == MOCK_ID_NAME_VALUE).toBe(true);
    });

    msg =
      "Should return a string type with 'hoja_de_datos' value if a 'hoja_de_datos' or 'hoja de datos' or etc value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_DATASHEET_NAME_VALUE);
      await expect(checkOrderByResult == MOCK_DATASHEET_NAME_VALUE).toBe(true);
      checkOrderByResult = await checkOrderBy(
        MOCK_DATASHEET_NAME_VALUE.toUpperCase()
      );
      await expect(checkOrderByResult == MOCK_DATASHEET_NAME_VALUE).toBe(true);
      mockDatasheetNameModifiedValue = "hoja de datos";
      checkOrderByResult = await checkOrderBy(mockDatasheetNameModifiedValue);
      await expect(checkOrderByResult == MOCK_DATASHEET_NAME_VALUE).toBe(true);
    });

  });

});
