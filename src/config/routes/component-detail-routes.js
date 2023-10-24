//External
const componentDetailRouter = require('express').Router();
//Controllers
const {
  addComponentDetailController,
  updateComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailController,
  getAllWithAttributesComponentDetailController,
} = require('../../controllers/component-detail.controller');
//Helpers
const {
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
} = require('../../helpers/validations/component-detail/express-validator');

componentDetailRouter.post(
  '/',
  checkBodyFieldsAddComponentDetails(),
  addComponentDetailController,
);

componentDetailRouter.patch(
  '/:id',
  checkBodyFieldsUpdateComponentDetail(),
  updateComponentDetailController,
);

componentDetailRouter.delete('/:id', deleteComponentDetailController);

componentDetailRouter.get('/list', getAllComponentDetailController);

componentDetailRouter.get(
  '/list-with-attributes',
  getAllWithAttributesComponentDetailController,
);

module.exports = componentDetailRouter;
