//External
const componentRouter = require('express').Router();
//Controllers
const componentController = require("../../controllers/componentController");

componentRouter.post('/', componentController.addComponentController)

module.exports=componentRouter
