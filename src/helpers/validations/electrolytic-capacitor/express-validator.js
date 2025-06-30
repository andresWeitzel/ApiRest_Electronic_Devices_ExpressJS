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
 * @description tipo de capacitor electrolítico. Ej: Aluminio, Tántalo
 */
const NAME_VALUE_TIPO = 'tipo';
const MIN_VALUE_LENGHT_TIPO = 3;
const MAX_VALUE_LENGHT_TIPO = 30;

/**
 * @description capacitancia del capacitor. Ej: 1000µF
 */
const NAME_VALUE_CAPACITANCIA = 'capacitancia';
const MIN_VALUE_LENGHT_CAPACITANCIA = 3;
const MAX_VALUE_LENGHT_CAPACITANCIA = 30;

/**
 * @description tolerancia del capacitor. Ej: ±20%
 */
const NAME_VALUE_TOLERANCIA = 'tolerancia';
const MIN_VALUE_LENGHT_TOLERANCIA = 3;
const MAX_VALUE_LENGHT_TOLERANCIA = 30;

/**
 * @description rango de temperatura del capacitor. Ej: -40°C a +85°C
 */
const NAME_VALUE_RANGO_TEMPERATURA = 'rango_temperatura';
const MIN_VALUE_LENGHT_RANGO_TEMPERATURA = 3;
const MAX_VALUE_LENGHT_RANGO_TEMPERATURA = 50;

/**
 * @description rango de tensión nominal del capacitor. Ej: 6.3V a 450V
 */
const NAME_VALUE_RANGO_TENSION_NOMINAL = 'rango_tension_nominal';
const MIN_VALUE_LENGHT_RANGO_TENSION_NOMINAL = 3;
const MAX_VALUE_LENGHT_RANGO_TENSION_NOMINAL = 50;

