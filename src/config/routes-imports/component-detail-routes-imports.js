//Validators
const {
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
} = require('../../helpers/validations/component-detail/express-validator');
//Controllers
const {
  createComponentDetailController,
} = require('../../controllers/component-detail/create');
const {
  updateComponentDetailController,
} = require('../../controllers/component-detail/update');
const {
  deleteComponentDetailController,
} = require('../../controllers/component-detail/delete');
const {
  getAllComponentDetailController,
} = require('../../controllers/component-detail/get-all');
const {
  getAllWithAttributesComponentDetailController,
} = require('../../controllers/component-detail/get-all-with-attributes');
const {
  getComponentDetailByIdController,
} = require('../../controllers/component-detail/get-by-id');
const {
  getComponentDetailByComponentIdController,
} = require('../../controllers/component-detail/get-by-component-id');
const {
  getAllComponentDetailLikeHojaDatosController,
} = require('../../controllers/component-detail/get-all-like-hoja-datos');
const {
  getAllComponentDetailLikeLongitudController,
} = require('../../controllers/component-detail/get-all-like-longitud');
const {
  getAllComponentDetailLikeAnchoController,
} = require('../../controllers/component-detail/get-all-like-ancho');
const {
  getAllComponentDetailLikePesoController,
} = require('../../controllers/component-detail/get-all-like-peso');
const {
  getAllComponentDetailLikeMaterialController,
} = require('../../controllers/component-detail/get-all-like-material');
const {
  getAllComponentDetailLikeVoltajeRecomendadoController,
} = require('../../controllers/component-detail/get-all-like-voltaje-recomendado');
const {
  getAllComponentDetailLikeVoltajeMinEntradaController,
} = require('../../controllers/component-detail/get-all-like-voltaje-min-entrada');
const {
  getAllComponentDetailLikeVoltajeMaxEntradaController,
} = require('../../controllers/component-detail/get-all-like-voltaje-max-entrada');

module.exports = {
  //Validators
  checkBodyFieldsAddComponentDetails,
  checkBodyFieldsUpdateComponentDetail,
  //Controllers
  createComponentDetailController,
  updateComponentDetailController,
  deleteComponentDetailController,
  getAllComponentDetailController,
  getAllWithAttributesComponentDetailController,
  getComponentDetailByIdController,
  getComponentDetailByComponentIdController,
  getAllComponentDetailLikeHojaDatosController,
  getAllComponentDetailLikeLongitudController,
  getAllComponentDetailLikeAnchoController,
  getAllComponentDetailLikePesoController,
  getAllComponentDetailLikeMaterialController,
  getAllComponentDetailLikeVoltajeRecomendadoController,
  getAllComponentDetailLikeVoltajeMinEntradaController,
  getAllComponentDetailLikeVoltajeMaxEntradaController,
};
