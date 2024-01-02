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

bipolarTransistorRouter.delete('/:id', deleteBipolarTransistorController);

module.exports = bipolarTransistorRouter;
