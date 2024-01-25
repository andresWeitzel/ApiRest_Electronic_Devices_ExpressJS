"use strict";
//Helpers
const {
  checkOrderBy,
} = require("../../../../../helpers/pagination/component-detail/component-detail");
//Const
const MOCK_NUMBER_VALUE = process.env.MOCK_NUMBER_01;
const MOCK_BOOLEAN_VALUE = process.env.MOCK_BOOLEAN_01;
//Vars
let mockIdNameValue = process.env.MOCK_ID_NAME;
let mockDatasheetValue = process.env.MOCK_DATASHEET_NAME;
let mockVolumeValue = process.env.MOCK_VOLUME_NAME;
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
      checkOrderByResult = await checkOrderBy(mockDatasheetValue);
      await expect(typeof checkOrderByResult == "string").toBe(true);
    });

    msg =
      "Should return a null value if a invalid string argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(mockVolumeValue);
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

    // msg =
    //   "Should return a null value if others arguments are passed (This function expects one argument of type string).";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy(
    //     MOCK_BOOLEAN_VALUE,
    //     MOCK_NUMBER_VALUE,
    //     mockDatasheetValue
    //   );
    //   await expect(checkOrderByResult == null).toBe(true);
    // });

    // msg =
    //   "Should return a null value if a null value is passed (This function expects one argument of type string).";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy(null);
    //   await expect(checkOrderByResult == null).toBe(true);
    // });

    // msg =
    //   "Should return a null value if a undefined value is passed (This function expects one argument of type string).";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy(undefined);
    //   await expect(checkOrderByResult == null).toBe(true);
    // });

    // msg =
    //   "Should return a null value if a number value is passed (This function expects one argument of type string).";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
    //   await expect(checkOrderByResult == null).toBe(true);
    // });
  });

  //   describe("2) Check cases for return cases.", () => {
  //     msg =
  //       "Should return a string type with 'id' value if a 'id' or 'ID' value is passed (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy(mockIdNameValue);
  //       await expect(checkOrderByResult == "id").toBe(true);
  //       checkOrderByResult = await checkOrderBy(mockIdNameValue.toUpperCase());
  //       await expect(checkOrderByResult == "id").toBe(true);
  //     });

  //     msg =
  //       "Should return a string type with 'codigo' value if a 'codigo', 'code', 'CODE' or 'CODIGO' value is passed (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy(mockDatasheetValue);
  //       await expect(checkOrderByResult == "codigo").toBe(true);
  //       checkOrderByResult = await checkOrderBy(mockDatasheetValue.toUpperCase());
  //       await expect(checkOrderByResult == "codigo").toBe(true);
  //       mockDatasheetValue = "code";
  //       checkOrderByResult = await checkOrderBy(mockDatasheetValue);
  //       await expect(checkOrderByResult == "codigo").toBe(true);
  //       checkOrderByResult = await checkOrderBy(mockDatasheetValue.toUpperCase());
  //       await expect(checkOrderByResult == "codigo").toBe(true);
  //     });

  //     msg =
  //       "Should return a string type with 'nro_pieza' value if a 'NRO_PIEZA', 'nro_pieza', 'nropieza', 'nropart' value is passed (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy(mockNroPartNameValue);
  //       await expect(checkOrderByResult == mockNroPartNameValue).toBe(true);
  //       checkOrderByResult = await checkOrderBy(
  //         mockNroPartNameValue.toUpperCase()
  //       );
  //       await expect(checkOrderByResult == mockNroPartNameValue).toBe(true);
  //       mockNroPartNameValue = "nropart";
  //       checkOrderByResult = await checkOrderBy(mockNroPartNameValue);
  //       console.log(checkOrderByResult);
  //       await expect(checkOrderByResult == "nro_pieza").toBe(true);
  //       checkOrderByResult = await checkOrderBy(
  //         mockNroPartNameValue.toUpperCase()
  //       );
  //       await expect(checkOrderByResult == "nro_pieza").toBe(true);
  //     });

  //     // -- The number of tests is simplified for each case, add here if necessary --
  //   });

  //   describe("3) Check cases for error.", () => {
  //     msg =
  //       "Should not return a error message if no argument is passed to the function (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy();
  //       await expect(async () => checkOrderByResult).not.toThrow(Error);
  //     });

  //     msg =
  //       "Should not return a error message if not string argument is passed to the function (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
  //       await expect(async () => checkOrderByResult).not.toThrow(Error);
  //     });

  //     msg =
  //       "Should not return a error message if a valid argument is passed to the function (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy(mockDatasheetValue);
  //       await expect(async () => checkOrderByResult).not.toThrow(Error);
  //     });

  //     msg =
  //       "Should not return a error message if a new Error is passed to the function (This function expects one argument of type string).";
  //     it(msg, async () => {
  //       checkOrderByResult = await checkOrderBy(new Error());
  //       await expect(async () => checkOrderByResult).not.toThrow(Error);
  //     });
  //   });
});

