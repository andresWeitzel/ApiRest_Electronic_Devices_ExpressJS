//External
const bipolarTransistorRouter = require('express').Router();
//Controllers
const {
  createBipolarTransistorController,
} = require('../routes-imports/bipolar-transistor-routes-imports');

bipolarTransistorRouter.post(
  '/',
  //checkBodyFieldsAddComponentDetails(),
  createBipolarTransistorController,
);

module.exports = bipolarTransistorRouter;
