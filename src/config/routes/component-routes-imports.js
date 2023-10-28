//External
const componentRouter = require('express').Router();
const {
  getAllComponentLikeDescriptionController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
} = require('../../controllers/component.controller');
//Controllers
const {
  createComponentController,
} = require('../../controllers/component/create');
const {
  deleteComponentController,
} = require('../../controllers/component/delete');
const {
  getAllComponentController,
} = require('../../controllers/component/get-all');
const {
  getAllComponentLikeCodeController,
} = require('../../controllers/component/get-all-like-code');
const {
  getAllComponentLikeImageController,
} = require('../../controllers/component/get-all-like-image');
const {
  getAllWithAttributesComponentController,
} = require('../../controllers/component/get-all-with-attributes');
const {
  getAllWithBipolarTransistorComponentController,
} = require('../../controllers/component/get-all-with-bipolar-transistor');
const {
  getAllWithDetailComponentController,
} = require('../../controllers/component/get-all-with-details');
const {
  getAllWithAllModelsComponentController,
} = require('../../controllers/component/get-all-with-models');
const {
  getComponentByIdController,
} = require('../../controllers/component/get-by-id');
const {
  updateComponentController,
} = require('../../controllers/component/update');
//validators
const {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
} = require('../../helpers/validations/component/express-validator');

module.exports = {
  //For migration
  getAllComponentLikeDescriptionController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
  //Migrated
  componentRouter,
  createComponentController,
  deleteComponentController,
  getAllComponentController,
  getAllComponentLikeCodeController,
  getAllComponentLikeImageController,
  getAllWithAttributesComponentController,
  getAllWithBipolarTransistorComponentController,
  getAllWithDetailComponentController,
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  updateComponentController,
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
};
