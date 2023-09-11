//External
const componentRouter = require("express").Router();
const { validationResult } = require("express-validator");
//Controllers
const componentController = require("../../controllers/component.controller");
const { checkBodyFieldsAddUpdateComponent } = require("../../helpers/validations/express-validator");
//Const-vars


componentRouter.post(
  "/",
  checkBodyFieldsAddUpdateComponent(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  componentController.addComponentController
);

componentRouter.put("/id/:id",
checkBodyFieldsAddUpdateComponent(),
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
},
componentController.updateComponentController);

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
