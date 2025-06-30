//External
const express = require('express');
let morgan = require('morgan');
let cors = require('cors');
let listEndpoints = require('express-list-endpoints');
//Env vars
const API_LOCAL_BASE_URL = process.env.API_LOCAL_BASE_URL;
const COMPONENT_ENDPOINT = process.env.API_COMPONENT_NAME_URL;
const COMPONENT_DETAIL_ENDPOINT = process.env.API_COMPONENT_DETAIL_NAME_URL;
const BIPOLAR_TRANSISTOR_ENDPOINT = process.env.API_BIPOLAR_TRANSISTOR_NAME_URL;
const ELECTROLYTIC_CAPACITOR_ENDPOINT = process.env.API_ELECTROLYTIC_CAPACITOR_NAME_URL;
const MOSFET_TRANSISTOR_ENDPOINT = process.env.API_MOSFET_TRANSISTOR_NAME_URL;
//Config router
const componentRouter = require('../routes/component-routes');
const componentDetailRouter = require('../routes/component-detail-routes');
const bipolarTransistorRouter = require('../routes/bipolar-transistor-routes');
const electrolyticCapacitorRouter = require('../routes/electrolytic-capacitor-routes');
const mosfetTransistorRouter = require('../routes/mosfet-transistor-routes');

/**
 * @description initial settings for cors, express, etc (Middleware)
 * @returns an express object with the initial settings
 */
const appMiddleware = async () => {
  try {
    const app = express();

    //Using morgan-middleware
    app.use(morgan('dev'));

    //-- start cors --
    //Set cors
    var corsOptions = {
      origin: API_LOCAL_BASE_URL,
    };
    //Use cors options
    app.use(cors(corsOptions));
    //-- end cors --

    //-- start config for data api --
    //Use express with json format
    app.use(express.json());

    //Only fort strict format configured
    app.use(express.urlencoded({ extended: true }));
    //-- end config for data api --

    //-- start with routes --
    app.use(COMPONENT_ENDPOINT, componentRouter);
    app.use(COMPONENT_DETAIL_ENDPOINT, componentDetailRouter);
    app.use(BIPOLAR_TRANSISTOR_ENDPOINT, bipolarTransistorRouter);
    app.use(ELECTROLYTIC_CAPACITOR_ENDPOINT, electrolyticCapacitorRouter);
    app.use(MOSFET_TRANSISTOR_ENDPOINT, mosfetTransistorRouter);
    //-- end with routes --

    //-- See all endpoints
    console.log(listEndpoints(app));

    return app;
  } catch (error) {
    console.log(`Error in appMiddleware() function. Caused by ${error}`);
  }
};

module.exports = {
  appMiddleware,
};
