//External
const componentRouter = require('express').Router();
const {check, validationResult } = require("express-validator");
//Controllers
const componentController = require("../../controllers/component.controller");
//Helpers
const { componentValidation } = require('../../helpers/validations/component.validation');
//Const-vars
const MIN_VALUE_CODIGO = 3;
const MAX_VALUE_CODIGO = 100;

componentRouter.post('/',  [
    check("codigo")
    .exists().withMessage("The code of component is required")
    .isString().withMessage("The code of component should be string")
    .isLength({ min: MIN_VALUE_CODIGO, max:MAX_VALUE_CODIGO }).withMessage(`The value of the codigo must be between ${MIN_VALUE_CODIGO} and ${MAX_VALUE_CODIGO} characters`),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } },componentController.addComponentController);

componentRouter.put('/id/:id', componentController.updateComponentController);

componentRouter.get('/list', componentController.getAllComponentController);

componentRouter.get('/list-with-attributes', componentController.getAllWithAttributesComponentController);

componentRouter.get('/id/:id', componentController.getComponentByIdController)

componentRouter.get('/codigo/:codigo', componentController.getAllComponentLikeCodigoController);

componentRouter.get('/imagen/:imagen', componentController.getAllComponentLikeImagenController);

componentRouter.get('/nro-pieza/:nroPieza', componentController.getAllComponentLikeNroPiezaController);

componentRouter.get('/categoria-fabricante', componentController.getAllComponentLikeCategoriaFabricanteController);

//component and component_detail tables
componentRouter.get('/list-with-details', componentController.getAllWithDetailComponentController);

//component and bipolar-transistor
componentRouter.get('/bipolar-transistor-list', componentController.getAllWithBipolarTransistorComponentController);

//component wih all models 
componentRouter.get('/list-all-models', componentController.getAllWithAllModelsComponentController);

module.exports=componentRouter
