const {
  createMosfetTransistorService,
} = require('../../../services/mosfet-transistor/create');

const {
  getAllMosfetTransistorService,
} = require('../../../services/mosfet-transistor/get-all');

const {
  getMosfetTransistorByIdService,
} = require('../../../services/mosfet-transistor/get-by-id');

const {
  getMosfetTransistorByComponentIdService,
} = require('../../../services/mosfet-transistor/get-by-component-id');

const {
  updateMosfetTransistorService,
} = require('../../../services/mosfet-transistor/update');

const {
  deleteMosfetTransistorService,
} = require('../../../services/mosfet-transistor/delete');

// Mock the database models
jest.mock('../../../models/sequelize/mosfet-transistor', () => ({
  MosfetTransistor: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    count: jest.fn()
  }
}));

jest.mock('../../../models/sequelize/component', () => ({
  Component: {
    findByPk: jest.fn()
  }
}));

// Mock the helpers
jest.mock('../../../helpers/sequelize/errors', () => ({
  checkErrors: jest.fn()
}));

const { MosfetTransistor } = require('../../../models/sequelize/mosfet-transistor');
const { Component } = require('../../../models/sequelize/component');
const { checkErrors } = require('../../../helpers/sequelize/errors');

describe('MOSFET Transistor Services', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = {
      body: {},
      params: {},
      query: {}
    };
    jest.clearAllMocks();
  });

  describe('createMosfetTransistorService', () => {
    it('should create a MOSFET transistor successfully', async () => {
      const mockMosfet = {
        id: 1,
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      };

      MosfetTransistor.create.mockResolvedValue({
        dataValues: mockMosfet
      });

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

      const result = await createMosfetTransistorService(mockRequest);

      expect(MosfetTransistor.create).toHaveBeenCalledWith({
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60,
        corriente_cc_drenaje: 2.5,
        disip_max: 1.5,
        temp_op_max: 150,
        conduct_drenaje_sustrato: 0.5,
        resist_drenaje_fuente: 0.1
      });
      expect(result).toEqual(mockMosfet);
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      MosfetTransistor.create.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.body = {
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60
      };

      const result = await createMosfetTransistorService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('getAllMosfetTransistorService', () => {
    it('should get all MOSFET transistors with pagination', async () => {
      const mockMosfets = [
        { id: 1, tipo: 'N-Channel', voltaje_drenaje_fuente: 60 },
        { id: 2, tipo: 'P-Channel', voltaje_drenaje_fuente: 80 }
      ];

      const mockCount = 2;

      MosfetTransistor.findAll.mockResolvedValue(mockMosfets);
      MosfetTransistor.count.mockResolvedValue(mockCount);

      mockRequest.query = {
        page: 1,
        limit: 10,
        orderBy: 'tipo',
        orderAt: 'ASC'
      };

      const result = await getAllMosfetTransistorService(mockRequest);

      expect(MosfetTransistor.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockMosfets);
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      MosfetTransistor.findAll.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      const result = await getAllMosfetTransistorService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('getMosfetTransistorByIdService', () => {
    it('should get MOSFET transistor by ID successfully', async () => {
      const mockMosfet = {
        id: 1,
        id_componente: 1,
        tipo: 'N-Channel',
        voltaje_drenaje_fuente: 60
      };

      MosfetTransistor.findByPk.mockResolvedValue(mockMosfet);

      mockRequest.params = { id: 1 };

      const result = await getMosfetTransistorByIdService(mockRequest);

      expect(MosfetTransistor.findByPk).toHaveBeenCalledWith(1, {
        attributes: {},
        nest: true,
        raw: true
      });
      expect(result).toEqual(mockMosfet);
    });

    it('should return null for non-existent MOSFET transistor', async () => {
      MosfetTransistor.findByPk.mockResolvedValue(null);

      mockRequest.params = { id: 999 };

      const result = await getMosfetTransistorByIdService(mockRequest);

      expect(result).toBeNull();
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      MosfetTransistor.findByPk.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id: 1 };

      const result = await getMosfetTransistorByIdService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('getMosfetTransistorByComponentIdService', () => {
    it('should get MOSFET transistors by component ID successfully', async () => {
      const mockMosfets = [
        { id: 1, id_componente: 1, tipo: 'N-Channel' },
        { id: 2, id_componente: 1, tipo: 'P-Channel' }
      ];

      MosfetTransistor.findAll.mockResolvedValue(mockMosfets);

      mockRequest.params = { componentId: 1 };

      const result = await getMosfetTransistorByComponentIdService(mockRequest);

      expect(MosfetTransistor.findAll).toHaveBeenCalledWith({
        where: { id_componente: 1 },
        attributes: {},
        nest: true,
        raw: true
      });
      expect(result).toEqual(mockMosfets);
    });

    it('should return empty array for component without MOSFET transistors', async () => {
      MosfetTransistor.findAll.mockResolvedValue([]);

      mockRequest.params = { componentId: 999 };

      const result = await getMosfetTransistorByComponentIdService(mockRequest);

      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      MosfetTransistor.findAll.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id_componente: 1 };

      const result = await getMosfetTransistorByComponentIdService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('updateMosfetTransistorService', () => {
    it('should update MOSFET transistor successfully', async () => {
      const mockUpdatedMosfet = {
        id: 1,
        tipo: 'P-Channel',
        voltaje_drenaje_fuente: 80
      };

      MosfetTransistor.update.mockResolvedValue([1]);
      MosfetTransistor.findByPk.mockResolvedValue(mockUpdatedMosfet);

      mockRequest.params = { id: 1 };
      mockRequest.body = {
        tipo: 'P-Channel',
        voltaje_drenaje_fuente: 80
      };

      const result = await updateMosfetTransistorService(mockRequest);

      expect(MosfetTransistor.update).toHaveBeenCalledWith(
        { tipo: 'P-Channel', voltaje_drenaje_fuente: 80 },
        { where: { id: 1 } }
      );
      expect(result).toEqual({
        objectUpdated: "Mosfet Transistor has been successfully updated based on id 1"
      });
    });

    it('should return 0 when no MOSFET transistor is updated', async () => {
      MosfetTransistor.update.mockResolvedValue([0]);

      mockRequest.params = { id: 999 };
      mockRequest.body = {
        tipo: 'P-Channel'
      };

      const result = await updateMosfetTransistorService(mockRequest);

      expect(result).toEqual({
        objectUpdated: "Check if the mosfet transistor you want to updated exists in the db. The mosfet transistor has not been updated based on the id 999"
      });
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      MosfetTransistor.update.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id: 1 };
      mockRequest.body = {
        tipo: 'P-Channel'
      };

      const result = await updateMosfetTransistorService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });

  describe('deleteMosfetTransistorService', () => {
    it('should delete MOSFET transistor successfully', async () => {
      MosfetTransistor.destroy.mockResolvedValue(1);

      mockRequest.params = { id: 1 };

      const result = await deleteMosfetTransistorService(mockRequest);

      expect(MosfetTransistor.destroy).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual({
        objectDeleted: "Mosfet Transistor has been successfully removed based on id 1"
      });
    });

    it('should return false when no MOSFET transistor is deleted', async () => {
      MosfetTransistor.destroy.mockResolvedValue(0);

      mockRequest.params = { id: 999 };

      const result = await deleteMosfetTransistorService(mockRequest);

      expect(result).toEqual({
        objectDeleted: "Check if the Mosfet Transistor you want to remove exists in the db. The Mosfet Transistor has not been removed based on the id 999"
      });
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Database error');
      MosfetTransistor.destroy.mockRejectedValue(mockError);
      checkErrors.mockResolvedValue('CONNECTION_ERROR');

      mockRequest.params = { id: 1 };

      const result = await deleteMosfetTransistorService(mockRequest);

      expect(checkErrors).toHaveBeenCalledWith(mockError, 'Error');
      expect(result).toBe('CONNECTION_ERROR');
    });
  });
}); 