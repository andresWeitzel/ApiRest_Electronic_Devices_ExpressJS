//External
const componentDetailRouter = require('express').Router();
//Controllers
const {
  checkBodyFieldsAddComponentDetails,
  createComponentDetailController,
  checkBodyFieldsUpdateComponentDetail,
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
} = require('../routes-imports/component-detail-routes-imports');

componentDetailRouter.post(
  '/',
  checkBodyFieldsAddComponentDetails(),
  createComponentDetailController,
);

componentDetailRouter.patch(
  '/:id',
  checkBodyFieldsUpdateComponentDetail(),
  updateComponentDetailController,
);

componentDetailRouter.delete('/:id', deleteComponentDetailController);

componentDetailRouter.get('/list', getAllComponentDetailController);

componentDetailRouter.get(
  '/list-with-attributes',
  getAllWithAttributesComponentDetailController,
);

componentDetailRouter.get('/id/:id', getComponentDetailByIdController);

componentDetailRouter.get('/componentes/id/:componentId', getComponentDetailByComponentIdController);

componentDetailRouter.get('/hoja-datos/:hojaDatos', getAllComponentDetailLikeHojaDatosController);

componentDetailRouter.get('/longitud/:longitud', getAllComponentDetailLikeLongitudController);

componentDetailRouter.get('/ancho/:ancho', getAllComponentDetailLikeAnchoController);

componentDetailRouter.get('/peso/:peso', getAllComponentDetailLikePesoController);

componentDetailRouter.get('/material/:material', getAllComponentDetailLikeMaterialController);

componentDetailRouter.get('/voltaje-recomendado/:voltajeRecomendado', getAllComponentDetailLikeVoltajeRecomendadoController);

componentDetailRouter.get('/voltaje-min-entrada/:voltajeMinEntrada', getAllComponentDetailLikeVoltajeMinEntradaController);

componentDetailRouter.get('/voltaje-max-entrada/:voltajeMaxEntrada', getAllComponentDetailLikeVoltajeMaxEntradaController);

module.exports = componentDetailRouter;
