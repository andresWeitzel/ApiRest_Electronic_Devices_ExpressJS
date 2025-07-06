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
const {
  getMosfetTransistorByIdController,
} = require('../../controllers/mosfet-transistor/get-by-id');
const {
  getMosfetTransistorByComponentIdController,
} = require('../../controllers/mosfet-transistor/get-by-component-id');
const {
  getAllMosfetTransistorLikeTipoController,
} = require('../../controllers/mosfet-transistor/get-all-like-tipo');
const {
  getAllMosfetTransistorLikeVoltajeDrenajeFuenteController,
} = require('../../controllers/mosfet-transistor/get-all-like-voltaje-drenaje-fuente');
const {
  getAllMosfetTransistorLikeCorrienteCcDrenajeController,
} = require('../../controllers/mosfet-transistor/get-all-like-corriente-cc-drenaje');
const {
  getAllMosfetTransistorLikeDisipMaxController,
} = require('../../controllers/mosfet-transistor/get-all-like-disip-max');
const {
  getAllMosfetTransistorLikeTempOpMaxController,
} = require('../../controllers/mosfet-transistor/get-all-like-temp-op-max');
const {
  getAllMosfetTransistorLikeConductDrenajeSustratoController,
} = require('../../controllers/mosfet-transistor/get-all-like-conduct-drenaje-sustrato');
const {
  getAllMosfetTransistorLikeResistDrenajeFuenteController,
} = require('../../controllers/mosfet-transistor/get-all-like-resist-drenaje-fuente');

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
  getMosfetTransistorByIdController,
  getMosfetTransistorByComponentIdController,
  getAllMosfetTransistorLikeTipoController,
  getAllMosfetTransistorLikeVoltajeDrenajeFuenteController,
  getAllMosfetTransistorLikeCorrienteCcDrenajeController,
  getAllMosfetTransistorLikeDisipMaxController,
  getAllMosfetTransistorLikeTempOpMaxController,
  getAllMosfetTransistorLikeConductDrenajeSustratoController,
  getAllMosfetTransistorLikeResistDrenajeFuenteController,
}; 