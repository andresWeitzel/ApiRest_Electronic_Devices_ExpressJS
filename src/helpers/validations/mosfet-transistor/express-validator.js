//External
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

//Const-vars
/**
 * @description identificador del componente. Ej: 3
 */
const NAME_VALUE_ID_COMPONENT = 'id_componente';
const MIN_VALUE_ID_COMPONENT = 1;
const MAX_VALUE_ID_COMPONENT = 100000000;

/**
 * @description tipo de transistor MOSFET. Ej: N-Channel, P-Channel
 */
const NAME_VALUE_TIPO = 'tipo';
const MIN_VALUE_LENGHT_TIPO = 3;
const MAX_VALUE_LENGHT_TIPO = 30;

/**
 * @description voltaje drenaje-fuente del MOSFET. Ej: 60V
 */
const NAME_VALUE_VOLTAJE_DRENAJE_FUENTE = 'voltaje_drenaje_fuente';
const MIN_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE = 3;
const MAX_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE = 30;

/**
 * @description corriente CC del drenaje del MOSFET. Ej: 3A
 */
const NAME_VALUE_CORRIENTE_CC_DRENAJE = 'corriente_cc_drenaje';
const MIN_VALUE_LENGHT_CORRIENTE_CC_DRENAJE = 3;
const MAX_VALUE_LENGHT_CORRIENTE_CC_DRENAJE = 30;

/**
 * @description disipación máxima del MOSFET. Ej: 2.5W
 */
const NAME_VALUE_DISIP_MAX = 'disip_max';
const MIN_VALUE_LENGHT_DISIP_MAX = 3;
const MAX_VALUE_LENGHT_DISIP_MAX = 30;

/**
 * @description temperatura de operación máxima del MOSFET. Ej: 150°C
 */
const NAME_VALUE_TEMP_OP_MAX = 'temp_op_max';
const MIN_VALUE_LENGHT_TEMP_OP_MAX = 3;
const MAX_VALUE_LENGHT_TEMP_OP_MAX = 50;

/**
 * @description conductancia drenaje-sustrato del MOSFET. Ej: 1.5S
 */
const NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO = 'conduct_drenaje_sustrato';
const MIN_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO = 3;
const MAX_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO = 50;

/**
 * @description resistencia drenaje-fuente del MOSFET. Ej: 0.1Ω
 */
const NAME_VALUE_RESIST_DRENAJE_FUENTE = 'resist_drenaje_fuente';
const MIN_VALUE_LENGHT_RESIST_DRENAJE_FUENTE = 3;
const MAX_VALUE_LENGHT_RESIST_DRENAJE_FUENTE = 50;

