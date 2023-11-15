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

module.exports = bipolarTransistorRouter;
