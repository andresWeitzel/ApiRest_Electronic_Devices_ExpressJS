const { app, request } = require('./app.test');

describe('Bipolar Transistor Endpoints', () => {
  let testComponentId;
  let testBipolarId;
  let testComponentData;
  let testBipolarData;

  beforeAll(async () => {
    // Create test component first
    testComponentData = {
      codigo: 'TEST-BIPOLAR-COMP-001',
      descripcion: 'Test Bipolar Component',
      categoria: 'Transistor',
      fabricante: 'Test Manufacturer',
      numero_parte: 'TEST-BIPOLAR-PART-001',
      precio: 3.50,
      stock: 75,
      imagen: 'test-bipolar-image.jpg'
    };

    const componentResponse = await request(app)
      .post('/api/component')
      .send(testComponentData);
    
    testComponentId = componentResponse.body.objectCreated.id;

    testBipolarData = {
      id_componente: testComponentId,
      tipo: 'NPN',
      voltaje_colec_emis: 45,
      voltaje_colec_base: 50,
      voltaje_emis_base: 6,
      corriente_colec: 0.1,
      ganancia_hfe: 100,
      disip_max: 0.625,
      temp_juntura: 150
    };
  });

  describe('POST /api/bipolar-transistor', () => {
    it('should create a new bipolar transistor', async () => {
      const response = await request(app)
        .post('/api/bipolar-transistor')
        .send(testBipolarData)
        .expect(201);

      expect(response.body).toHaveProperty('objectCreated');
      expect(response.body.objectCreated).toHaveProperty('id');
      expect(response.body.objectCreated.id_componente).toBe(testComponentId);
      expect(response.body.objectCreated.tipo).toBe(testBipolarData.tipo);
      
      testBipolarId = response.body.objectCreated.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        id_componente: testComponentId,
        tipo: '', // Invalid empty type
        voltaje_colec_emis: -10 // Invalid negative voltage
      };

      const response = await request(app)
        .post('/api/bipolar-transistor')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/bipolar-transistor', () => {
    it('should get all bipolar transistors with pagination', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get bipolar transistors with ordering', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor')
        .query({ 
          orderBy: 'tipo',
          orderAt: 'ASC'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/bipolar-transistor/:id', () => {
    it('should get bipolar transistor by ID', async () => {
      const response = await request(app)
        .get(`/api/bipolar-transistor/${testBipolarId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id_componente).toBe(testComponentId);
      expect(response.body.tipo).toBe(testBipolarData.tipo);
    });

    it('should return 404 for non-existent bipolar transistor', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/bipolar-transistor/component/:componentId', () => {
    it('should get bipolar transistor by component ID', async () => {
      const response = await request(app)
        .get(`/api/bipolar-transistor/component/${testComponentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /api/bipolar-transistor/:id', () => {
    it('should update bipolar transistor', async () => {
      const updateData = {
        tipo: 'PNP',
        voltaje_colec_emis: 60,
        ganancia_hfe: 150
      };

      const response = await request(app)
        .patch(`/api/bipolar-transistor/${testBipolarId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('objectUpdated');
      expect(response.body.objectUpdated.tipo).toBe(updateData.tipo);
      expect(response.body.objectUpdated.voltaje_colec_emis).toBe(updateData.voltaje_colec_emis);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        tipo: '', // Invalid empty type
        voltaje_colec_emis: -50 // Invalid negative voltage
      };

      const response = await request(app)
        .patch(`/api/bipolar-transistor/${testBipolarId}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/bipolar-transistor/:id', () => {
    it('should delete bipolar transistor', async () => {
      const response = await request(app)
        .delete(`/api/bipolar-transistor/${testBipolarId}`)
        .expect(200);

      expect(response.body).toHaveProperty('objectDeleted');
      expect(response.body.objectDeleted).toBe(true);
    });

    it('should return 404 for non-existent bipolar transistor', async () => {
      const response = await request(app)
        .delete('/api/bipolar-transistor/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/bipolar-transistor/search endpoints', () => {
    beforeAll(async () => {
      // Create test bipolar transistors for search tests
      const testBipolars = [
        { ...testBipolarData, tipo: 'NPN', voltaje_colec_emis: 45, ganancia_hfe: 100 },
        { ...testBipolarData, tipo: 'PNP', voltaje_colec_emis: 60, ganancia_hfe: 150 },
        { ...testBipolarData, tipo: 'NPN', voltaje_colec_emis: 80, ganancia_hfe: 200 }
      ];

      for (const bipolar of testBipolars) {
        await request(app).post('/api/bipolar-transistor').send(bipolar);
      }
    });

    it('should search by type', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/search/type')
        .query({ tipo: 'NPN' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by collector-emitter voltage', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/search/voltage-collector-emitter')
        .query({ voltaje_colec_emis: 50 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by collector current', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/search/current-collector')
        .query({ corriente_colec: 0.1 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by gain', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/search/gain')
        .query({ ganancia_hfe: 100 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by dissipation', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/search/dissipation')
        .query({ disip_max: 0.625 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by junction temperature', async () => {
      const response = await request(app)
        .get('/api/bipolar-transistor/search/temperature')
        .query({ temp_juntura: 150 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
}); 