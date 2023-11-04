//Validators
const {
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
} = require('../../helpers/validations/component-detail/express-validator');
//Controllers
const {
  createComponentDetailController,
} = require('../../controllers/component-detail/create');
const {
  updateComponentDetailController,
} = require('../../controllers/component-detail/update');
const {
  deleteComponentDetailController,
} = require('../../controllers/component-detail/delete');
const {
  getAllComponentDetailController,
} = require('../../controllers/component-detail/get-all');
const {
  getAllWithAttributesComponentDetailController,
} = require('../../controllers/component-detail/get-all-with-attributes');

module.exports = {
  //Validators
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
  //Controllers
  createComponentDetailController,
  updateComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailController,
  getAllWithAttributesComponentDetailController,
};
