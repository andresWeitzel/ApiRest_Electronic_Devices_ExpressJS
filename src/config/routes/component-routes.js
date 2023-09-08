//External
const componentRouter = require("express").Router();
const { check, validationResult } = require("express-validator");
//Controllers
const componentController = require("../../controllers/component.controller");
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
const DECIMAL_PRECISION_VALUE = 6;
const DECIMAL_SCALE_VALUE = 3;

componentRouter.post(
  "/",
  [
    //Check codigo
    check(`${NAME_VALUE_CODIGO} `)
      .exists()
      .withMessage(`The ${NAME_VALUE_CODIGO} of component is required`)
      .isString()
      .withMessage("The code of component should be string")
      .isLength({ min: MIN_VALUE_LENGHT_CODIGO, max: MAX_VALUE_LENGHT_CODIGO })
      .withMessage(
        `The value of the codigo must be between ${MIN_VALUE_LENGHT_CODIGO} and ${MAX_VALUE_LENGHT_CODIGO} characters`
      ),
    //Check imagen
    check("imagen")
      .exists()
      .withMessage("The image of component is required")
      .isString()
      .withMessage("The image of component should be string")
      .isLength({ min: MIN_VALUE_LENGHT_IMAGEN, max: MAX_VALUE_LENGHT_IMAGEN })
      .withMessage(
        `The value of the image must be between ${MIN_VALUE_LENGHT_IMAGEN} and ${MAX_VALUE_LENGHT_IMAGEN} characters`
      ),
    //Check nro_pieza
    check("nro_pieza")
      .exists()
      .withMessage("The nro_pieza of component is required")
      .isString()
      .withMessage("The nro_pieza of component should be string")
      .isLength({
        min: MIN_VALUE_LENGHT_NRO_PIEZA,
        max: MAX_VALUE_LENGHT_NRO_PIEZA
      })
      .withMessage(
        `The value of the nro_pieza must be between ${MIN_VALUE_LENGHT_NRO_PIEZA} and ${MAX_VALUE_LENGHT_NRO_PIEZA} characters`
      ),
    //Check categoria
    check("categoria")
      .exists()
      .withMessage("The nro_pieza of component is required")
      .isString()
      .withMessage("The nro_pieza of component should be string")
      .isLength({
        min: MIN_VALUE_LENGHT_NRO_PIEZA,
        max: MAX_VALUE_LENGHT_NRO_PIEZA
      })
      .withMessage(
        `The value of the nro_pieza must be between ${MIN_VALUE_LENGHT_NRO_PIEZA} and ${MAX_VALUE_LENGHT_NRO_PIEZA} characters`
      )
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  componentController.addComponentController
);

componentRouter.put("/id/:id", componentController.updateComponentController);

componentRouter.get("/list", componentController.getAllComponentController);

componentRouter.get(
  "/list-with-attributes",
  componentController.getAllWithAttributesComponentController
);

componentRouter.get("/id/:id", componentController.getComponentByIdController);

componentRouter.get(
  "/codigo/:codigo",
  componentController.getAllComponentLikeCodigoController
);

componentRouter.get(
  "/imagen/:imagen",
  componentController.getAllComponentLikeImagenController
);

componentRouter.get(
  "/nro-pieza/:nroPieza",
  componentController.getAllComponentLikeNroPiezaController
);

componentRouter.get(
  "/categoria-fabricante",
  componentController.getAllComponentLikeCategoriaFabricanteController
);

//component and component_detail tables
componentRouter.get(
  "/list-with-details",
  componentController.getAllWithDetailComponentController
);

//component and bipolar-transistor
componentRouter.get(
  "/bipolar-transistor-list",
  componentController.getAllWithBipolarTransistorComponentController
);

//component wih all models
componentRouter.get(
  "/list-all-models",
  componentController.getAllWithAllModelsComponentController
);

module.exports = componentRouter;
