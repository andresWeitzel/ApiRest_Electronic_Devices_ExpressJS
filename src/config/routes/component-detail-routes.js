//External
const componentDetailRouter = require("express").Router();
//Controllers
const {
  addComponentDetailController,
  getAllComponentDetailsController,
  updateComponentDetailController,
  deleteComponentDetailController
} = require("../../controllers/component-detail.controller");
//Helpers
const {
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail
} = require("../../helpers/validations/component-detail/express-validator");

componentDetailRouter.post(
  "/",
  checkBodyFieldsAddComponentDetails(),
  addComponentDetailController
);

componentDetailRouter.patch(
  "/:id",
  checkBodyFieldsUpdateComponentDetail(),
  updateComponentDetailController
);

componentDetailRouter.delete("/:id", deleteComponentDetailController);

componentDetailRouter.get("/list", getAllComponentDetailsController);

module.exports = componentDetailRouter;
