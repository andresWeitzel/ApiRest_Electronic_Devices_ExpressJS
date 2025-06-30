//External
const componentRouter = require('express').Router();
//controllers
const {
  //checks
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
  //controllers
  createComponentController,
  updateComponentController,
  deleteComponentController,
  getAllComponentController,
  getAllWithAttributesComponentController,
  getAllWithDetailComponentController,
  getAllWithBipolarTransistorComponentController,
  getAllWithElectronicCapacitorComponentController,
  getAllWithMosfetTransistorComponentController,
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  getAllComponentLikeCodeController,
  getAllComponentLikeImageController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeDescriptionController,
  getAllComponentLikeStockController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
} = require('../routes-imports/component-routes-imports');

componentRouter.post(
  '/',
  checkBodyFieldsAddComponent(),
  createComponentController,
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

//component and electronic-capacitor
componentRouter.get(
  '/electronic-capacitor-list',
  getAllWithElectronicCapacitorComponentController,
);

//component and mosfet-transistor
componentRouter.get(
  '/mosfet-transistor-list',
  getAllWithMosfetTransistorComponentController,
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
