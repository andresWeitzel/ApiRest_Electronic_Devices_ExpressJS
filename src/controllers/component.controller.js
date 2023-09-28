//External
require("dotenv").config();
//Services
const {
  addComponentService,
  getAllComponentService,
  getComponentByIdService,
  getAllComponentLikeCodeService,
  getAllWithAttributesComponentService,
  getAllComponentLikeImageService,
  getAllComponentLikePartNumberService,
  getAllComponentLikeCategoryAndMakerService,
  getAllComponentWithDetailsService,
  getAllComponentWithBipolarTransistorService,
  getAllComponentWithAllModelsService,
  updateComponentService,
  getAllComponentLikeDescriptionService,
  getAllComponentLikeStockMaxService,
  getAllComponentLikeStockService,
  getAllComponentLikeStockMinMaxService,
  getAllComponentLikePriceService,
  getAllComponentLikePriceMaxService,
  getAllComponentLikePriceMinMaxService,
} = require("../services/component.service");
//Enums
const { statusName, statusDetails } = require("../enums/database/status");
const { statusCode } = require("../enums/http/status-code");
const { value } = require("../enums/general/value");
//Const-vars
let newComponent;
let updatedComponent;
let msg;
let code;
let validations;
const statusCodeInternalServerError = statusCode.INTERNAL_SERVER_ERROR;
const statusCodeBadRequest = statusCode.BAD_REQUEST;
const statusCodeOk = statusCode.OK;
const statusConnectionError = statusName.CONNECTION_ERROR;
const statusConnectionErrorDetail = statusDetails.CONNECTION_ERROR_DETAIL;
const statusConnectionRefused = statusName.CONNECTION_REFUSED;
const statusConnectionRefusedDetail = statusDetails.CONNECTION_REFUSED_DETAIL;

//Add testing


/**
 * @description add a componente to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const addComponentController = async (req, res) => {
  try {
    msg = null;
    newComponent = await addComponentService(req);

    switch (newComponent) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res
          .status(statusCodeBadRequest)
          .send({ error: "Bad request, could not add a component." });
        break;
      default:
        if (
          typeof newComponent === "object" &&
          newComponent.hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(newComponent);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: newComponent });
        break;
    };
  } catch (error) {
    msg = {
      error: `Error in addComponentController() function. Caused by ${error}`
    };
    console.log(msg);
    res.status(statusCodeInternalServerError).send(msg);
  }
};

/**
 * @description update a componente from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const updateComponentController = async (req, res) => {
  try {
    msg = null;
    updatedComponent = await updateComponentService(req);

    switch (updatedComponent) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res
          .status(statusCodeBadRequest)
          .send({ error: "Bad request, could not update a component." });
        break;
      default:
        if (
          typeof updatedComponent === "object" &&
          updatedComponent.hasOwnProperty("objectUpdated")
        ) {
          res.status(statusCodeOk).send(updatedComponent);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: updatedComponent });
        break;
    }
  } catch (error) {
    msg = {
      error: `Error in updateComponentController() function. Caused by ${error}`
    };
    console.log(msg);
    res.status(statusCodeInternalServerError).send(msg);
  }
};

/**
 * @description get all paginated components to database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res
          .status(statusCodeBadRequest)
          .send({ error: "Bad request, failed to obtain paginated component list." });
        break;
      default:
        if (
          typeof componentList === "object" &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    msg = `Error in getAllComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(statusCodeInternalServerError).send(msg);
  }
};

/**
 * @description get all paginated components list according to all attributes from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAttributesComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;
    componentList = null;

    componentList = await getAllWithAttributesComponentService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, failed to get all paginated components list according to all attributes."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithAttributesComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list with details for component_details table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithDetailComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentWithDetailsService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, failed to get all paginated components list and components_details according to all attributes."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithDetailComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list with details for bipolar_transistor table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithBipolarTransistorComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentWithBipolarTransistorService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, failed to get all paginated components list and bipolar_transistor according to all attributes."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithBipolarTransistorComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components list with all models/table from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllWithAllModelsComponentController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentWithAllModelsService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, failed to get all paginated components list and bipolar_transistor according to all attributes."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllWithAllModelsComponentController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get a component based its id from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getComponentByIdController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getComponentByIdService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get a component with the requested id. Check if the component exist into the database"
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList.hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getComponentByIdController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to code from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCodeController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeCodeService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according the code."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeCodeController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to image from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeImageController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeImageService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according the imagen."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeImageController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to part number from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePartNumberController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikePartNumberService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according the nro de pieza."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikePartNumberController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to categoria and fabricante from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeCategoryAndMakerController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeCategoryAndMakerService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according the categoria and fabricante."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeCategoryAndMakerController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to description from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeDescriptionController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeDescriptionService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the description."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeDescriptionController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to stock from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeStockService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the stock."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeStockController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};


/**
 * @description get all paginated components according to stock max from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMaxController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeStockMaxService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the stock max."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeStockMaxController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};


/**
 * @description get all paginated components according to stock min and max from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikeStockMinMaxController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikeStockMinMaxService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the stock min and max."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikeStockMinMaxController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};


/**
 * @description get all paginated components according to the price from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikePriceService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the price."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikePriceController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to the max price from database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceMaxController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikePriceMaxService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the max price."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikePriceMaxController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};

/**
 * @description get all paginated components according to the min and max price from the database
 * @param {any} req any type
 * @param {any} res any type
 * @returns a json object with the transaction performed
 * @example
 */
const getAllComponentLikePriceMinMaxController = async (req, res) => {
  try {
    msg = null;
    code = null;

    componentList = await getAllComponentLikePriceMinMaxService(req);

    switch (componentList) {
      case statusConnectionError:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionErrorDetail });
        break;
      case statusConnectionRefused:
        res
          .status(statusCodeInternalServerError)
          .send({ error: statusConnectionRefusedDetail });
        break;
      case value.IS_ZERO_NUMBER || value.IS_UNDEFINED || value.IS_NULL:
        res.status(statusCodeBadRequest).send({
          error:
            "Bad request, could not get all paginated list components according to the min and max price."
        });
        break;
      default:
        if (
          (typeof componentList === "object" || Array.isArray(componentList)) &&
          componentList[0].hasOwnProperty("id")
        ) {
          res.status(statusCodeOk).send(componentList);
          break;
        }
        res.status(statusCodeBadRequest).send({ error: componentList });
        break;
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in getAllComponentLikePriceMinMaxController() function. Caused by ${error}`;
    console.log(msg);
    res.status(code).send(msg);
  }
};


module.exports = {
  addComponentController,
  updateComponentController,
  getAllComponentController,
  getAllWithAttributesComponentController,
  getAllWithDetailComponentController,
  getAllWithBipolarTransistorComponentController,
  getAllWithAllModelsComponentController,
  getComponentByIdController,
  getAllComponentLikeCodeController,
  getAllComponentLikeImageController,
  getAllComponentLikePartNumberController,
  getAllComponentLikeCategoryAndMakerController,
  getAllComponentLikeDescriptionController,
  getAllComponentLikeStockController,
  getAllComponentLikeStockMaxController,
  getAllComponentLikeStockMinMaxController,
  getAllComponentLikePriceController,
  getAllComponentLikePriceMaxController,
  getAllComponentLikePriceMinMaxController
};
