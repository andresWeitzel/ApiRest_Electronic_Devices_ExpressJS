//External
const electrolyticCapacitorRouter = require('express').Router();
//Controllers
const {
  checkBodyFieldsAddElectrolyticCapacitor,
  createElectrolyticCapacitorController,
  checkBodyFieldsUpdateElectrolyticCapacitor,
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
} = require('../routes-imports/electrolytic-capacitor-routes-imports');

electrolyticCapacitorRouter.post(
  '/',
  checkBodyFieldsAddElectrolyticCapacitor(),
  createElectrolyticCapacitorController,
);

electrolyticCapacitorRouter.patch(
  '/:id',
  checkBodyFieldsUpdateElectrolyticCapacitor(),
  updateElectrolyticCapacitorController,
);

electrolyticCapacitorRouter.delete('/:id', deleteElectrolyticCapacitorController);

electrolyticCapacitorRouter.get('/list', getAllElectrolyticCapacitorController);

electrolyticCapacitorRouter.get(
  '/list-with-attributes',
  getAllWithAttributesElectrolyticCapacitorController,
);

electrolyticCapacitorRouter.get('/id/:id', getElectrolyticCapacitorByIdController);

electrolyticCapacitorRouter.get('/componentes/id/:componentId', getElectrolyticCapacitorByComponentIdController);

electrolyticCapacitorRouter.get('/tipo/:tipo', getAllElectrolyticCapacitorLikeTipoController);

electrolyticCapacitorRouter.get('/capacitancia/:capacitancia', getAllElectrolyticCapacitorLikeCapacitanciaController);

electrolyticCapacitorRouter.get('/tolerancia/:tolerancia', getAllElectrolyticCapacitorLikeToleranciaController);

electrolyticCapacitorRouter.get('/rango-temperatura/:rangoTemperatura', getAllElectrolyticCapacitorLikeRangoTemperaturaController);

electrolyticCapacitorRouter.get('/rango-tension-nominal/:rangoTensionNominal', getAllElectrolyticCapacitorLikeRangoTensionNominalController);

module.exports = electrolyticCapacitorRouter; 