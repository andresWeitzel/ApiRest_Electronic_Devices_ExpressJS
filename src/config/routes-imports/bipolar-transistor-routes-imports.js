//Validators
const { checkBodyFieldsAddBipolarTransistor } = require('../../helpers/validations/bipolar-transistor/express-validator');
//Controllers
const {
  createBipolarTransistorController,
} = require('../../controllers/bipolar-transistor/create');

//   const {
//     updateComponentDetailController,
//   } = require('../../controllers/component-detail/update');
//   const {
//     deleteComponentDetailController,
//   } = require('../../controllers/component-detail/delete');
//   const {
//     getAllComponentDetailController,
//   } = require('../../controllers/component-detail/get-all');
//   const {
//     getAllWithAttributesComponentDetailController,
//   } = require('../../controllers/component-detail/get-all-with-attributes');

module.exports = {
  // //Validators
  checkBodyFieldsAddBipolarTransistor,
  // checkBodyFieldsUpdateComponentDetail,
  //Controllers
  createBipolarTransistorController,
  // updateComponentDetailController,
  // deleteComponentDetailController,
  // getAllComponentDetailController,
  // getAllWithAttributesComponentDetailController,
};

