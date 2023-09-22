//External
const componentDetailRouter = require("express").Router();
//Controllers
const componentDetailController = require("../../controllers/component-detail.controller");
//Helpers
const { checkBodyFieldsAddComponentDetails } = require("../../helpers/validations/component-detail/express-validator");


componentDetailRouter.post(
  "/",
  checkBodyFieldsAddComponentDetails(),
  componentDetailController.addComponentDetailController
);

componentDetailRouter.get(
  "/list",
  componentDetailController.getAllComponentDetailsController
);


module.exports = componentDetailRouter;
