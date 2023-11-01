//Validators
const {
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
} = require("../../helpers/validations/component-detail/express-validator");
//Controllers
const {
  createComponentDetailController,
} = require("../../controllers/component-detail/create");
const {
  updateComponentDetailController,
} = require("../../controllers/component-detail/update");

module.exports = {
  //Validators
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
  //Controllers
  createComponentDetailController,
  updateComponentDetailController,
};
