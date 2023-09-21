//External
const componentDetailRouter = require("express").Router();
//Controllers
const componentDetailController = require("../../controllers/component-detail.controller");

componentDetailRouter.get(
  "/list",
  componentDetailController.getAllComponentDetailsController
);


componentDetailRouter.post(
  "/",
  componentDetailController.addComponentDetailController
);

module.exports = componentDetailRouter;
