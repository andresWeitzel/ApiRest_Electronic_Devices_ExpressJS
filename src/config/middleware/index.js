const express  = require("express");
const cors  = require("cors");

/**
 * @description initial settings for cors, express, etc (Middleware)
 * @returns an express object with the initial settings
 */
const appMiddleware = async() => {
  try {
    const app = express();
    //Set cors
    var corsOptions = {
      origin: "http://localhost:9090",
    };
    //Use cors options
    app.use(cors(corsOptions));

    //Use express with json format
    app.use(express.json());

    //Only fort strict format configured
    app.use(express.urlencoded({ extended: true }));

    return app;

  } catch (error) {
    console.log(`Error in appMiddleware() function. Caused by ${error}`);
  }
};

module.exports = {
  appMiddleware,
};
