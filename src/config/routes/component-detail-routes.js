//External
const componentDetailRouter = require("express").Router();
//Controllers
const {
  checkBodyFieldsAddComponentDetails,
  createComponentDetailController,
  checkBodyFieldsUpdateComponentDetail,
  updateComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailController,
  getAllWithAttributesComponentDetailController,
} = require("../routes-imports/component-detail-routes-imports");

componentDetailRouter.post(
  "/",
  checkBodyFieldsAddComponentDetails(),
  createComponentDetailController
);

componentDetailRouter.patch(
  "/:id",
  checkBodyFieldsUpdateComponentDetail(),
  updateComponentDetailController
);

componentDetailRouter.delete("/:id", deleteComponentDetailController);

componentDetailRouter.get("/list", getAllComponentDetailController);

componentDetailRouter.get(
  "/list-with-attributes",
  getAllWithAttributesComponentDetailController
);

module.exports = componentDetailRouter;
