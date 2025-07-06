//External
const mosfetTransistorRouter = require('express').Router();
//Controllers
const {
  checkBodyFieldsAddMosfetTransistor,
  createMosfetTransistorController,
  checkBodyFieldsUpdateMosfetTransistor,
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
} = require('../routes-imports/mosfet-transistor-routes-imports');

mosfetTransistorRouter.post(
  '/',
  checkBodyFieldsAddMosfetTransistor(),
  createMosfetTransistorController,
);

mosfetTransistorRouter.patch(
  '/:id',
  checkBodyFieldsUpdateMosfetTransistor(),
  updateMosfetTransistorController,
);

mosfetTransistorRouter.delete('/:id', deleteMosfetTransistorController);

mosfetTransistorRouter.get('/list', getAllMosfetTransistorController);

mosfetTransistorRouter.get(
  '/list-with-attributes',
  getAllWithAttributesMosfetTransistorController,
);

mosfetTransistorRouter.get('/id/:id', getMosfetTransistorByIdController);

mosfetTransistorRouter.get('/componentes/id/:componentId', getMosfetTransistorByComponentIdController);

mosfetTransistorRouter.get('/tipo/:tipo', getAllMosfetTransistorLikeTipoController);

mosfetTransistorRouter.get('/voltaje-drenaje-fuente/:voltajeDrenajeFuente', getAllMosfetTransistorLikeVoltajeDrenajeFuenteController);

mosfetTransistorRouter.get('/corriente-cc-drenaje/:corrienteCcDrenaje', getAllMosfetTransistorLikeCorrienteCcDrenajeController);

mosfetTransistorRouter.get('/disip-max/:disipMax', getAllMosfetTransistorLikeDisipMaxController);

mosfetTransistorRouter.get('/temp-op-max/:tempOpMax', getAllMosfetTransistorLikeTempOpMaxController);

mosfetTransistorRouter.get('/conduct-drenaje-sustrato/:conductDrenajeSustrato', getAllMosfetTransistorLikeConductDrenajeSustratoController);

mosfetTransistorRouter.get('/resist-drenaje-fuente/:resistDrenajeFuente', getAllMosfetTransistorLikeResistDrenajeFuenteController);

module.exports = mosfetTransistorRouter; 