/**
 * @description check all validations for the body fields to add an electrolytic capacitor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsAddElectrolyticCapacitor = () => {
  try {
    return [
      //Check id_component
      check(`${NAME_VALUE_ID_COMPONENT}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of electrolytic capacitor is required`,
        )
        .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of electrolytic capacitor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
        ),
      //Check tipo
      check(`${NAME_VALUE_TIPO}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of electrolytic capacitor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TIPO,
          max: MAX_VALUE_LENGHT_TIPO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TIPO} must be between ${MIN_VALUE_LENGHT_TIPO} and ${MAX_VALUE_LENGHT_TIPO} characters`,
        ),
      //Check capacitancia
      check(`${NAME_VALUE_CAPACITANCIA}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_CAPACITANCIA} of electrolytic capacitor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CAPACITANCIA} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CAPACITANCIA,
          max: MAX_VALUE_LENGHT_CAPACITANCIA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CAPACITANCIA} must be between ${MIN_VALUE_LENGHT_CAPACITANCIA} and ${MAX_VALUE_LENGHT_CAPACITANCIA} characters`,
        ),
      //Check tolerancia
      check(`${NAME_VALUE_TOLERANCIA}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_TOLERANCIA} of electrolytic capacitor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TOLERANCIA} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TOLERANCIA,
          max: MAX_VALUE_LENGHT_TOLERANCIA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TOLERANCIA} must be between ${MIN_VALUE_LENGHT_TOLERANCIA} and ${MAX_VALUE_LENGHT_TOLERANCIA} characters`,
        ),
      //Check rango_temperatura
      check(`${NAME_VALUE_RANGO_TEMPERATURA}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_RANGO_TEMPERATURA} of electrolytic capacitor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_RANGO_TEMPERATURA} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_RANGO_TEMPERATURA,
          max: MAX_VALUE_LENGHT_RANGO_TEMPERATURA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_RANGO_TEMPERATURA} must be between ${MIN_VALUE_LENGHT_RANGO_TEMPERATURA} and ${MAX_VALUE_LENGHT_RANGO_TEMPERATURA} characters`,
        ),
      //Check rango_tension_nominal
      check(`${NAME_VALUE_RANGO_TENSION_NOMINAL}`)
        .exists()
        .withMessage(
          `The ${NAME_VALUE_RANGO_TENSION_NOMINAL} of electrolytic capacitor is required`,
        )
        .isString()
        .withMessage(
          `The ${NAME_VALUE_RANGO_TENSION_NOMINAL} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_RANGO_TENSION_NOMINAL,
          max: MAX_VALUE_LENGHT_RANGO_TENSION_NOMINAL,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_RANGO_TENSION_NOMINAL} must be between ${MIN_VALUE_LENGHT_RANGO_TENSION_NOMINAL} and ${MAX_VALUE_LENGHT_RANGO_TENSION_NOMINAL} characters`,
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
      'ERROR in checkBodyFieldsAddElectrolyticCapacitor() function. Caused by ' +
        error,
    );
    return [];
  }
};

/**
 * @description check all validations for the body fields to update an electrolytic capacitor
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsUpdateElectrolyticCapacitor = () => {
  try {
    return [
      //Check id_component (optional for update)
      check(`${NAME_VALUE_ID_COMPONENT}`)
        .optional()
        .isInt({ min: MIN_VALUE_ID_COMPONENT, max: MAX_VALUE_ID_COMPONENT })
        .withMessage(
          `The ${NAME_VALUE_ID_COMPONENT} of electrolytic capacitor should be number (integer) and must be betwenn ${MIN_VALUE_ID_COMPONENT} to ${MAX_VALUE_ID_COMPONENT}.`,
        ),
      //Check tipo (optional for update)
      check(`${NAME_VALUE_TIPO}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TIPO} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TIPO,
          max: MAX_VALUE_LENGHT_TIPO,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TIPO} must be between ${MIN_VALUE_LENGHT_TIPO} and ${MAX_VALUE_LENGHT_TIPO} characters`,
        ),
      //Check capacitancia (optional for update)
      check(`${NAME_VALUE_CAPACITANCIA}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CAPACITANCIA} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CAPACITANCIA,
          max: MAX_VALUE_LENGHT_CAPACITANCIA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CAPACITANCIA} must be between ${MIN_VALUE_LENGHT_CAPACITANCIA} and ${MAX_VALUE_LENGHT_CAPACITANCIA} characters`,
        ),
      //Check tolerancia (optional for update)
      check(`${NAME_VALUE_TOLERANCIA}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_TOLERANCIA} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_TOLERANCIA,
          max: MAX_VALUE_LENGHT_TOLERANCIA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_TOLERANCIA} must be between ${MIN_VALUE_LENGHT_TOLERANCIA} and ${MAX_VALUE_LENGHT_TOLERANCIA} characters`,
        ),
      //Check rango_temperatura (optional for update)
      check(`${NAME_VALUE_RANGO_TEMPERATURA}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_RANGO_TEMPERATURA} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_RANGO_TEMPERATURA,
          max: MAX_VALUE_LENGHT_RANGO_TEMPERATURA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_RANGO_TEMPERATURA} must be between ${MIN_VALUE_LENGHT_RANGO_TEMPERATURA} and ${MAX_VALUE_LENGHT_RANGO_TEMPERATURA} characters`,
        ),
      //Check rango_tension_nominal (optional for update)
      check(`${NAME_VALUE_RANGO_TENSION_NOMINAL}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_RANGO_TENSION_NOMINAL} of electrolytic capacitor should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_RANGO_TENSION_NOMINAL,
          max: MAX_VALUE_LENGHT_RANGO_TENSION_NOMINAL,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_RANGO_TENSION_NOMINAL} must be between ${MIN_VALUE_LENGHT_RANGO_TENSION_NOMINAL} and ${MAX_VALUE_LENGHT_RANGO_TENSION_NOMINAL} characters`,
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
      'ERROR in checkBodyFieldsUpdateElectrolyticCapacitor() function. Caused by ' +
        error,
    );
    return [];
  }
};

module.exports = {
  checkBodyFieldsAddElectrolyticCapacitor,
  checkBodyFieldsUpdateElectrolyticCapacitor,
};
