const { app, request } = require('./app.test');

describe('Electrolytic Capacitor Endpoints', () => {
  let testComponentId;
  let testCapacitorId;
  let testComponentData;
  let testCapacitorData;

  beforeAll(async () => {
    // Create test component first
    testComponentData = {
      codigo: 'TEST-CAP-COMP-001',
      descripcion: 'Test Capacitor Component',
      categoria: 'Capacitor',
      fabricante: 'Test Manufacturer',
      numero_parte: 'TEST-CAP-PART-001',
      precio: 2.75,
      stock: 200,
      imagen: 'test-capacitor-image.jpg'
    };

    const componentResponse = await request(app)
      .post('/api/component')
      .send(testComponentData);
    
    testComponentId = componentResponse.body.objectCreated.id;

    testCapacitorData = {
      id_componente: testComponentId,
      tipo: 'Aluminum',
      capacitancia: 100,
      rango_tension_nominal: '16V',
      tolerancia: '20%',
      rango_temperatura: '-40°C to +85°C'
    };
  });

  describe('POST /api/electrolytic-capacitor', () => {
    it('should create a new electrolytic capacitor', async () => {
      const response = await request(app)
        .post('/api/electrolytic-capacitor')
        .send(testCapacitorData)
        .expect(201);

      expect(response.body).toHaveProperty('objectCreated');
      expect(response.body.objectCreated).toHaveProperty('id');
      expect(response.body.objectCreated.id_componente).toBe(testComponentId);
      expect(response.body.objectCreated.tipo).toBe(testCapacitorData.tipo);
      
      testCapacitorId = response.body.objectCreated.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        id_componente: testComponentId,
        tipo: '', // Invalid empty type
        capacitancia: -10 // Invalid negative capacitance
      };

      const response = await request(app)
        .post('/api/electrolytic-capacitor')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/electrolytic-capacitor', () => {
    it('should get all electrolytic capacitors with pagination', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get electrolytic capacitors with ordering', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor')
        .query({ 
          orderBy: 'tipo',
          orderAt: 'ASC'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/electrolytic-capacitor/:id', () => {
    it('should get electrolytic capacitor by ID', async () => {
      const response = await request(app)
        .get(`/api/electrolytic-capacitor/${testCapacitorId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id_componente).toBe(testComponentId);
      expect(response.body.tipo).toBe(testCapacitorData.tipo);
    });

    it('should return 404 for non-existent electrolytic capacitor', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/electrolytic-capacitor/component/:componentId', () => {
    it('should get electrolytic capacitor by component ID', async () => {
      const response = await request(app)
        .get(`/api/electrolytic-capacitor/component/${testComponentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /api/electrolytic-capacitor/:id', () => {
    it('should update electrolytic capacitor', async () => {
      const updateData = {
        tipo: 'Tantalum',
        capacitancia: 220,
        rango_tension_nominal: '25V'
      };

      const response = await request(app)
        .patch(`/api/electrolytic-capacitor/${testCapacitorId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('objectUpdated');
      expect(response.body.objectUpdated.tipo).toBe(updateData.tipo);
      expect(response.body.objectUpdated.capacitancia).toBe(updateData.capacitancia);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        tipo: '', // Invalid empty type
        capacitancia: -50 // Invalid negative capacitance
      };

      const response = await request(app)
        .patch(`/api/electrolytic-capacitor/${testCapacitorId}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/electrolytic-capacitor/:id', () => {
    it('should delete electrolytic capacitor', async () => {
      const response = await request(app)
        .delete(`/api/electrolytic-capacitor/${testCapacitorId}`)
        .expect(200);

      expect(response.body).toHaveProperty('objectDeleted');
      expect(response.body.objectDeleted).toBe(true);
    });

    it('should return 404 for non-existent electrolytic capacitor', async () => {
      const response = await request(app)
        .delete('/api/electrolytic-capacitor/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/electrolytic-capacitor/search endpoints', () => {
    beforeAll(async () => {
      // Create test electrolytic capacitors for search tests
      const testCapacitors = [
        { ...testCapacitorData, tipo: 'Aluminum', capacitancia: 100, rango_tension_nominal: '16V' },
        { ...testCapacitorData, tipo: 'Tantalum', capacitancia: 220, rango_tension_nominal: '25V' },
        { ...testCapacitorData, tipo: 'Aluminum', capacitancia: 470, rango_tension_nominal: '35V' }
      ];

      for (const capacitor of testCapacitors) {
        await request(app).post('/api/electrolytic-capacitor').send(capacitor);
      }
    });

    it('should search by type', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor/search/type')
        .query({ tipo: 'Aluminum' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by capacitance', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor/search/capacitance')
        .query({ capacitancia: 100 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by nominal voltage range', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor/search/nominal-voltage')
        .query({ rango_tension_nominal: '16V' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by tolerance', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor/search/tolerance')
        .query({ tolerancia: '20%' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by temperature range', async () => {
      const response = await request(app)
        .get('/api/electrolytic-capacitor/search/temperature')
        .query({ rango_temperatura: '-40°C to +85°C' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
}); 