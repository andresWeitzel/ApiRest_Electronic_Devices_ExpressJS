//validators
const {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
} = require("../../helpers/validations/component/express-validator");
//Controllers
const {
  createComponentController,
} = require("../../controllers/component/create");
const {
  updateComponentController,
} = require("../../controllers/component/update");
const {
  deleteComponentController,
} = require("../../controllers/component/delete");
const {
  getAllComponentController,
} = require("../../controllers/component/get-all");
const {
  getAllComponentLikeCodeController,
} = require("../../controllers/component/get-all-like-code");
const {
  getAllComponentLikeImageController,
} = require("../../controllers/component/get-all-like-image");
const {
  getAllComponentLikePartNumberController,
} = require("../../controllers/component/get-all-like-part-number");
const {
  getAllWithAttributesComponentController,
} = require("../../controllers/component/get-all-with-attributes");
const {
  getAllWithBipolarTransistorComponentController,
} = require("../../controllers/component/get-all-with-bipolar-transistor");
const {
  getAllWithDetailComponentController,
} = require("../../controllers/component/get-all-with-details");
const {
  getAllWithAllModelsComponentController,
} = require("../../controllers/component/get-all-with-models");
const {
  getComponentByIdController,
} = require("../../controllers/component/get-by-id");
const {
  getAllComponentLikeCategoryAndMakerController,
} = require("../../controllers/component/get-all-like-category-and-maker");
const {
  getAllComponentLikeDescriptionController,
} = require("../../controllers/component/get-all-like-description");
const {
  getAllComponentLikeStockController,
} = require("../../controllers/component/get-all-like-stock");
const {
  getAllComponentLikeStockMaxController,
} = require("../../controllers/component/get-all-like-stock-max");
const {
  getAllComponentLikeStockMinMaxController,
} = require("../../controllers/component/get-all-like-stock-min-max");
const {
  getAllComponentLikePriceController,
} = require("../../controllers/component/get-all-like-price");
const {
  getAllComponentLikePriceMaxController,
} = require("../../controllers/component/get-all-like-price-max");
const {
  getAllComponentLikePriceMinMaxController,
} = require("../../controllers/component/get-all-like-price-min-max");

module.exports = {
  //Validators
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent,
  //Controllers
  createComponentController,
  deleteComponentController,
  updateComponentController,
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
  getAllComponentLikeStockController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController,
};
