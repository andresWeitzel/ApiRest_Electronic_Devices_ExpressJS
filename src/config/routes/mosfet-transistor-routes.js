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

module.exports = mosfetTransistorRouter; 