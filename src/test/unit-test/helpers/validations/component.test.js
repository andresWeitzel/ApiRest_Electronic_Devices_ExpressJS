const {
  checkBodyFieldsAddComponent,
  checkBodyFieldsUpdateComponent
} = require('../../../../helpers/validations/component/express-validator');

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

describe('Component Validation Helpers', () => {
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

  describe('checkBodyFieldsAddComponent', () => {
    it('should pass validation for valid component data', () => {
      mockRequest.body = {
        codigo: 'TEST-001',
        descripcion: 'Test Component',
        categoria: 'Test Category',
        fabricante: 'Test Manufacturer',
        numero_parte: 'TEST-PART-001',
        precio: 10.50,
        stock: 100,
        imagen: 'test-image.jpg'
      };

      // Mock successful validation
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const validators = checkBodyFieldsAddComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should fail validation for missing required fields', () => {
      mockRequest.body = {
        descripcion: 'Test Component'
        // Missing codigo, categoria, fabricante, etc.
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The codigo of component is required', param: 'codigo' },
          { msg: 'The categoria of component is required', param: 'categoria' }
        ]
      });

      const validators = checkBodyFieldsAddComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        errors: [
          { msg: 'The codigo of component is required', param: 'codigo' },
          { msg: 'The categoria of component is required', param: 'categoria' }
        ]
      });
    });

    it('should fail validation for invalid price', () => {
      mockRequest.body = {
        codigo: 'TEST-001',
        descripcion: 'Test Component',
        categoria: 'Test Category',
        fabricante: 'Test Manufacturer',
        numero_parte: 'TEST-PART-001',
        precio: -10.50, // Invalid negative price
        stock: 100,
        imagen: 'test-image.jpg'
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The precio of component should be number (float) and must be betwenn 0.05 to 100.0', param: 'precio' }
        ]
      });

      const validators = checkBodyFieldsAddComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for invalid stock', () => {
      mockRequest.body = {
        codigo: 'TEST-001',
        descripcion: 'Test Component',
        categoria: 'Test Category',
        fabricante: 'Test Manufacturer',
        numero_parte: 'TEST-PART-001',
        precio: 10.50,
        stock: -50, // Invalid negative stock
        imagen: 'test-image.jpg'
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The stock of component should be number (integer) and must be betwenn 0 to 100000', param: 'stock' }
        ]
      });

      const validators = checkBodyFieldsAddComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for empty code', () => {
      mockRequest.body = {
        codigo: '', // Invalid empty code
        descripcion: 'Test Component',
        categoria: 'Test Category',
        fabricante: 'Test Manufacturer',
        numero_parte: 'TEST-PART-001',
        precio: 10.50,
        stock: 100,
        imagen: 'test-image.jpg'
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the codigo must be between 3 and 100 characters', param: 'codigo' }
        ]
      });

      const validators = checkBodyFieldsAddComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for code too short', () => {
      mockRequest.body = {
        codigo: 'AB', // Too short (minimum 3 characters)
        descripcion: 'Test Component',
        categoria: 'Test Category',
        fabricante: 'Test Manufacturer',
        numero_parte: 'TEST-PART-001',
        precio: 10.50,
        stock: 100,
        imagen: 'test-image.jpg'
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the codigo must be between 3 and 100 characters', param: 'codigo' }
        ]
      });

      const validators = checkBodyFieldsAddComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('checkBodyFieldsUpdateComponent', () => {
    it('should pass validation for valid update data', () => {
      mockRequest.body = {
        descripcion: 'Updated Test Component',
        precio: 15.75,
        stock: 150
      };

      // Mock successful validation
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const validators = checkBodyFieldsUpdateComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should pass validation for partial update data', () => {
      mockRequest.body = {
        descripcion: 'Updated Test Component'
        // Only updating description
      };

      // Mock successful validation
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const validators = checkBodyFieldsUpdateComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should fail validation for invalid price in update', () => {
      mockRequest.body = {
        descripcion: 'Updated Test Component',
        precio: -5.00 // Invalid negative price
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The precio of component should be number (float) and must be betwenn 0.05 to 100.0', param: 'precio' }
        ]
      });

      const validators = checkBodyFieldsUpdateComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for invalid stock in update', () => {
      mockRequest.body = {
        descripcion: 'Updated Test Component',
        stock: -25 // Invalid negative stock
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The stock of component should be number (integer) and must be betwenn 0 to 100000', param: 'stock' }
        ]
      });

      const validators = checkBodyFieldsUpdateComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for empty code in update', () => {
      mockRequest.body = {
        codigo: '', // Invalid empty code
        descripcion: 'Updated Test Component'
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the codigo must be between 3 and 100 characters', param: 'codigo' }
        ]
      });

      const validators = checkBodyFieldsUpdateComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should fail validation for code too short in update', () => {
      mockRequest.body = {
        codigo: 'XY', // Too short (minimum 3 characters)
        descripcion: 'Updated Test Component'
      };

      // Mock validation errors
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { msg: 'The value of the codigo must be between 3 and 100 characters', param: 'codigo' }
        ]
      });

      const validators = checkBodyFieldsUpdateComponent();
      const middleware = validators[validators.length - 1];
      
      middleware(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalled();
    });
  });
}); 