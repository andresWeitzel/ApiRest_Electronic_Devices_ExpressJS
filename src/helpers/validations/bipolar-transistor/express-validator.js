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
 * @description voltaje del colector y emisor en V.
 * @example 3.2 V
 */
const NAME_VALUE_VOLTAJE_COLEC_EMIS = 'voltaje_colec_emis';
const MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS = 3;
const MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS = 30;
/**
 * @description voltaje del colector y base
 * @example 30 V
 */
const NAME_VALUE_VOLTAJE_COLEC_BASE = 'voltaje_colec_base';
const MIN_VALUE_LENGHT_VOLTAJE_COLEC_BASE = 3;
const MAX_VALUE_LENGHT_VOLTAJE_COLEC_BASE = 30;
/**
 * @description voltaje del emisor y base
 * @example 120 V
 */
const NAME_VALUE_VOLTAJE_EMIS_BASE = 'voltaje_emis_base';
const MIN_VALUE_LENGHT_VOLTAJE_EMIS_BASE = 3;
const MAX_VALUE_LENGHT_VOLTAJE_EMIS_BASE = 30;
/**
 * @description voltaje del colector y emisor en saturación
 * @example 5 V
 */
const NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT = 'voltaje_colec_emis_sat';
const MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT = 3;
const MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT = 30;
/**
 * @description corriente del colector
 * @example 1.5 A
 */
const NAME_VALUE_CORRIENTE_COLEC = 'corriente_colec';
const MIN_VALUE_LENGHT_CORRIENTE_COLEC = 3;
const MAX_VALUE_LENGHT_CORRIENTE_COLEC = 30;
/**
 * @description ganancia en hfe
 */
const NAME_VALUE_GANANCIA_HFE = 'ganancia_hfe';
const MIN_VALUE_LENGHT_GANANCIA_HFE = 1;
const MAX_VALUE_LENGHT_GANANCIA_HFE = 30;
/**
 * @description disipación máxima
 * @example 0.64 W
 */
const NAME_VALUE_DISIP_MAX = 'disip_max';
const MIN_VALUE_LENGHT_DISIP_MAX = 3;
const MAX_VALUE_LENGHT_DISIP_MAX = 30;
/**
 * @description temperatura de juntura
 * @example 55 a +155 °C
 */
const NAME_VALUE_TEMP_JUNTURA = 'temp_juntura';
const MIN_VALUE_LENGHT_TEMP_JUNTURA = 3;
const MAX_VALUE_LENGHT_TEMP_JUNTURA = 50;