// describe("- checkOrderAt helper (Unit Test)", () => {
//   describe("1) Check cases for arguments.", () => {
//     msg =
//       "Should return a string value if string argument is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(mockOrderAtAscNameValue);
//       await expect(typeof checkOrderAtResult == "string").toBe(true);
//     });

//     msg =
//       "Should return a null value if number type argument is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(MOCK_NUMBER_VALUE);
//       await expect(checkOrderAtResult == null).toBe(true);
//     });

//     msg =
//       "Should return a null value if boolean type argument is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(MOCK_BOOLEAN_VALUE);
//       await expect(checkOrderAtResult == null).toBe(true);
//     });

//     msg =
//       "Should return a null value if other arguments are passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(
//         MOCK_BOOLEAN_VALUE,
//         MOCK_NUMBER_VALUE,
//         mockDatasheetValue
//       );
//       await expect(checkOrderAtResult == null).toBe(true);
//     });

//     msg =
//       "Should return a null value if a null value is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(null);
//       await expect(checkOrderAtResult == null).toBe(true);
//     });

//     msg =
//       "Should return a null value if a undefined value is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(undefined);
//       await expect(checkOrderAtResult == null).toBe(true);
//     });

//     msg =
//       "Should return a null value if a number value is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(MOCK_NUMBER_VALUE);
//       await expect(checkOrderAtResult == null).toBe(true);
//     });
//   });

//   describe("2) Check cases for return cases.", () => {
//     msg =
//       "Should return a string type with 'ASC' value if a 'asc' or 'ASC' value is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(mockOrderAtAscNameValue);
//       await expect(checkOrderAtResult == "ASC").toBe(true);
//       checkOrderAtResult = await checkOrderAt(
//         mockOrderAtAscNameValue.toUpperCase()
//       );
//       await expect(checkOrderAtResult == "ASC").toBe(true);
//     });

//     msg =
//       "Should return a string type with 'DESC' value if a 'desc' or 'DESC' value is passed (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(mockOrderAtDescNameValue);
//       await expect(checkOrderAtResult == "DESC").toBe(true);
//       checkOrderAtResult = await checkOrderAt(
//         mockOrderAtDescNameValue.toUpperCase()
//       );
//       await expect(checkOrderAtResult == "DESC").toBe(true);
//     });
//   });

//   describe("3) Check cases for error.", () => {
//     msg =
//       "Should not return a error message if no argument is passed to the function (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt();
//       await expect(async () => checkOrderAtResult).not.toThrow(Error);
//     });

//     msg =
//       "Should not return a error message if not string argument is passed to the function (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(MOCK_NUMBER_VALUE);
//       await expect(async () => checkOrderAtResult).not.toThrow(Error);
//     });

//     msg =
//       "Should not return a error message if a valid argument is passed to the function (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(mockOrderAtAscNameValue);
//       await expect(async () => checkOrderAtResult).not.toThrow(Error);
//     });

//     msg =
//       "Should not return a error message if a new Error is passed to the function (This function expects one argument of type string).";
//     it(msg, async () => {
//       checkOrderAtResult = await checkOrderAt(new Error());
//       await expect(async () => checkOrderAtResult).not.toThrow(Error);
//     });
//   });
// });
