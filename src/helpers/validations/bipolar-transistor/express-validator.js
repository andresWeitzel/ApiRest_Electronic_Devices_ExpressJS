//External
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
//Const-vars
/**
 * @description identificador del componente.
 * @example 12
 */
const NAME_VALUE_ID_COMPONENT = 'id_componente';
const MIN_VALUE_ID_COMPONENT = 1;
const MAX_VALUE_ID_COMPONENT = 100000000;
/**
 * @description bipolar transistor type
 * @example NPN, PNP
 */
const NAME_VALUE_TIPO = 'tipo';
const MIN_VALUE_LENGHT_TIPO = 0;
const MAX_VALUE_LENGHT_TIPO = 10;
/**
 * @description longitud en mm.
 * @example 69.0 mm
 */
const NAME_VALUE_VOLTAJE_COLEC_EMIS = 'voltaje_colec_emis';
const MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS = 3;
const MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS = 30;
// /**
//  * @description ancho en mm . Ej: 56.7 mm
//  */
// const NAME_VALUE_ANCHO = 'ancho';
// const MIN_VALUE_LENGHT_ANCHO = 3;
// const MAX_VALUE_LENGHT_ANCHO = 30;
// /**
//  * @description peso en gramos . Ej: 19.4 gramos
//  */
// const NAME_VALUE_PESO = 'peso';
// const MIN_VALUE_LENGHT_PESO = 3;
// const MAX_VALUE_LENGHT_PESO = 30;
// /**
//  * @description material del componente . Ej: silicio,acero, plastico, etc
//  */
// const NAME_VALUE_MATERIAL = 'material';
// const MIN_VALUE_LENGHT_MATERIAL = 3;
// const MAX_VALUE_LENGHT_MATERIAL = 50;
// /**
//  * @description voltaje recomendado del componente . Ej: 5 voltios
//  */
// const NAME_VALUE_VOLTAJE_RECOMENDADO = 'voltaje_recomendado';
// const MIN_VALUE_LENGHT_VOLTAJE_RECOMENDADO = 3;
// const MAX_VALUE_LENGHT_VOLTAJE_RECOMENDADO = 30;
// /**
//  * @description voltaje minimo de entrada del componente . Ej: 3.3 voltios
//  */
// const NAME_VALUE_VOLTAJE_MIN_ENTRADA = 'voltaje_min_entrada';
// const MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA = 3;
// const MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA = 30;
// /**
//  * @description voltaje máximo de entrada del componente . Ej: 12 voltios
//  */
// const NAME_VALUE_VOLTAJE_MAX_ENTRADA = 'voltaje_max_entrada';
// const MIN_VALUE_LENGHT_VOLTAJE_MAX_ENTRADA = 3;
// const MAX_VALUE_LENGHT_VOLTAJE_MAX_ENTRADA = 30;

