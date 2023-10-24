//External
const { check } = require('express-validator');
const { validationResult } = require('express-validator');
//Const-vars
const NAME_VALUE_CODIGO = 'codigo';
const NAME_VALUE_IMAGEN = 'imagen';
const NAME_VALUE_NRO_PIEZA = 'nro_pieza';
const NAME_VALUE_CATEGORIA = 'categoria';
const NAME_VALUE_DESCRIPCION = 'descripcion';
const NAME_VALUE_FABRICANTE = 'fabricante';
const NAME_VALUE_STOCK = 'stock';
const NAME_VALUE_PRECIO = 'precio';
const MIN_VALUE_LENGHT_CODIGO = 3;
const MAX_VALUE_LENGHT_CODIGO = 100;
const MIN_VALUE_LENGHT_IMAGEN = 20;
const MAX_VALUE_LENGHT_IMAGEN = 1000;
const MIN_VALUE_LENGHT_NRO_PIEZA = 3;
const MAX_VALUE_LENGHT_NRO_PIEZA = 200;
const MIN_VALUE_LENGHT_CATEGORIA = 4;
const MAX_VALUE_LENGHT_CATEGORIA = 100;
const MIN_VALUE_LENGHT_DESCRIPCION = 5;
const MAX_VALUE_LENGHT_DESCRIPCION = 400;
const MIN_VALUE_LENGHT_FABRICANTE = 3;
const MAX_VALUE_LENGHT_FABRICANTE = 100;
const MIN_VALUE_STOCK = 0;
const MAX_VALUE_STOCK = 100000;
const MIN_VALUE_PRECIO = 0.05;
const MAX_VALUE_PRECIO = 100.0;

/**
 * @description check all validations for the body fields to add a component
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsAddComponent = () => {
  try {
    return [
      //Check codigo
      check(`${NAME_VALUE_CODIGO}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_CODIGO} of component is required`)
        .isString()
        .withMessage('The code of component should be string')
        .isLength({
          min: MIN_VALUE_LENGHT_CODIGO,
          max: MAX_VALUE_LENGHT_CODIGO,
        })
        .withMessage(
          `The value of the codigo must be between ${MIN_VALUE_LENGHT_CODIGO} and ${MAX_VALUE_LENGHT_CODIGO} characters`,
        ),
      //Check imagen
      check(`${NAME_VALUE_IMAGEN}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_IMAGEN} of component is required`)
        .isString()
        .withMessage(`The ${NAME_VALUE_IMAGEN} of component should be string`)
        .isLength({
          min: MIN_VALUE_LENGHT_IMAGEN,
          max: MAX_VALUE_LENGHT_IMAGEN,
        })
        .withMessage(
          `The value of the image must be between ${MIN_VALUE_LENGHT_IMAGEN} and ${MAX_VALUE_LENGHT_IMAGEN} characters`,
        ),
      //Check nro_pieza
      check(`${NAME_VALUE_NRO_PIEZA}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_NRO_PIEZA} of component is required`)
        .isString()
        .withMessage(
          `The ${NAME_VALUE_NRO_PIEZA} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_NRO_PIEZA,
          max: MAX_VALUE_LENGHT_NRO_PIEZA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_NRO_PIEZA} must be between ${MIN_VALUE_LENGHT_NRO_PIEZA} and ${MAX_VALUE_LENGHT_NRO_PIEZA} characters`,
        ),
      //Check categoria
      check(`${NAME_VALUE_CATEGORIA}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_CATEGORIA} of component is required`)
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CATEGORIA} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CATEGORIA,
          max: MAX_VALUE_LENGHT_CATEGORIA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CATEGORIA} must be between ${MIN_VALUE_LENGHT_CATEGORIA} and ${MAX_VALUE_LENGHT_CATEGORIA} characters`,
        ),
      //Check descripcion
      check(`${NAME_VALUE_DESCRIPCION}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_DESCRIPCION} of component is required`)
        .isString()
        .withMessage(
          `The ${NAME_VALUE_DESCRIPCION} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_DESCRIPCION,
          max: MAX_VALUE_LENGHT_DESCRIPCION,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_DESCRIPCION} must be between ${MIN_VALUE_LENGHT_DESCRIPCION} and ${MAX_VALUE_LENGHT_DESCRIPCION} characters`,
        ),
      //Check fabricante
      check(`${NAME_VALUE_FABRICANTE}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_FABRICANTE} of component is required`)
        .isString()
        .withMessage(
          `The ${NAME_VALUE_FABRICANTE} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_FABRICANTE,
          max: MAX_VALUE_LENGHT_FABRICANTE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_FABRICANTE} must be between ${MIN_VALUE_LENGHT_FABRICANTE} and ${MAX_VALUE_LENGHT_FABRICANTE} characters`,
        ),
      //Check stock
      check(`${NAME_VALUE_STOCK}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_STOCK} of component is required`)
        .isInt({ min: MIN_VALUE_STOCK, max: MAX_VALUE_STOCK })
        .withMessage(
          `The ${NAME_VALUE_STOCK} of component should be number (integer) and must be betwenn ${MIN_VALUE_STOCK} to ${MAX_VALUE_STOCK}`,
        ),
      //Check precio
      check(`${NAME_VALUE_PRECIO}`)
        .exists()
        .withMessage(`The ${NAME_VALUE_PRECIO} of component is required`)
        .isFloat({ min: MIN_VALUE_PRECIO, max: MAX_VALUE_PRECIO })
        .withMessage(
          `The ${NAME_VALUE_PRECIO} of component should be number (float) and must be betwenn ${MIN_VALUE_PRECIO} to ${MAX_VALUE_PRECIO}`,
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
    msg = `Error in checkBodyFieldsAddComponent() function. Caused by ${error}.`;
    console.log(msg);
  }
};

/**
 * @description check all validations for the body fields to update a component
 * @returns an array with all the validations that do not comply with what was tested
 */
