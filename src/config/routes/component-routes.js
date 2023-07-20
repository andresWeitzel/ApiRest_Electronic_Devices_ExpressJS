//External
const componentRouter = require('express').Router();
//Controllers
const componentController = require("../../controllers/component-controller");

componentRouter.post('/', componentController.addComponentController);

componentRouter.get('/list', componentController.getAllComponentController);

componentRouter.get('/list-with-attributes', componentController.getAllWithAttributesComponentController);

componentRouter.get('/id/:id', componentController.getComponentByIdController)

componentRouter.get('/codigo/:codigo', componentController.getAllComponentLikeCodigoController);

componentRouter.get('/imagen/:imagen', componentController.getAllComponentLikeImagenController);

componentRouter.get('/nro-pieza/:nroPieza', componentController.getAllComponentLikeNroPiezaController);

componentRouter.get('/categoria-fabricante', componentController.getAllComponentLikeCategoriaFabricanteController);

module.exports=componentRouter
