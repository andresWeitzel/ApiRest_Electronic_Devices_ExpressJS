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

    // Public index (browser welcome) + JSON for API clients
    app.get('/', (req, res) => {
      const routes = {
        health: '/health',
        docs: '/api-docs',
        componentes: COMPONENT_ENDPOINT || '/api/v1/componentes',
        componentesDetalles: COMPONENT_DETAIL_ENDPOINT || '/api/v1/componentes-detalles',
        transistoresBipolares: BIPOLAR_TRANSISTOR_ENDPOINT || '/api/v1/transistores-bipolares',
        capacitoresElectroliticos:
          ELECTROLYTIC_CAPACITOR_ENDPOINT || '/api/v1/capacitores-electroliticos',
        transistoresMosfet: MOSFET_TRANSISTOR_ENDPOINT || '/api/v1/transistores-mosfet',
      };
      const payload = {
        message: 'Welcome to ApiRest Electronic Devices ExpressJS',
        name: 'ApiRest Electronic Devices ExpressJS',
        status: 'OK',
        persistence: 'postgresql',
        orm: 'sequelize',
        routes,
        repository:
          'https://github.com/andresWeitzel/ApiRest_Electronic_Devices_ExpressJS',
        timestamp: new Date().toISOString(),
      };

      if (req.accepts(['html', 'json']) === 'html') {
        res
          .status(200)
          .type('html')
          .send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>ApiRest Electronic Devices ExpressJS</title>
  <style>
    :root { color-scheme: dark; }
    body { margin: 0; min-height: 100vh; font-family: Segoe UI, system-ui, sans-serif;
      background: #0b1220; color: #e8eefc; display: grid; place-items: center; }
    main { max-width: 40rem; padding: 2rem; }
    h1 { margin: 0 0 .5rem; font-size: 1.6rem; color: #7dd3fc; }
    p { margin: .4rem 0; line-height: 1.5; color: #c7d2e5; }
    ul { padding-left: 1.2rem; }
    a { color: #86efac; }
    code { background: #1e293b; padding: .1rem .35rem; border-radius: 4px; }
  </style>
</head>
<body>
  <main>
    <h1>Welcome</h1>
    <p><strong>ApiRest Electronic Devices ExpressJS</strong> is running.</p>
    <p>REST API for electronic components inventory and specifications.</p>
    <p>Status: <code>OK</code> · Persistence: PostgreSQL · ORM: Sequelize</p>
    <p>Useful links:</p>
    <ul>
      <li><a href="/health">/health</a> — liveness</li>
      <li><a href="/api-docs">/api-docs</a> — Swagger UI</li>
      <li><a href="${routes.componentes}/list">${routes.componentes}/list</a> — components</li>
    </ul>
  </main>
</body>
</html>`);
        return;
      }

      res.status(200).json(payload);
    });

    app.get('/health', (_req, res) => {
      res.status(200).json({
        status: 'OK',
        persistence: 'postgresql',
        orm: 'sequelize',
        timestamp: new Date().toISOString(),
      });
    });

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