/**
 * @description check all validations for the body fields to add a bipolar transistor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsAddBipolarTransistor = () => {
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
        .withMessage(`The ${NAME_VALUE_TIPO} of bipolar transistor is required`)
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
      //Check voltaje_colec_base
      check(`${NAME_VALUE_VOLTAJE_COLEC_BASE}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_BASE} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_BASE} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_COLEC_BASE,
          max: MAX_VALUE_LENGHT_VOLTAJE_COLEC_BASE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_COLEC_BASE} must be between ${MIN_VALUE_LENGHT_VOLTAJE_COLEC_BASE} and ${MAX_VALUE_LENGHT_VOLTAJE_COLEC_BASE} characters`,
        ),
      //Check voltaje_emis_base
      check(`${NAME_VALUE_VOLTAJE_EMIS_BASE}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_EMIS_BASE} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_EMIS_BASE} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_EMIS_BASE,
          max: MAX_VALUE_LENGHT_VOLTAJE_EMIS_BASE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_EMIS_BASE} must be between ${MIN_VALUE_LENGHT_VOLTAJE_EMIS_BASE} and ${MAX_VALUE_LENGHT_VOLTAJE_EMIS_BASE} characters`,
        ),
      //Check voltaje_colec_emis_sat
      check(`${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT,
          max: MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT} must be between ${MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT} and ${MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT} characters`,
        ),
      //Check corriente_colec
      check(`${NAME_VALUE_CORRIENTE_COLEC}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_CORRIENTE_COLEC} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CORRIENTE_COLEC} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CORRIENTE_COLEC,
          max: MAX_VALUE_LENGHT_CORRIENTE_COLEC,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CORRIENTE_COLEC} must be between ${MIN_VALUE_LENGHT_CORRIENTE_COLEC} and ${MAX_VALUE_LENGHT_CORRIENTE_COLEC} characters`,
        ),
      //Check ganancia_hfe
      check(`${NAME_VALUE_GANANCIA_HFE}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_GANANCIA_HFE} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_GANANCIA_HFE} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_GANANCIA_HFE,
          max: MAX_VALUE_LENGHT_GANANCIA_HFE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_GANANCIA_HFE} must be between ${MIN_VALUE_LENGHT_GANANCIA_HFE} and ${MAX_VALUE_LENGHT_GANANCIA_HFE} characters`,
        ),
      //Check disip_max
      check(`${NAME_VALUE_DISIP_MAX}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_DISIP_MAX} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_DISIP_MAX} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_DISIP_MAX,
          max: MAX_VALUE_LENGHT_DISIP_MAX,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_GANANCIA_HFE} must be between ${MIN_VALUE_LENGHT_GANANCIA_HFE} and ${MAX_VALUE_LENGHT_GANANCIA_HFE} characters`,
        ),
      //Check temp_juntura
      check(`${NAME_VALUE_TEMP_JUNTURA}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_TEMP_JUNTURA} of bipolar transistor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TEMP_JUNTURA} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TEMP_JUNTURA,
          max: MAX_VALUE_LENGHT_TEMP_JUNTURA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TEMP_JUNTURA} must be between ${MIN_VALUE_LENGHT_TEMP_JUNTURA} and ${MAX_VALUE_LENGHT_TEMP_JUNTURA} characters`,
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
    msg = `Error in checkBodyFieldsAddBipolarTransistor () function. Caused by ${error}.`;
    console.log(msg);
  }
};

/**
 * @description check all validations for the body fields to update a bipolar transistor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsUpdateBipolarTransistor = () => {
  try {
    return [
      //Check id_component
      check(`${NAME_VALUE_ID_COMPONENT}`)
        .optional()
        .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of bipolar transistor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
        ),
      //Check tipo
      check(`${NAME_VALUE_TIPO}`)
        .optional()
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
        .optional()
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
      //Check voltaje_colec_base
      check(`${NAME_VALUE_VOLTAJE_COLEC_BASE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_BASE} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_COLEC_BASE,
          max: MAX_VALUE_LENGHT_VOLTAJE_COLEC_BASE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_COLEC_BASE} must be between ${MIN_VALUE_LENGHT_VOLTAJE_COLEC_BASE} and ${MAX_VALUE_LENGHT_VOLTAJE_COLEC_BASE} characters`,
        ),
      //Check voltaje_emis_base
      check(`${NAME_VALUE_VOLTAJE_EMIS_BASE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_EMIS_BASE} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_EMIS_BASE,
          max: MAX_VALUE_LENGHT_VOLTAJE_EMIS_BASE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_EMIS_BASE} must be between ${MIN_VALUE_LENGHT_VOLTAJE_EMIS_BASE} and ${MAX_VALUE_LENGHT_VOLTAJE_EMIS_BASE} characters`,
        ),
      //Check voltaje_colec_emis_sat
      check(`${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT,
          max: MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_VOLTAJE_COLEC_EMIS_SAT} must be between ${MIN_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT} and ${MAX_VALUE_LENGHT_VOLTAJE_COLEC_EMIS_SAT} characters`,
        ),
      //Check corriente_colec
      check(`${NAME_VALUE_CORRIENTE_COLEC}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CORRIENTE_COLEC} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CORRIENTE_COLEC,
          max: MAX_VALUE_LENGHT_CORRIENTE_COLEC,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CORRIENTE_COLEC} must be between ${MIN_VALUE_LENGHT_CORRIENTE_COLEC} and ${MAX_VALUE_LENGHT_CORRIENTE_COLEC} characters`,
        ),
      //Check ganancia_hfe
      check(`${NAME_VALUE_GANANCIA_HFE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_GANANCIA_HFE} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_GANANCIA_HFE,
          max: MAX_VALUE_LENGHT_GANANCIA_HFE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_GANANCIA_HFE} must be between ${MIN_VALUE_LENGHT_GANANCIA_HFE} and ${MAX_VALUE_LENGHT_GANANCIA_HFE} characters`,
        ),
      //Check disip_max
      check(`${NAME_VALUE_DISIP_MAX}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_DISIP_MAX} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_DISIP_MAX,
          max: MAX_VALUE_LENGHT_DISIP_MAX,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_GANANCIA_HFE} must be between ${MIN_VALUE_LENGHT_GANANCIA_HFE} and ${MAX_VALUE_LENGHT_GANANCIA_HFE} characters`,
        ),
      //Check temp_juntura
      check(`${NAME_VALUE_TEMP_JUNTURA}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TEMP_JUNTURA} of bipolar transistor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TEMP_JUNTURA,
          max: MAX_VALUE_LENGHT_TEMP_JUNTURA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TEMP_JUNTURA} must be between ${MIN_VALUE_LENGHT_TEMP_JUNTURA} and ${MAX_VALUE_LENGHT_TEMP_JUNTURA} characters`,
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
    msg = `Error in checkBodyFieldsUpdateBipolarTransistor() function. Caused by ${error}.`;
    console.log(msg);
  }
};

module.exports = {
  checkBodyFieldsAddBipolarTransistor,
  checkBodyFieldsUpdateBipolarTransistor,
};
