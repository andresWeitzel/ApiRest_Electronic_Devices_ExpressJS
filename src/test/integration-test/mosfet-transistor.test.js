const { app, request } = require('./app.test');

describe('MOSFET Transistor Endpoints', () => {
  let testComponentId;
  let testMosfetId;
  let testComponentData;
  let testMosfetData;

  beforeAll(async () => {
    // Create test component first
    testComponentData = {
      codigo: 'TEST-MOSFET-COMP-001',
      descripcion: 'Test MOSFET Component',
      categoria: 'Transistor',
      fabricante: 'Test Manufacturer',
      numero_parte: 'TEST-MOSFET-PART-001',
      precio: 5.25,
      stock: 50,
      imagen: 'test-mosfet-image.jpg'
    };

    const componentResponse = await request(app)
      .post('/api/component')
      .send(testComponentData);
    
    testComponentId = componentResponse.body.objectCreated.id;

    testMosfetData = {
      id_componente: testComponentId,
      tipo: 'N-Channel',
      voltaje_drenaje_fuente: 60,
      corriente_cc_drenaje: 2.5,
      disip_max: 1.5,
      temp_op_max: 150,
      conduct_drenaje_sustrato: 0.5,
      resist_drenaje_fuente: 0.1
    };
  });

  describe('POST /api/mosfet-transistor', () => {
    it('should create a new MOSFET transistor', async () => {
      const response = await request(app)
        .post('/api/mosfet-transistor')
        .send(testMosfetData)
        .expect(201);

      expect(response.body).toHaveProperty('objectCreated');
      expect(response.body.objectCreated).toHaveProperty('id');
      expect(response.body.objectCreated.id_componente).toBe(testComponentId);
      expect(response.body.objectCreated.tipo).toBe(testMosfetData.tipo);
      
      testMosfetId = response.body.objectCreated.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        id_componente: testComponentId,
        tipo: '', // Invalid empty type
        voltaje_drenaje_fuente: -10 // Invalid negative voltage
      };

      const response = await request(app)
        .post('/api/mosfet-transistor')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for non-existent component', async () => {
      const invalidData = {
        ...testMosfetData,
        id_componente: 99999 // Non-existent component
      };

      const response = await request(app)
        .post('/api/mosfet-transistor')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/mosfet-transistor', () => {
    it('should get all MOSFET transistors with pagination', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get MOSFET transistors with ordering', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor')
        .query({ 
          orderBy: 'tipo',
          orderAt: 'ASC'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/mosfet-transistor/:id', () => {
    it('should get MOSFET transistor by ID', async () => {
      const response = await request(app)
        .get(`/api/mosfet-transistor/${testMosfetId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id_componente).toBe(testComponentId);
      expect(response.body.tipo).toBe(testMosfetData.tipo);
    });

    it('should return 404 for non-existent MOSFET transistor', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/mosfet-transistor/component/:componentId', () => {
    it('should get MOSFET transistor by component ID', async () => {
      const response = await request(app)
        .get(`/api/mosfet-transistor/component/${testComponentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it('should return empty array for component without MOSFET transistors', async () => {
      // Create a component without MOSFET transistors
      const newComponentData = {
        codigo: 'TEST-COMP-NO-MOSFET',
        descripcion: 'Test Component No MOSFET',
        categoria: 'Resistor',
        fabricante: 'Test Manufacturer',
        numero_parte: 'TEST-PART-NO-MOSFET',
        precio: 1.00,
        stock: 10
      };

      const componentResponse = await request(app)
        .post('/api/component')
        .send(newComponentData);

      const response = await request(app)
        .get(`/api/mosfet-transistor/component/${componentResponse.body.objectCreated.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBe(0);
    });
  });

  describe('PATCH /api/mosfet-transistor/:id', () => {
    it('should update MOSFET transistor', async () => {
      const updateData = {
        tipo: 'P-Channel',
        voltaje_drenaje_fuente: 80,
        corriente_cc_drenaje: 3.0
      };

      const response = await request(app)
        .patch(`/api/mosfet-transistor/${testMosfetId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('objectUpdated');
      expect(response.body.objectUpdated.tipo).toBe(updateData.tipo);
      expect(response.body.objectUpdated.voltaje_drenaje_fuente).toBe(updateData.voltaje_drenaje_fuente);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        tipo: '', // Invalid empty type
        voltaje_drenaje_fuente: -50 // Invalid negative voltage
      };

      const response = await request(app)
        .patch(`/api/mosfet-transistor/${testMosfetId}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/mosfet-transistor/:id', () => {
    it('should delete MOSFET transistor', async () => {
      const response = await request(app)
        .delete(`/api/mosfet-transistor/${testMosfetId}`)
        .expect(200);

      expect(response.body).toHaveProperty('objectDeleted');
      expect(response.body.objectDeleted).toBe(true);
    });

    it('should return 404 for non-existent MOSFET transistor', async () => {
      const response = await request(app)
        .delete('/api/mosfet-transistor/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/mosfet-transistor/search endpoints', () => {
    beforeAll(async () => {
      // Create test MOSFET transistors for search tests
      const testMosfets = [
        { ...testMosfetData, tipo: 'N-Channel', voltaje_drenaje_fuente: 60, corriente_cc_drenaje: 2.0 },
        { ...testMosfetData, tipo: 'P-Channel', voltaje_drenaje_fuente: 80, corriente_cc_drenaje: 3.0 },
        { ...testMosfetData, tipo: 'N-Channel', voltaje_drenaje_fuente: 100, corriente_cc_drenaje: 5.0 }
      ];

      for (const mosfet of testMosfets) {
        await request(app).post('/api/mosfet-transistor').send(mosfet);
      }
    });

    it('should search by type', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/type')
        .query({ tipo: 'N-Channel' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by voltage range', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/voltage-drain-source')
        .query({ voltaje_drenaje_fuente: 50 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by current range', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/current-drain')
        .query({ corriente_cc_drenaje: 2.5 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by dissipation', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/dissipation')
        .query({ disip_max: 1.5 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by temperature', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/temperature')
        .query({ temp_op_max: 150 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by conductance', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/conductance')
        .query({ conduct_drenaje_sustrato: 0.5 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by resistance', async () => {
      const response = await request(app)
        .get('/api/mosfet-transistor/search/resistance')
        .query({ resist_drenaje_fuente: 0.1 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
}); 