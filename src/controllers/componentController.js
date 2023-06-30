//Services
const { addComponentService } = require("../services/componentService");
//Const-vars
let newUser;



/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 * {"id":null,"nickname":"JUANROMAN","first_name":"Juan","last_name":"Roman","email":"juan_roman@gmail.com","identification_type":"DNI","identification_number":"2221233",.....}
 */
const addComponentController = async (req, res) => {
    try {
   
        newUser = await addComponentService(req);

        
  
    } catch (error) {
      msg =`Error in addComponentController() function. Caused by ${error}`;
      console.log(msg);
    }
    
  };
  
  
  module.exports = {
    addComponentController
  }