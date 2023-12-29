//Validators
const {
  checkBodyFieldsAddBipolarTransistor,
  checkBodyFieldsUpdateBipolarTransistor,
} = require('../../helpers/validations/bipolar-transistor/express-validator');
//Controllers
const {
  createBipolarTransistorController,
} = require('../../controllers/bipolar-transistor/create');
const {
  updateBipolarTransistorController,
} = require('../../controllers/bipolar-transistor/update');
const {
  getAllBipolarTransistorController,
} = require('../../controllers/bipolar-transistor/get-all');
const {
  getAllWithAttributesBipolarTransistorController,
} = require('../../controllers/bipolar-transistor/get-all-with-attributes');
const {
  deleteBipolarTransistorController,
} = require('../../controllers/bipolar-transistor/delete');

module.exports = {
  //Validators
  checkBodyFieldsAddBipolarTransistor,
  checkBodyFieldsUpdateBipolarTransistor,
  //Controllers
  createBipolarTransistorController,
  updateBipolarTransistorController,
  getAllBipolarTransistorController,
  getAllWithAttributesBipolarTransistorController,
  deleteBipolarTransistorController,
};
