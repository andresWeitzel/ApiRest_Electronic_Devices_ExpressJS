//Externals
const { Op } = require("sequelize");
//Models
const {
  BipolarTransistor,
} = require("../../models/sequelize/bipolar-transistor");
//Enums
const { statusName } = require("../../enums/database/status");
const { checkErrors } = require("../../helpers/sequelize/errors");
//Const
const orderBy = [["id", "ASC"]];
//Vars
let componentDetailList;
let idComponenteParam;
let tipoParam;
let voltajeColecEmisParam;
let voltajeColecBaseParam;
let voltajeEmisBaseParam;
let voltajeColecEmisSatParam;
let corrienteColecParam;
let gananciaHfeParam;
let disipMaxParam;
let tempJuntParam;
let queryStrParams;
let pageSizeNro;
let pageNro;
let msgLog;

/**
 * @description get all paginated bipolar transistors list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesBipolarTransistor = async (req, res) => {
  try {
    componentDetailList = null;
    queryStrParams = null;
    idComponenteParam = 0;
    tipoParam = null;
    voltajeColecEmisParam = null;
    voltajeColecBaseParam = null;
    voltajeEmisBaseParam = null;
    voltajeColecEmisSatParam = null;
    corrienteColecParam = null;
    gananciaHfeParam = null;
    disipMaxParam = null;
    tempJuntParam = null;
    pageSizeNro = 30;
    pageNro = 0;

    //-- start with querys params and pagination  ---
    queryStrParams = req.query;

    if (queryStrParams != null) {
      idComponenteParam = queryStrParams.idComponente
        ? queryStrParams.idComponente
        : idComponenteParam;
      tipoParam = queryStrParams.tipo ? queryStrParams.tipo : tipoParam;
      voltajeColecEmisParam = queryStrParams.voltajeColecEmis
        ? queryStrParams.voltajeColecEmis
        : voltajeColecEmisParam;
      voltajeColecBaseParam = queryStrParams.voltajeColecBase
        ? queryStrParams.voltajeColecBase
        : voltajeColecBaseParam;
      voltajeEmisBaseParam = queryStrParams.voltajeEmisBase
        ? queryStrParams.voltajeEmisBase
        : voltajeEmisBaseParam;
      voltajeColecEmisSatParam = queryStrParams.voltajeColecEmisSat
        ? queryStrParams.voltajeColecEmisSat
        : voltajeColecEmisSatParam;
      corrienteColecParam = queryStrParams.corrienteColec
        ? queryStrParams.corrienteColec
        : corrienteColecParam;
      gananciaHfeParam = queryStrParams.gananciaHfe
        ? queryStrParams.gananciaHfe
        : gananciaHfeParam;
      disipMaxParam = queryStrParams.disipMax
        ? queryStrParams.disipMax
        : disipMaxParam;
      tempJuntParam = queryStrParams.tempJuntura
        ? queryStrParams.tempJuntura
        : tempJuntParam;
      pageSizeNro = queryStrParams.limit
        ? parseInt(queryStrParams.limit)
        : pageSizeNro;
      pageNro = queryStrParams.page ? parseInt(queryStrParams.page) : pageNro;
    }
    //-- end with querys params and pagination  ---

    if (BipolarTransistor != null) {
      await BipolarTransistor.findAll({
        attributes: {},
        where: {
          [Op.or]: {
            id_componente: {
              [Op.eq]: `${idComponenteParam}`,
            },
            tipo: {
              [Op.like]: `%${tipoParam}%`,
            },
            voltaje_colec_emis: {
              [Op.like]: `%${voltajeColecEmisParam}%`,
            },
            voltaje_colec_base: {
              [Op.like]: `%${voltajeColecBaseParam}%`,
            },
            voltaje_colec_emis_sat: {
              [Op.like]: `%${voltajeColecEmisSatParam}%`,
            },
            corriente_colec: {
              [Op.like]: `%${corrienteColecParam}%`,
            },
            ganancia_hfe: {
              [Op.like]: `%${gananciaHfeParam}%`,
            },
            disip_max: {
              [Op.like]: `%${disipMaxParam}%`,
            },
            temp_juntura: {
              [Op.like]: `%${tempJuntParam}%`,
            },
          },
        },
        limit: pageSizeNro,
        offset: pageNro,
        order: orderBy,
        raw: true,
      })
        .then(async (componentDetailsItems) => {
          componentDetailList = componentDetailsItems;
        })
        .catch(async (error) => {
          msgLog = `Error in getAllWithAttributesBipolarTransistor() function when trying to get all paginated bipolar transistor by all attributes. Caused by ${error}`;
          console.log(msgLog);
          componentDetailList = await checkErrors(error, error.name);
        });
    } else {
      componentDetailList = await checkErrors(
        null,
        statusName.CONNECTION_REFUSED
      );
    }
  } catch (error) {
    msgLog = `Error in getAllWithAttributesBipolarTransistor() function. Caused by ${error}`;
    console.log(msgLog);
    componentDetailList = await checkErrors(error, statusName.CONNECTION_ERROR);
  }
  return componentDetailList;
};

module.exports = {
  getAllWithAttributesBipolarTransistor,
};