const checkBodyFieldsUpdateComponent = () => {
  try {
    return [
      //Check codigo
      check(`${NAME_VALUE_CODIGO}`)
        .optional()
        .isString()
        .withMessage('The code of component should be string')
        .isLength({
          min: MIN_VALUE_LENGHT_CODIGO,
          max: MAX_VALUE_LENGHT_CODIGO,
        })
        .withMessage(
          `The value of the codigo must be between ${MIN_VALUE_LENGHT_CODIGO} and ${MAX_VALUE_LENGHT_CODIGO} characters`,
        ),
      //Check imagen
      check(`${NAME_VALUE_IMAGEN}`)
        .optional()
        .isString()
        .withMessage(`The ${NAME_VALUE_IMAGEN} of component should be string`)
        .isLength({
          min: MIN_VALUE_LENGHT_IMAGEN,
          max: MAX_VALUE_LENGHT_IMAGEN,
        })
        .withMessage(
          `The value of the image must be between ${MIN_VALUE_LENGHT_IMAGEN} and ${MAX_VALUE_LENGHT_IMAGEN} characters`,
        ),
      //Check nro_pieza
      check(`${NAME_VALUE_NRO_PIEZA}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_NRO_PIEZA} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_NRO_PIEZA,
          max: MAX_VALUE_LENGHT_NRO_PIEZA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_NRO_PIEZA} must be between ${MIN_VALUE_LENGHT_NRO_PIEZA} and ${MAX_VALUE_LENGHT_NRO_PIEZA} characters`,
        ),
      //Check categoria
      check(`${NAME_VALUE_CATEGORIA}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_CATEGORIA} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_CATEGORIA,
          max: MAX_VALUE_LENGHT_CATEGORIA,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_CATEGORIA} must be between ${MIN_VALUE_LENGHT_CATEGORIA} and ${MAX_VALUE_LENGHT_CATEGORIA} characters`,
        ),
      //Check descripcion
      check(`${NAME_VALUE_DESCRIPCION}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_DESCRIPCION} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_DESCRIPCION,
          max: MAX_VALUE_LENGHT_DESCRIPCION,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_DESCRIPCION} must be between ${MIN_VALUE_LENGHT_DESCRIPCION} and ${MAX_VALUE_LENGHT_DESCRIPCION} characters`,
        ),
      //Check fabricante
      check(`${NAME_VALUE_FABRICANTE}`)
        .optional()
        .isString()
        .withMessage(
          `The ${NAME_VALUE_FABRICANTE} of component should be string`,
        )
        .isLength({
          min: MIN_VALUE_LENGHT_FABRICANTE,
          max: MAX_VALUE_LENGHT_FABRICANTE,
        })
        .withMessage(
          `The value of the ${NAME_VALUE_FABRICANTE} must be between ${MIN_VALUE_LENGHT_FABRICANTE} and ${MAX_VALUE_LENGHT_FABRICANTE} characters`,
        ),
      //Check stock
      check(`${NAME_VALUE_STOCK}`)
        .optional()
        .isInt({ min: MIN_VALUE_STOCK, max: MAX_VALUE_STOCK })
        .withMessage(
          `The ${NAME_VALUE_STOCK} of component should be number (integer) and must be betwenn ${MIN_VALUE_STOCK} to ${MAX_VALUE_STOCK}`,
        ),
      //Check precio
      check(`${NAME_VALUE_PRECIO}`)
        .optional()
        .isFloat({
          min: MIN_VALUE_PRECIO,
          max: MAX_VALUE_PRECIO,
        })
        .withMessage(
          `The ${NAME_VALUE_PRECIO} of component should be number (float) and must be between ${MIN_VALUE_PRECIO} to ${MAX_VALUE_PRECIO}`,
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
    msg = `Error in checkBodyFieldsUpdateComponent() function. Caused by ${error}.`;
    console.log(msg);
  }
};

module.exports = {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
};