/**
 * @description check all validations for the body fields to add a bipolar transistor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsAddBipolarTransistor    = () => {
  try {
    return [
      //Check id_component
      check(`${NAME_VALUE_ID_COMPONENT}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of bipolar transistor is required`,
        )
        .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of bipolar transistor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
        ),
      //Check tipo
      check(`${NAME_VALUE_TIPO}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TIPO,
          max: MAX_VALUE_LENGHT_TIPO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TIPO} must be between ${MIN_VALUE_LENGHT_TIPO} and ${MAX_VALUE_LENGHT_TIPO} characters`,
        ),
      //Check voltaje_colec_emis
      check(`${NAME_VALUE_VOLTAJE_COLEC_EMIS}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_EMIS} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_EMIS} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS,
          max: MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_COLEC_EMIS} must be between ${MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS} and ${MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS} characters`,
        ),
    //   //Check ancho
    //   check(`${NAME_VALUE_ANCHO}`)
    //     .exists()
    //     .withMessage(`The ${NAME_VALUE_ANCHO} of bipolar transistor is required`)
    //     .isString()
    //     .withMessage(
    //       `The ${NAME_VALUE_ANCHO} of bipolar transistor should be string`,
    //     )
    //     .isLength({
    //       min: MIN_VALUE_LENGHT_ANCHO,
    //       max: MAX_VALUE_LENGHT_ANCHO,
    //     })
    //     .withMessage(
    //       `The value of the ${NAME_VALUE_ANCHO} must be between ${MIN_VALUE_LENGHT_ANCHO} and ${MAX_VALUE_LENGHT_ANCHO} characters`,
    //     ),
    //   //Check peso
    //   check(`${NAME_VALUE_PESO}`)
    //     .exists()
    //     .withMessage(`The ${NAME_VALUE_PESO} of bipolar transistor is required`)
    //     .isString()
    //     .withMessage(
    //       `The ${NAME_VALUE_PESO} of bipolar transistor should be string`,
    //     )
    //     .isLength({
    //       min: MIN_VALUE_LENGHT_PESO,
    //       max: MAX_VALUE_LENGHT_PESO,
    //     })
    //     .withMessage(
    //       `The value of the ${NAME_VALUE_PESO} must be between ${MIN_VALUE_LENGHT_PESO} and ${MAX_VALUE_LENGHT_PESO} characters`,
    //     ),
    //   //Check material
    //   check(`${NAME_VALUE_MATERIAL}`)
    //     .exists()
    //     .withMessage(
    //       `The ${NAME_VALUE_MATERIAL} of bipolar transistor is required`,
    //     )
    //     .isString()
    //     .withMessage(
    //       `The ${NAME_VALUE_MATERIAL} of bipolar transistor should be string`,
    //     )
    //     .isLength({
    //       min: MIN_VALUE_LENGHT_MATERIAL,
    //       max: MAX_VALUE_LENGHT_MATERIAL,
    //     })
    //     .withMessage(
    //       `The value of the ${NAME_VALUE_MATERIAL} must be between ${MIN_VALUE_LENGHT_MATERIAL} and ${MAX_VALUE_LENGHT_MATERIAL} characters`,
    //     ),
    //   //Check voltaje_recomendado
    //   check(`${NAME_VALUE_VOLTAJE_RECOMENDADO}`)
    //     .exists()
    //     .withMessage(
    //       `The ${NAME_VALUE_VOLTAJE_RECOMENDADO} of bipolar transistor is required`,
    //     )
    //     .isString()
    //     .withMessage(
    //       `The ${NAME_VALUE_VOLTAJE_RECOMENDADO} of bipolar transistor should be string`,
    //     )
    //     .isLength({
    //       min: MIN_VALUE_LENGHT_VOLTAJE_RECOMENDADO,
    //       max: MAX_VALUE_LENGHT_VOLTAJE_RECOMENDADO,
    //     })
    //     .withMessage(
    //       `The value of the ${NAME_VALUE_VOLTAJE_RECOMENDADO} must be between ${MIN_VALUE_LENGHT_VOLTAJE_RECOMENDADO} and ${MAX_VALUE_LENGHT_VOLTAJE_RECOMENDADO} characters`,
    //     ),
    //   //Check voltaje_min_entrada
    //   check(`${NAME_VALUE_VOLTAJE_MIN_ENTRADA}`)
    //     .exists()
    //     .withMessage(
    //       `The ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} of bipolar transistor is required`,
    //     )
    //     .isString()
    //     .withMessage(
    //       `The ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} of bipolar transistor should be string`,
    //     )
    //     .isLength({
    //       min: MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA,
    //       max: MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA,
    //     })
    //     .withMessage(
    //       `The value of the ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} must be between ${MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} and ${MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} characters`,
    //     ),
    //   //Check voltaje_max_entrada
    //   check(`${NAME_VALUE_VOLTAJE_MAX_ENTRADA}`)
    //     .exists()
    //     .withMessage(
    //       `The ${NAME_VALUE_VOLTAJE_MAX_ENTRADA} of bipolar transistor is required`,
    //     )
    //     .isString()
    //     .withMessage(
    //       `The ${NAME_VALUE_VOLTAJE_MAX_ENTRADA} of bipolar transistor should be string`,
    //     )
    //     .isLength({
    //       min: MIN_VALUE_LENGHT_VOLTAJE_MAX_ENTRADA,
    //       max: MAX_VALUE_LENGHT_VOLTAJE_MAX_ENTRADA,
    //     })
    //     .withMessage(
    //       `The value of the ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} must be between ${MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} and ${MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} characters`,
    //     ),

      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
  } catch (error) {
    msg = `Error in checkBodyFieldsAddBipolarTransistor () function. Caused by ${error}.`;
    console.log(msg);
  }
};

// /**
//  * @description check all validations for the body fields to update a bipolar transistor
//  * @returns an array with all the validations that do not comply with what was tested
//  */
// const checkBodyFieldsUpdateComponentDetail = () => {
//   try {
//     return [
//       //Check id_component
//       check(`${NAME_VALUE_ID_COMPONENT}`)
//         .optional()
//         .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
//         .withMessage(
//           `The ${NAME_VALUE_ID_COMPONENT} of bipolar transistor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
//         ),
//       //Check hoja_de_datos
//       check(`${NAME_VALUE_TIPO}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_TIPO} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_TIPO,
//           max: MAX_VALUE_LENGHT_TIPO,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_TIPO} must be between ${MIN_VALUE_LENGHT_TIPO} and ${MAX_VALUE_LENGHT_TIPO} characters`,
//         ),
//       //Check longitud
//       check(`${NAME_VALUE_VOLTAJE_COLEC_EMIS}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_VOLTAJE_COLEC_EMIS} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS,
//           max: MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_VOLTAJE_COLEC_EMIS} must be between ${MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS} and ${MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS} characters`,
//         ),
//       //Check ancho
//       check(`${NAME_VALUE_ANCHO}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_ANCHO} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_ANCHO,
//           max: MAX_VALUE_LENGHT_ANCHO,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_ANCHO} must be between ${MIN_VALUE_LENGHT_ANCHO} and ${MAX_VALUE_LENGHT_ANCHO} characters`,
//         ),
//       //Check peso
//       check(`${NAME_VALUE_PESO}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_PESO} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_PESO,
//           max: MAX_VALUE_LENGHT_PESO,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_PESO} must be between ${MIN_VALUE_LENGHT_PESO} and ${MAX_VALUE_LENGHT_PESO} characters`,
//         ),
//       //Check material
//       check(`${NAME_VALUE_MATERIAL}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_MATERIAL} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_MATERIAL,
//           max: MAX_VALUE_LENGHT_MATERIAL,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_MATERIAL} must be between ${MIN_VALUE_LENGHT_MATERIAL} and ${MAX_VALUE_LENGHT_MATERIAL} characters`,
//         ),
//       //Check voltaje_recomendado
//       check(`${NAME_VALUE_VOLTAJE_RECOMENDADO}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_VOLTAJE_RECOMENDADO} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_VOLTAJE_RECOMENDADO,
//           max: MAX_VALUE_LENGHT_VOLTAJE_RECOMENDADO,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_VOLTAJE_RECOMENDADO} must be between ${MIN_VALUE_LENGHT_VOLTAJE_RECOMENDADO} and ${MAX_VALUE_LENGHT_VOLTAJE_RECOMENDADO} characters`,
//         ),
//       //Check voltaje_min_entrada
//       check(`${NAME_VALUE_VOLTAJE_MIN_ENTRADA}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA,
//           max: MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} must be between ${MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} and ${MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} characters`,
//         ),
//       //Check voltaje_max_entrada
//       check(`${NAME_VALUE_VOLTAJE_MAX_ENTRADA}`)
//         .optional()
//         .isString()
//         .withMessage(
//           `The ${NAME_VALUE_VOLTAJE_MAX_ENTRADA} of bipolar transistor should be string`,
//         )
//         .isLength({
//           min: MIN_VALUE_LENGHT_VOLTAJE_MAX_ENTRADA,
//           max: MAX_VALUE_LENGHT_VOLTAJE_MAX_ENTRADA,
//         })
//         .withMessage(
//           `The value of the ${NAME_VALUE_VOLTAJE_MIN_ENTRADA} must be between ${MIN_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} and ${MAX_VALUE_LENGHT_VOLTAJE_MIN_ENTRADA} characters`,
//         ),

//       (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//       },
//     ];
//   } catch (error) {
//     msg = `Error in checkBodyFieldsUpdateComponentDetail() function. Caused by ${error}.`;
//     console.log(msg);
//   }
// };

module.exports = {
  checkBodyFieldsAddBipolarTransistor    ,
  //checkBodyFieldsUpdateComponentDetail,
};
