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
const {
  getBipolarTransistorByIdController,
} = require('../../controllers/bipolar-transistor/get-by-id');
const {
  getBipolarTransistorByComponentIdController,
} = require('../../controllers/bipolar-transistor/get-by-component-id');
const {
  getAllBipolarTransistorLikeTipoController,
} = require('../../controllers/bipolar-transistor/get-all-like-tipo');
const {
  getAllBipolarTransistorLikeVoltajeColecEmisController,
} = require('../../controllers/bipolar-transistor/get-all-like-voltaje-colec-emis');
const {
  getAllBipolarTransistorLikeVoltajeColecBaseController,
} = require('../../controllers/bipolar-transistor/get-all-like-voltaje-colec-base');
const {
  getAllBipolarTransistorLikeVoltajeEmisBaseController,
} = require('../../controllers/bipolar-transistor/get-all-like-voltaje-emis-base');
const {
  getAllBipolarTransistorLikeVoltajeColecEmisSatController,
} = require('../../controllers/bipolar-transistor/get-all-like-voltaje-colec-emis-sat');
const {
  getAllBipolarTransistorLikeCorrienteColecController,
} = require('../../controllers/bipolar-transistor/get-all-like-corriente-colec');
const {
  getAllBipolarTransistorLikeGananciaHfeController,
} = require('../../controllers/bipolar-transistor/get-all-like-ganancia-hfe');
const {
  getAllBipolarTransistorLikeDisipMaxController,
} = require('../../controllers/bipolar-transistor/get-all-like-disip-max');
const {
  getAllBipolarTransistorLikeTempJunturaController,
} = require('../../controllers/bipolar-transistor/get-all-like-temp-juntura');

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
  getBipolarTransistorByIdController,
  getBipolarTransistorByComponentIdController,
  getAllBipolarTransistorLikeTipoController,
  getAllBipolarTransistorLikeVoltajeColecEmisController,
  getAllBipolarTransistorLikeVoltajeColecBaseController,
  getAllBipolarTransistorLikeVoltajeEmisBaseController,
  getAllBipolarTransistorLikeVoltajeColecEmisSatController,
  getAllBipolarTransistorLikeCorrienteColecController,
  getAllBipolarTransistorLikeGananciaHfeController,
  getAllBipolarTransistorLikeDisipMaxController,
  getAllBipolarTransistorLikeTempJunturaController,
};
