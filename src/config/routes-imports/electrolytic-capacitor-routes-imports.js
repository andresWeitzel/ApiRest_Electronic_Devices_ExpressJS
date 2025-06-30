//Validators
const {
  checkBodyFieldsAddElectrolyticCapacitor,
  checkBodyFieldsUpdateElectrolyticCapacitor,
} = require('../../helpers/validations/electrolytic-capacitor/express-validator');
//Controllers
const {
  createElectrolyticCapacitorController,
} = require('../../controllers/electrolytic-capacitor/create');
const {
  updateElectrolyticCapacitorController,
} = require('../../controllers/electrolytic-capacitor/update');
const {
  deleteElectrolyticCapacitorController,
} = require('../../controllers/electrolytic-capacitor/delete');
const {
  getAllElectrolyticCapacitorController,
} = require('../../controllers/electrolytic-capacitor/get-all');
const {
  getAllWithAttributesElectrolyticCapacitorController,
} = require('../../controllers/electrolytic-capacitor/get-all-with-attributes');
const {
  getElectrolyticCapacitorByIdController,
} = require('../../controllers/electrolytic-capacitor/get-by-id');
const {
  getElectrolyticCapacitorByComponentIdController,
} = require('../../controllers/electrolytic-capacitor/get-by-component-id');
const {
  getAllElectrolyticCapacitorLikeTipoController,
} = require('../../controllers/electrolytic-capacitor/get-all-like-tipo');
const {
  getAllElectrolyticCapacitorLikeCapacitanciaController,
} = require('../../controllers/electrolytic-capacitor/get-all-like-capacitancia');
const {
  getAllElectrolyticCapacitorLikeToleranciaController,
} = require('../../controllers/electrolytic-capacitor/get-all-like-tolerancia');
const {
  getAllElectrolyticCapacitorLikeRangoTemperaturaController,
} = require('../../controllers/electrolytic-capacitor/get-all-like-rango-temperatura');
const {
  getAllElectrolyticCapacitorLikeRangoTensionNominalController,
} = require('../../controllers/electrolytic-capacitor/get-all-like-rango-tension-nominal');

module.exports = {
  //Validators
  checkBodyFieldsAddElectrolyticCapacitor,
  checkBodyFieldsUpdateElectrolyticCapacitor,
  //Controllers
  createElectrolyticCapacitorController,
  updateElectrolyticCapacitorController,
  deleteElectrolyticCapacitorController,
  getAllElectrolyticCapacitorController,
  getAllWithAttributesElectrolyticCapacitorController,
  getElectrolyticCapacitorByIdController,
  getElectrolyticCapacitorByComponentIdController,
  getAllElectrolyticCapacitorLikeTipoController,
  getAllElectrolyticCapacitorLikeCapacitanciaController,
  getAllElectrolyticCapacitorLikeToleranciaController,
  getAllElectrolyticCapacitorLikeRangoTemperaturaController,
  getAllElectrolyticCapacitorLikeRangoTensionNominalController,
}; 