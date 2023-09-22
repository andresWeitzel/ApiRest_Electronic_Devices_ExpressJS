//External
const componentRouter = require("express").Router();
//Controllers
const componentController = require("../../controllers/component.controller");
const {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent
} = require("../../helpers/validations/component/express-validator");

componentRouter.post(
  "/",
  checkBodyFieldsAddComponent(),
  componentController.addComponentController
);

componentRouter.patch(
  "/id/:id",
  checkBodyFieldsUpdateComponent(),
  componentController.updateComponentController
);

componentRouter.delete(
  "/:id",
  componentController.deleteComponentController
);


componentRouter.get("/list", componentController.getAllComponentController);

componentRouter.get(
  "/list-with-attributes",
  componentController.getAllWithAttributesComponentController
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

componentRouter.get("/id/:id", componentController.getComponentByIdController);

componentRouter.get(
  "/codigo/:codigo",
  componentController.getAllComponentLikeCodeController
);

componentRouter.get(
  "/imagen/:imagen",
  componentController.getAllComponentLikeImageController
);

componentRouter.get(
  "/nro-pieza/:nroPieza",
  componentController.getAllComponentLikePartNumberController
);

componentRouter.get(
  "/categoria-fabricante",
  componentController.getAllComponentLikeCategoryAndMakerController
);

componentRouter.get(
  "/descripcion/:descripcion",
  componentController.getAllComponentLikeDescriptionController
);

componentRouter.get(
  "/stock/:stock",
  componentController.getAllComponentLikeStockController
);

componentRouter.get(
  "/stock-maximo/:stock",
  componentController.getAllComponentLikeStockMaxController
);

componentRouter.get(
  "/stock-minimo-maximo",
  componentController.getAllComponentLikeStockMinMaxController
);

componentRouter.get(
  "/precio/:precio",
  componentController.getAllComponentLikePriceController
);

componentRouter.get(
  "/precio-maximo/:precioMax",
  componentController.getAllComponentLikePriceMaxController
);

componentRouter.get(
  "/precio-minimo-maximo",
  componentController.getAllComponentLikePriceMinMaxController
);

module.exports = componentRouter;