/**
 * @description check all validations for the body fields to add a mosfet transistor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsAddMosfetTransistor = () => {
  try {
    return [
      //Check id_component
      check(`${NAME_VALUE_ID_COMPONENT}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of mosfet transistor is required`,
        )
        .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of mosfet transistor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
        ),
      //Check tipo
      check(`${NAME_VALUE_TIPO}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of mosfet transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TIPO,
          max: MAX_VALUE_LENGHT_TIPO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TIPO} must be between ${MIN_VALUE_LENGHT_TIPO} and ${MAX_VALUE_LENGHT_TIPO} characters`,
        ),
      //Check voltaje_drenaje_fuente
      check(`${NAME_VALUE_VOLTAJE_DRENAJE_FUENTE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_DRENAJE_FUENTE} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE,
          max: MAX_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_DRENAJE_FUENTE} must be between ${MIN_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE} and ${MAX_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE} characters`,
        ),
      //Check corriente_cc_drenaje
      check(`${NAME_VALUE_CORRIENTE_CC_DRENAJE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CORRIENTE_CC_DRENAJE} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CORRIENTE_CC_DRENAJE,
          max: MAX_VALUE_LENGHT_CORRIENTE_CC_DRENAJE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CORRIENTE_CC_DRENAJE} must be between ${MIN_VALUE_LENGHT_CORRIENTE_CC_DRENAJE} and ${MAX_VALUE_LENGHT_CORRIENTE_CC_DRENAJE} characters`,
        ),
      //Check disip_max
      check(`${NAME_VALUE_DISIP_MAX}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_DISIP_MAX} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_DISIP_MAX,
          max: MAX_VALUE_LENGHT_DISIP_MAX,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_DISIP_MAX} must be between ${MIN_VALUE_LENGHT_DISIP_MAX} and ${MAX_VALUE_LENGHT_DISIP_MAX} characters`,
        ),
      //Check temp_op_max
      check(`${NAME_VALUE_TEMP_OP_MAX}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TEMP_OP_MAX} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TEMP_OP_MAX,
          max: MAX_VALUE_LENGHT_TEMP_OP_MAX,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TEMP_OP_MAX} must be between ${MIN_VALUE_LENGHT_TEMP_OP_MAX} and ${MAX_VALUE_LENGHT_TEMP_OP_MAX} characters`,
        ),
      //Check conduct_drenaje_sustrato
      check(`${NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO,
          max: MAX_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO} must be between ${MIN_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO} and ${MAX_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO} characters`,
        ),
      //Check resist_drenaje_fuente
      check(`${NAME_VALUE_RESIST_DRENAJE_FUENTE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_RESIST_DRENAJE_FUENTE} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_RESIST_DRENAJE_FUENTE,
          max: MAX_VALUE_LENGHT_RESIST_DRENAJE_FUENTE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_RESIST_DRENAJE_FUENTE} must be between ${MIN_VALUE_LENGHT_RESIST_DRENAJE_FUENTE} and ${MAX_VALUE_LENGHT_RESIST_DRENAJE_FUENTE} characters`,
        ),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
  } catch (error) {
    console.log(
      'ERROR in checkBodyFieldsAddMosfetTransistor() function. Caused by ' +
        error,
    );
    return [];
  }
};

/**
 * @description check all validations for the body fields to update a mosfet transistor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsUpdateMosfetTransistor = () => {
  try {
    return [
      //Check id_component (optional for update)
      check(`${NAME_VALUE_ID_COMPONENT}`)
        .optional()
        .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of mosfet transistor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
        ),
      //Check tipo (optional for update)
      check(`${NAME_VALUE_TIPO}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TIPO,
          max: MAX_VALUE_LENGHT_TIPO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TIPO} must be between ${MIN_VALUE_LENGHT_TIPO} and ${MAX_VALUE_LENGHT_TIPO} characters`,
        ),
      //Check voltaje_drenaje_fuente (optional for update)
      check(`${NAME_VALUE_VOLTAJE_DRENAJE_FUENTE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_DRENAJE_FUENTE} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE,
          max: MAX_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_DRENAJE_FUENTE} must be between ${MIN_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE} and ${MAX_VALUE_LENGHT_VOLTAJE_DRENAJE_FUENTE} characters`,
        ),
      //Check corriente_cc_drenaje (optional for update)
      check(`${NAME_VALUE_CORRIENTE_CC_DRENAJE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CORRIENTE_CC_DRENAJE} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CORRIENTE_CC_DRENAJE,
          max: MAX_VALUE_LENGHT_CORRIENTE_CC_DRENAJE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CORRIENTE_CC_DRENAJE} must be between ${MIN_VALUE_LENGHT_CORRIENTE_CC_DRENAJE} and ${MAX_VALUE_LENGHT_CORRIENTE_CC_DRENAJE} characters`,
        ),
      //Check disip_max (optional for update)
      check(`${NAME_VALUE_DISIP_MAX}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_DISIP_MAX} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_DISIP_MAX,
          max: MAX_VALUE_LENGHT_DISIP_MAX,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_DISIP_MAX} must be between ${MIN_VALUE_LENGHT_DISIP_MAX} and ${MAX_VALUE_LENGHT_DISIP_MAX} characters`,
        ),
      //Check temp_op_max (optional for update)
      check(`${NAME_VALUE_TEMP_OP_MAX}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TEMP_OP_MAX} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TEMP_OP_MAX,
          max: MAX_VALUE_LENGHT_TEMP_OP_MAX,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TEMP_OP_MAX} must be between ${MIN_VALUE_LENGHT_TEMP_OP_MAX} and ${MAX_VALUE_LENGHT_TEMP_OP_MAX} characters`,
        ),
      //Check conduct_drenaje_sustrato (optional for update)
      check(`${NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO,
          max: MAX_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CONDUCT_DRENAJE_SUSTRATO} must be between ${MIN_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO} and ${MAX_VALUE_LENGHT_CONDUCT_DRENAJE_SUSTRATO} characters`,
        ),
      //Check resist_drenaje_fuente (optional for update)
      check(`${NAME_VALUE_RESIST_DRENAJE_FUENTE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_RESIST_DRENAJE_FUENTE} of mosfet transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_RESIST_DRENAJE_FUENTE,
          max: MAX_VALUE_LENGHT_RESIST_DRENAJE_FUENTE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_RESIST_DRENAJE_FUENTE} must be between ${MIN_VALUE_LENGHT_RESIST_DRENAJE_FUENTE} and ${MAX_VALUE_LENGHT_RESIST_DRENAJE_FUENTE} characters`,
        ),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
    ];
  } catch (error) {
    console.log(
      'ERROR in checkBodyFieldsUpdateMosfetTransistor() function. Caused by ' +
        error,
    );
    return [];
  }
};

module.exports = {
  checkBodyFieldsAddMosfetTransistor,
  checkBodyFieldsUpdateMosfetTransistor,
}; 