const {
  createComponentService,
} = require('../../../services/component/create');

const {
  getAllComponentService,
} = require('../../../services/component/get-all');

const {
  getComponentByIdService,
} = require('../../../services/component/get-by-id');

const {
  updateComponentService,
} = require('../../../services/component/update');

const {
  deleteComponentService,
} = require('../../../services/component/delete');

// Mock the database models
jest.mock('../../../models/sequelize/component', () => ({
  Component: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    count: jest.fn()
  }
}));

// Mock the helpers
jest.mock('../../../helpers/sequelize/errors', () => ({
  checkErrors: jest.fn()
}));

const { Component } = require('../../../models/sequelize/component');
const { checkErrors } = require('../../../helpers/sequelize/errors');

describe('Component Services', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };
    jest.clearAllMocks();
  });

  describe('createComponentService', () => {
    it('should create a component successfully', async () => {
      const mockComponent = {
        id: 1,
        codigo: 'TEST-001',
        descripcion: 'Test Component',
        categoria: 'Test',
        fabricante: 'Test Manufacturer',
        nro_pieza: 'TEST-PART-001',
        precio: 10.50,
        stock: 100,
        imagen: 'test.jpg'
      };

      Component.create.mockResolvedValue({
        dataValues: mockComponent
      });

      mockRequest.body = {
        codigo: 'TEST-001',
        descripcion: 'Test Component',
        categoria: 'Test',
        fabricante: 'Test Manufacturer',
        nro_pieza: 'TEST-PART-001',
        precio: 10.50,
        stock: 100,
        imagen: 'test.jpg'
      };

      const result = await createComponentService(mockRequest);

      expect(Component.create).toHaveBeenCalledWith({
        codigo: 'TEST-001',
        imagen: 'test.jpg',
        nro_pieza: 'TEST-PART-001',
        categoria: 'Test',
        descripcion: 'Test Component',
        fabricante: 'Test Manufacturer',
        stock: 100,
        precio: 10.50
      });
      expect(result).toEqual(mockComponent);
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      Component.create.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.body = {
        codigo: 'TEST-001',
        descripcion: 'Test Component'
      };

      const result = await createComponentService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('getAllComponentService', () => {
    it('should get all components with pagination', async () => {
      const mockComponents = [
        { id: 1, codigo: 'TEST-001', descripcion: 'Test Component 1' },
        { id: 2, codigo: 'TEST-002', descripcion: 'Test Component 2' }
      ];

      const mockCount = 2;

      Component.findAll.mockResolvedValue(mockComponents);
      Component.count.mockResolvedValue(mockCount);

      mockRequest.query = {
        page: 1,
        limit: 10,
        orderBy: 'codigo',
        orderAt: 'ASC'
      };

      const result = await getAllComponentService(mockRequest);

      expect(Component.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockComponents);
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      Component.findAll.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      const result = await getAllComponentService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('getComponentByIdService', () => {
    it('should get component by ID successfully', async () => {
      const mockComponent = {
        id: 1,
        codigo: 'TEST-001',
        descripcion: 'Test Component'
      };

      Component.findByPk.mockResolvedValue(mockComponent);

      mockRequest.params = { id: 1 };

      const result = await getComponentByIdService(mockRequest);

      expect(Component.findByPk).toHaveBeenCalledWith(1, {
        attributes: {},
        nest: true,
        raw: true
      });
      expect(result).toEqual(mockComponent);
    });

    it('should return null for non-existent component', async () => {
      Component.findByPk.mockResolvedValue(null);

      mockRequest.params = { id: 999 };

      const result = await getComponentByIdService(mockRequest);

      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      Component.findByPk.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id: 1 };

      const result = await getComponentByIdService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('updateComponentService', () => {
    it('should update component successfully', async () => {
      const mockUpdatedComponent = {
        id: 1,
        codigo: 'TEST-001',
        descripcion: 'Updated Test Component'
      };

      Component.update.mockResolvedValue([1]);

      mockRequest.params = { id: 1 };
      mockRequest.body = {
        descripcion: 'Updated Test Component'
      };

      const result = await updateComponentService(mockRequest);

      expect(Component.update).toHaveBeenCalledWith(
        {
          codigo: null,
          imagen: null,
          nro_pieza: null,
          categoria: null,
          descripcion: 'Updated Test Component',
          fabricante: null,
          stock: null,
          precio: null
        },
        { where: { id: 1 } }
      );
      expect(result).toEqual({
        objectUpdated: "Component has been successfully updated based on id 1"
      });
    });

    it('should return 0 when no component is updated', async () => {
      Component.update.mockResolvedValue([0]);

      mockRequest.params = { id: 999 };
      mockRequest.body = {
        descripcion: 'Updated Test Component'
      };

      const result = await updateComponentService(mockRequest);

      expect(result).toEqual({
        objectUpdated: "Check if the component you want to updated exists in the db. The component has not been updated based on the id 999"
      });
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      Component.update.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id: 1 };
      mockRequest.body = {
        descripcion: 'Updated Test Component'
      };

      const result = await updateComponentService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('deleteComponentService', () => {
    it('should delete component successfully', async () => {
      Component.destroy.mockResolvedValue(1);

      mockRequest.params = { id: 1 };

      const result = await deleteComponentService(mockRequest);

      expect(Component.destroy).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual({
        objectDeleted: "Component has been successfully removed based on id 1"
      });
    });

    it('should return false when no component is deleted', async () => {
      Component.destroy.mockResolvedValue(0);

      mockRequest.params = { id: 999 };

      const result = await deleteComponentService(mockRequest);

      expect(result).toEqual({
        objectDeleted: "Check if the component you want to remove exists in the db. The component has not been removed based on the id 999"
      });
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      Component.destroy.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id: 1 };

      const result = await deleteComponentService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });
}); 