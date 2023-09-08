/**
 * A Complete Guide to Winston Logging in Node.js
 * https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/
 */


// //External
// const winston = require("winston");


// /**
//  * @description function to implement all the respective configuration of winston for logging
//  */
// const logger = async() =>{
//     return winston.createLogger({
//         // Log only if level is less than (meaning more severe) or equal to this
//         level: "info",
//         // Use timestamp and printf to create a standard log format
//         format: winston.format.combine(
//           winston.format.timestamp(),
//           winston.format.printf(
//             (info) => `${info.timestamp} ${info.level}: ${info.message}`
//           )
//         ),
//         // Log to the console and a file
//         transports: [
//           new winston.transports.Console(),
//           new winston.transports.File({ filename: "logs/app.log" }),
//         ],
//       });
//   };
  
//   module.exports={
//     logger
//   };