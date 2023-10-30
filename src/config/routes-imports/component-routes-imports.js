const {
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
} = require('../../controllers/component.controller');
//External
const componentRouter = require('express').Router();
//validators
const {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
} = require('../../helpers/validations/component/express-validator');
//Controllers
const {
  createComponentController,
} = require('../../controllers/component/create');
const {
  updateComponentController,
} = require('../../controllers/component/update');
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
  getAllComponentLikePartNumberController,
} = require('../../controllers/component/get-all-like-part-number');
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
  getAllComponentLikeCategoryAndMakerController,
} = require('../../controllers/component/get-all-like-category-and-maker');
const {
  getAllComponentLikeDescriptionController,
} = require('../../controllers/component/get-all-like-description');

module.exports = {
  //For migration
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
  updateComponentController,
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
  getAllComponentController,
  getAllComponentLikeCodeController,
  getAllComponentLikeImageController,
  getAllWithAttributesComponentController,
  getAllWithBipolarTransistorComponentController,
  getAllWithDetailComponentController,
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeDescriptionController,
};
