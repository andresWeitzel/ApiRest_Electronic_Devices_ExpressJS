const {
  checkBodyFieldsAddMosfetTransistor,
  checkBodyFieldsUpdateMosfetTransistor
} = require('../../../../helpers/validations/mosfet-transistor/express-validator');

// Mock express-validator
jest.mock('express-validator', () => ({
  check: jest.fn(() => ({
    exists: jest.fn().mockReturnThis(),
    isString: jest.fn().mockReturnThis(),
    isLength: jest.fn().mockReturnThis(),
    isInt: jest.fn().mockReturnThis(),
    isFloat: jest.fn().mockReturnThis(),
    optional: jest.fn().mockReturnThis(),
    withMessage: jest.fn().mockReturnThis()
  })),
  validationResult: jest.fn()
}));

const { validationResult } = require('express-validator');

describe('MOSFET Transistor Validation Helpers', () => {
  let mockRequest;
  let mockResponse;
  let mockNext;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('checkBodyFieldsAddMosfetTransistor', () => {
    it('should pass validation for valid MOSFET transistor data', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock successful validation
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should fail validation for missing required fields', () => {
      mockRequest.body = {
        tipo: 'N-Channel'
        // Missing id_componente, voltaje_drenaje_fuente, etc.
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The id_componente of mosfet transistor is required', param: 'id_componente' },
          { msg: 'The voltaje_drenaje_fuente of mosfet transistor is required', param: 'voltaje_drenaje_fuente' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        errors: [
          { msg: 'The id_componente of mosfet transistor is required', param: 'id_componente' },
          { msg: 'The voltaje_drenaje_fuente of mosfet transistor is required', param: 'voltaje_drenaje_fuente' }
        ]
      });
    });

    it('should fail validation for invalid component ID', () => {
      mockRequest.body = {
        id_componente: -1, // Invalid negative ID
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The id_componente of mosfet transistor should be number (integer) and must be greater than 0', param: 'id_componente' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for empty type', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: '', // Invalid empty type
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the tipo must be between 2 and 50 characters', param: 'tipo' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for type too short', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: 'N', // Too short (minimum 2 characters)
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the tipo must be between 2 and 50 characters', param: 'tipo' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for negative voltage', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: -60, // Invalid negative voltage
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The voltaje_drenaje_fuente of mosfet transistor should be number (float) and must be greater than 0', param: 'voltaje_drenaje_fuente' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for current too short', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 1, // Too short (minimum 2 characters)
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the corriente_cc_drenaje must be between 2 and 50 characters', param: 'corriente_cc_drenaje' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for dissipation too short', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1, // Too short (minimum 2 characters)
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the disip_max must be between 2 and 50 characters', param: 'disip_max' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for negative temperature', () => {
      mockRequest.body = {
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: -150, // Invalid negative temperature
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The temp_op_max of mosfet transistor should be number (integer) and must be greater than 0', param: 'temp_op_max' }
        ]
      });

      const validators = checkBodyFieldsAddMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('checkBodyFieldsUpdateMosfetTransistor', () => {
    it('should pass validation for valid update data', () => {
      mockRequest.body = {
        tipo: 'P-Channel',
        voltaje_drenaje_fuente: 80,
        corriente_cc_drenaje: 3.0
      };

      // Mock successful validation
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should pass validation for partial update data', () => {
      mockRequest.body = {
        tipo: 'P-Channel'
        // Only updating type
      };

      // Mock successful validation
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should fail validation for empty type in update', () => {
      mockRequest.body = {
        tipo: '' // Invalid empty type
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the tipo must be between 2 and 50 characters', param: 'tipo' }
        ]
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for type too short in update', () => {
      mockRequest.body = {
        tipo: 'P' // Too short (minimum 2 characters)
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the tipo must be between 2 and 50 characters', param: 'tipo' }
        ]
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for negative voltage in update', () => {
      mockRequest.body = {
        voltaje_drenaje_fuente: -80 // Invalid negative voltage
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The voltaje_drenaje_fuente of mosfet transistor should be number (float) and must be greater than 0', param: 'voltaje_drenaje_fuente' }
        ]
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for current too short in update', () => {
      mockRequest.body = {
        corriente_cc_drenaje: 1 // Too short (minimum 2 characters)
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the corriente_cc_drenaje must be between 2 and 50 characters', param: 'corriente_cc_drenaje' }
        ]
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for dissipation too short in update', () => {
      mockRequest.body = {
        disip_max: 1 // Too short (minimum 2 characters)
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the disip_max must be between 2 and 50 characters', param: 'disip_max' }
        ]
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for negative temperature in update', () => {
      mockRequest.body = {
        temp_op_max: -200 // Invalid negative temperature
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The temp_op_max of mosfet transistor should be number (integer) and must be greater than 0', param: 'temp_op_max' }
        ]
      });

      const validators = checkBodyFieldsUpdateMosfetTransistor();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });
}); 