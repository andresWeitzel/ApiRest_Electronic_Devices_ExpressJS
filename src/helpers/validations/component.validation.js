// //External
// const {body} = require("express-validator");

// //Const-vars
// const MIN_VALUE_CODIGO = 3;
// const MAX_VALUE_CODIGO = 100;

// const componentValidation = async()=> [
//     body("codigo")
//     .exists().withMessage("The code of component is required")
//     .isString().withMessage("The code of component should be string")
//     .isLength({ min: MIN_VALUE_CODIGO, max:MAX_VALUE_CODIGO }).withMessage(`The value of the codigo must be between ${MIN_VALUE_CODIGO} and ${MAX_VALUE_CODIGO} characters`),
// ];

// module.exports={componentValidation};

//{{{ADD VALIDATION HERE}}}