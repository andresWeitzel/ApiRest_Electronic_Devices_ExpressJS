//External
const componentDetailRouter = require("express").Router();
//Controllers
const componentDetailController = require("../../controllers/component-detail-controller");

componentDetailRouter.get(
  "/list",
  componentDetailController.getAllComponentDetailController
);

module.exports = componentDetailRouter;
