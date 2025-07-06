//External
const bipolarTransistorRouter = require('express').Router();
//Controllers and checks
const {
  //checks
  checkBodyFieldsAddBipolarTransistor,
  checkBodyFieldsUpdateBipolarTransistor,
  //controllers
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
} = require('../routes-imports/bipolar-transistor-routes-imports');

bipolarTransistorRouter.post(
  '/',
  checkBodyFieldsAddBipolarTransistor(),
  createBipolarTransistorController,
);

bipolarTransistorRouter.patch(
  '/:id',
  checkBodyFieldsUpdateBipolarTransistor(),
  updateBipolarTransistorController,
);

bipolarTransistorRouter.get('/list', getAllBipolarTransistorController);

bipolarTransistorRouter.get(
  '/list-with-attributes',
  getAllWithAttributesBipolarTransistorController,
);

bipolarTransistorRouter.get('/id/:id', getBipolarTransistorByIdController);

bipolarTransistorRouter.get('/componentes/id/:componentId', getBipolarTransistorByComponentIdController);

bipolarTransistorRouter.get('/tipo/:tipo', getAllBipolarTransistorLikeTipoController);

bipolarTransistorRouter.get('/voltaje-colec-emis/:voltajeColecEmis', getAllBipolarTransistorLikeVoltajeColecEmisController);

bipolarTransistorRouter.get('/voltaje-colec-base/:voltajeColecBase', getAllBipolarTransistorLikeVoltajeColecBaseController);

bipolarTransistorRouter.get('/voltaje-emis-base/:voltajeEmisBase', getAllBipolarTransistorLikeVoltajeEmisBaseController);

bipolarTransistorRouter.get('/voltaje-colec-emis-sat/:voltajeColecEmisSat', getAllBipolarTransistorLikeVoltajeColecEmisSatController);

bipolarTransistorRouter.get('/corriente-colec/:corrienteColec', getAllBipolarTransistorLikeCorrienteColecController);

bipolarTransistorRouter.get('/ganancia-hfe/:gananciaHfe', getAllBipolarTransistorLikeGananciaHfeController);

bipolarTransistorRouter.get('/disip-max/:disipMax', getAllBipolarTransistorLikeDisipMaxController);

bipolarTransistorRouter.get('/temp-juntura/:tempJuntura', getAllBipolarTransistorLikeTempJunturaController);

bipolarTransistorRouter.delete('/:id', deleteBipolarTransistorController);

module.exports = bipolarTransistorRouter;
