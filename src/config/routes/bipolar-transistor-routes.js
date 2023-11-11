//External
const bipolarTransistorRouter = require('express').Router();
//Controllers
const {
  createBipolarTransistorController,
  checkBodyFieldsAddBipolarTransistor,
} = require('../routes-imports/bipolar-transistor-routes-imports');

bipolarTransistorRouter.post(
  '/',
  checkBodyFieldsAddBipolarTransistor(),
  createBipolarTransistorController,
);

module.exports = bipolarTransistorRouter;
