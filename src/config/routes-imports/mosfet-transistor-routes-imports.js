//Validators
const {
  checkBodyFieldsAddMosfetTransistor,
  checkBodyFieldsUpdateMosfetTransistor,
} = require('../../helpers/validations/mosfet-transistor/express-validator');
//Controllers
const {
  createMosfetTransistorController,
} = require('../../controllers/mosfet-transistor/create');
const {
  updateMosfetTransistorController,
} = require('../../controllers/mosfet-transistor/update');
const {
  deleteMosfetTransistorController,
} = require('../../controllers/mosfet-transistor/delete');
const {
  getAllMosfetTransistorController,
} = require('../../controllers/mosfet-transistor/get-all');
const {
  getAllWithAttributesMosfetTransistorController,
} = require('../../controllers/mosfet-transistor/get-all-with-attributes');

module.exports = {
  //Validators
  checkBodyFieldsAddMosfetTransistor,
  checkBodyFieldsUpdateMosfetTransistor,
  //Controllers
  createMosfetTransistorController,
  updateMosfetTransistorController,
  deleteMosfetTransistorController,
  getAllMosfetTransistorController,
  getAllWithAttributesMosfetTransistorController,
}; 