//External
const componentRouter = require('express').Router();
const {
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  getAllComponentLikeCodeController,
  getAllComponentLikeDescriptionController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
  getAllComponentLikeImageController,
} = require('../../controllers/component.controller');
//Controllers
const { addComponentController } = require('../../controllers/component/add');
const {
  deleteComponentController,
} = require('../../controllers/component/delete');
const {
  getAllComponentController,
} = require('../../controllers/component/get-all');
const {
  getAllWithAttributesComponentController,
} = require('../../controllers/component/get-all-with-attributes');
const {
  getAllWithBipolarTransistorComponentController,
} = require('../../controllers/component/get-all-with-bipolar-transistor');
const {
  getAllWithDetailComponentController,
} = require('../../controllers/component/get-all-with-details');
const {
  updateComponentController,
} = require('../../controllers/component/update');
//validators
const {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
} = require('../../helpers/validations/component/express-validator');

componentRouter.post(
  '/',
  checkBodyFieldsAddComponent(),
  addComponentController,
);

componentRouter.patch(
  '/id/:id',
  checkBodyFieldsUpdateComponent(),
  updateComponentController,
);

componentRouter.delete('/:id', deleteComponentController);

componentRouter.get('/list', getAllComponentController);

componentRouter.get(
  '/list-with-attributes',
  getAllWithAttributesComponentController,
);

//component and component_detail tables
componentRouter.get('/list-with-details', getAllWithDetailComponentController);

//component and bipolar-transistor
componentRouter.get(
  '/bipolar-transistor-list',
  getAllWithBipolarTransistorComponentController,
);

//component wih all models
componentRouter.get('/list-all-models', getAllWithAllModelsComponentController);

componentRouter.get('/id/:id', getComponentByIdController);

componentRouter.get('/codigo/:codigo', getAllComponentLikeCodeController);

componentRouter.get('/imagen/:imagen', getAllComponentLikeImageController);

componentRouter.get(
  '/nro-pieza/:nroPieza',
  getAllComponentLikePartNumberController,
);

componentRouter.get(
  '/categoria-fabricante',
  getAllComponentLikeCategoryAndMakerController,
);

componentRouter.get(
  '/descripcion/:descripcion',
  getAllComponentLikeDescriptionController,
);

componentRouter.get('/stock/:stock', getAllComponentLikeStockController);

componentRouter.get(
  '/stock-maximo/:stock',
  getAllComponentLikeStockMaxController,
);

componentRouter.get(
  '/stock-minimo-maximo',
  getAllComponentLikeStockMinMaxController,
);

componentRouter.get('/precio/:precio', getAllComponentLikePriceController);

componentRouter.get(
  '/precio-maximo/:precioMax',
  getAllComponentLikePriceMaxController,
);

componentRouter.get(
  '/precio-minimo-maximo',
  getAllComponentLikePriceMinMaxController,
);

module.exports = componentRouter;
