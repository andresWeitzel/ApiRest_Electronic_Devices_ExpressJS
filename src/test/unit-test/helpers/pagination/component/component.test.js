"use strict";
//Helpers
const {
  checkOrderBy,
  checkOrderAt,
} = require("../../../../../helpers/pagination/component/component");
//Const
const MOCK_NUMBER_VALUE = process.env.MOCK_NUMBER_01;
const MOCK_BOOLEAN_VALUE = process.env.MOCK_BOOLEAN_01;
const MOCK_ID_NAME_VALUE = process.env.MOCK_ID_NAME;
const MOCK_CODE_NAME_VALUE = process.env.MOCK_CODE_NAME;
const MOCK_NRO_PART_NAME_VALUE = process.env.MOCK_NRO_PART_NAME;
const MOCK_ORDER_AT_ASC_NAME_VALUE = process.env.MOCK_ORDER_AT_ASC_NAME;
const MOCK_ORDER_AT_DESC_NAME_VALUE = process.env.MOCK_ORDER_AT_DESC_NAME;
//Vars
let mockCodeNameModifiedValue = MOCK_CODE_NAME_VALUE;
let mockNroPartNameModifiedValue = MOCK_NRO_PART_NAME_VALUE;
let msg;
let checkOrderByResult;
let checkOrderAtResult;

//Review catch cases

describe("- checkOrderBy helper (Unit Test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg =
      "Should return a string value if string argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_CODE_NAME_VALUE);
      await expect(typeof checkOrderByResult == "string").toBe(true);
    });

    msg =
      "Should return a null value if number type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return a null value if boolean type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_BOOLEAN_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg =
      "Should return a null value if others arguments are passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(
        MOCK_BOOLEAN_VALUE,
        MOCK_NUMBER_VALUE,
        MOCK_CODE_NAME_VALUE
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

    msg =
      "Should return a null value if a number value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
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
      "Should return a string type with 'codigo' value if a 'codigo', 'code', 'CODE' or 'CODIGO' value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_CODE_NAME_VALUE);
      await expect(checkOrderByResult == MOCK_CODE_NAME_VALUE).toBe(true);
      checkOrderByResult = await checkOrderBy(
        MOCK_CODE_NAME_VALUE.toUpperCase()
      );
      await expect(checkOrderByResult == MOCK_CODE_NAME_VALUE).toBe(true);
      mockCodeNameModifiedValue = "code";
      checkOrderByResult = await checkOrderBy(mockCodeNameModifiedValue);
      await expect(checkOrderByResult == MOCK_CODE_NAME_VALUE).toBe(true);
      checkOrderByResult = await checkOrderBy(
        MOCK_CODE_NAME_VALUE.toUpperCase()
      );
      await expect(checkOrderByResult == MOCK_CODE_NAME_VALUE).toBe(true);
    });

    msg =
      "Should return a string type with 'nro_pieza' value if a 'NRO_PIEZA', 'nro_pieza', 'nropieza', 'nropart' value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_NRO_PART_NAME_VALUE);
      await expect(checkOrderByResult == MOCK_NRO_PART_NAME_VALUE).toBe(true);
      checkOrderByResult = await checkOrderBy(
        MOCK_NRO_PART_NAME_VALUE.toUpperCase()
      );
      await expect(checkOrderByResult == MOCK_NRO_PART_NAME_VALUE).toBe(true);
      mockNroPartNameModifiedValue = "nro pieza";
      checkOrderByResult = await checkOrderBy(mockNroPartNameModifiedValue);
      await expect(checkOrderByResult == MOCK_NRO_PART_NAME_VALUE).toBe(true);
      checkOrderByResult = await checkOrderBy(
        MOCK_NRO_PART_NAME_VALUE.toUpperCase()
      );
      await expect(checkOrderByResult == MOCK_NRO_PART_NAME_VALUE).toBe(true);
    });

    // -- The number of tests is simplified for each case, add here if necessary --
  });

  describe("3) Check cases for error.", () => {
    msg =
      "Should not return a error message if no argument is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy();
      await expect(async () => checkOrderByResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if not string argument is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
      await expect(async () => checkOrderByResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if a valid argument is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_CODE_NAME_VALUE);
      await expect(async () => checkOrderByResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if a new Error is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(new Error());
      await expect(async () => checkOrderByResult).not.toThrow(Error);
    });
  });
});

describe("- checkOrderAt helper (Unit Test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg =
      "Should return a string value if string argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_ORDER_AT_ASC_NAME_VALUE);
      await expect(typeof checkOrderAtResult == "string").toBe(true);
    });

    msg =
      "Should return a null value if number type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_NUMBER_VALUE);
      await expect(checkOrderAtResult == null).toBe(true);
    });

    msg =
      "Should return a null value if boolean type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_BOOLEAN_VALUE);
      await expect(checkOrderAtResult == null).toBe(true);
    });

    msg =
      "Should return a null value if other arguments are passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(
        MOCK_BOOLEAN_VALUE,
        MOCK_NUMBER_VALUE,
        MOCK_CODE_NAME_VALUE
      );
      await expect(checkOrderAtResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a null value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(null);
      await expect(checkOrderAtResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a undefined value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(undefined);
      await expect(checkOrderAtResult == null).toBe(true);
    });

    msg =
      "Should return a null value if a number value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_NUMBER_VALUE);
      await expect(checkOrderAtResult == null).toBe(true);
    });
  });

  describe("2) Check cases for return cases.", () => {
    msg =
      "Should return a string type with 'ASC' value if a 'asc' or 'ASC' value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_ORDER_AT_ASC_NAME_VALUE);
      await expect(checkOrderAtResult == MOCK_ORDER_AT_ASC_NAME_VALUE).toBe(
        true
      );
      checkOrderAtResult = await checkOrderAt(
        MOCK_ORDER_AT_ASC_NAME_VALUE.toLowerCase()
      );
      await expect(checkOrderAtResult == MOCK_ORDER_AT_ASC_NAME_VALUE).toBe(
        true
      );
    });

    msg =
      "Should return a string type with 'DESC' value if a 'desc' or 'DESC' value is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_ORDER_AT_DESC_NAME_VALUE);
      await expect(checkOrderAtResult == MOCK_ORDER_AT_DESC_NAME_VALUE).toBe(
        true
      );
      checkOrderAtResult = await checkOrderAt(
        MOCK_ORDER_AT_DESC_NAME_VALUE.toLowerCase()
      );
      await expect(checkOrderAtResult == MOCK_ORDER_AT_DESC_NAME_VALUE).toBe(
        true
      );
    });
  });

  describe("3) Check cases for error.", () => {
    msg =
      "Should not return a error message if no argument is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt();
      await expect(async () => checkOrderAtResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if not string argument is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_NUMBER_VALUE);
      await expect(async () => checkOrderAtResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if a valid argument is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(MOCK_ORDER_AT_ASC_NAME_VALUE);
      await expect(async () => checkOrderAtResult).not.toThrow(Error);
    });

    msg =
      "Should not return a error message if a new Error is passed to the function (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderAtResult = await checkOrderAt(new Error());
      await expect(async () => checkOrderAtResult).not.toThrow(Error);
    });
  });
});
