//External
const express  = require("express");
let morgan = require("morgan");
let cors  = require("cors");
//Env vars
const API_LOCAL_BASE_URL = process.env.API_LOCAL_BASE_URL;
const COMPONENT_ENPOINT = process.env.API_COMPONENT_NAME_URL;
//Config router
const componentRouter = require("../routes/component-routes");

/**
 * @description initial settings for cors, express, etc (Middleware)
 * @returns an express object with the initial settings
 */
const appMiddleware = async() => {
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
    app.use(COMPONENT_ENPOINT, componentRouter);
    //-- end with routes --
   
    return app;

  } catch (error) {
    console.log(`Error in appMiddleware() function. Caused by ${error}`);
  }
};

module.exports = {
  appMiddleware,
};
