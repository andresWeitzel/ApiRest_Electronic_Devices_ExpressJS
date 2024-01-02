"use strict";
//Helpers
const { checkOrderBy } = require("../../../../../helpers/pagination/component/component");
//Const
const MOCK_CODE_NAME_VALUE = "codigo";
const MOCK_NUMBER_VALUE = 12;
const MOCK_BOOLEAN_VALUE = true;
//Vars
let msg;
let checkOrderByResult;

describe("- checkOrderBy helper (Unit Test)", () => {
  describe("1) Check cases for arguments.", () => {
    msg = "Should return a string value if string argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_CODE_NAME_VALUE);
      await expect(typeof checkOrderByResult == "string").toBe(true);
    });

    msg = "Should return a null value if number type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_NUMBER_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    
    msg = "Should return a null value if boolean type argument is passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_BOOLEAN_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });

    msg = "Should return a null value if others arguments are passed (This function expects one argument of type string).";
    it(msg, async () => {
      checkOrderByResult = await checkOrderBy(MOCK_BOOLEAN_VALUE, MOCK_NUMBER_VALUE, MOCK_CODE_NAME_VALUE);
      await expect(checkOrderByResult == null).toBe(true);
    });


    // msg = "Should return a string if a null value is passed to the function.";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy(null);
    //   await expect(typeof checkOrderByResult == "string").toBe(true);
    // });

    // msg =
    //   "Should return a string if a undefined value is passed to the function.";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy(undefined);
    //   await expect(typeof checkOrderByResult == "string").toBe(true);
    // });

    // msg = "Should return a string if not value is passed to the function.";
    // it(msg, async () => {
    //   checkOrderByResult = await checkOrderBy();
    //   await expect(typeof checkOrderByResult == "string").toBe(true);
    // });
  });

//   describe("2) Check cases for event headers .", () => {
//     msg =
//       "Should return a boolean with true value if a correct x-api-key and authorization value is passed to the function.";
//     it(msg, async () => {

//       checkOrderByResult = await checkOrderBy(
//         EVENT_HEADERS_WITH_API_KEY_AUTH_VALID
//       );
//       await expect(checkOrderByResult == true).toBe(true);
//     });

//     msg =
//     "Should return a boolean with false value if a correct x-api-key and incorrect authorization value is passed to the function.";
//   it(msg, async () => {
//     checkOrderByResult = await checkOrderBy(
//       EVENT_HEADERS_WITH_API_KEY_VALID_AUTH_INVALID
//     );
//     await expect(checkOrderByResult == false).toBe(true);
//   });

//     msg =
//       "Should return a boolean with false value if a invalid x-api-key and authorization value is passed to the function.";
//     it(msg, async () => {

//       checkOrderByResult = await checkOrderBy(
//         EVENT_HEADERS_WITH_API_KEY_AUTH_INVALID
//       );
//       await expect(checkOrderByResult == false).toBe(true);
//     });
//   });


//   describe("3) Check cases for error.", () => {
//     msg = "Should not throw an error if a new Error() is passed as a parameter";

//     it(msg, async () => {
//       await expect(async () => await checkOrderBy(new Error())).not.toThrow(
//         Error
//       );
//     });

//     msg =
//       "Should return a boolean with false value if a new Error() value is passed";

//     it(msg, async () => {
//       checkOrderByResult = await checkOrderBy(new Error());

//       await expect(typeof checkOrderByResult == "boolean").toBe(true);
      
//       await expect(checkOrderByResult == false).toBe(true);
      
//     });
//   });
});