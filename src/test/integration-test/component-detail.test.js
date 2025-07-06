const { app, request } = require('./app.test');

describe('Component Detail Endpoints', () => {
  let testComponentId;
  let testDetailId;
  let testComponentData;
  let testDetailData;

  beforeAll(async () => {
    // Create test component first
    testComponentData = {
      codigo: 'TEST-DETAIL-COMP-001',
      descripcion: 'Test Component with Details',
      categoria: 'Integrated Circuit',
      fabricante: 'Test Manufacturer',
      numero_parte: 'TEST-DETAIL-PART-001',
      precio: 8.50,
      stock: 25,
      imagen: 'test-detail-image.jpg'
    };

    const componentResponse = await request(app)
      .post('/api/component')
      .send(testComponentData);
    
    testComponentId = componentResponse.body.objectCreated.id;

    testDetailData = {
      id_componente: testComponentId,
      longitud: 10.5,
      ancho: 5.2,
      peso: 2.1,
      material: 'Plastic',
      voltaje_min_entrada: 3.3,
      voltaje_max_entrada: 5.5,
      voltaje_recomendado: 5.0,
      hoja_datos: 'datasheet.pdf'
    };
  });

  describe('POST /api/component-detail', () => {
    it('should create a new component detail', async () => {
      const response = await request(app)
        .post('/api/component-detail')
        .send(testDetailData)
        .expect(201);

      expect(response.body).toHaveProperty('objectCreated');
      expect(response.body.objectCreated).toHaveProperty('id');
      expect(response.body.objectCreated.id_componente).toBe(testComponentId);
      expect(response.body.objectCreated.longitud).toBe(testDetailData.longitud);
      
      testDetailId = response.body.objectCreated.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        id_componente: testComponentId,
        longitud: -10, // Invalid negative length
        ancho: 0 // Invalid zero width
      };

      const response = await request(app)
        .post('/api/component-detail')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/component-detail', () => {
    it('should get all component details with pagination', async () => {
      const response = await request(app)
        .get('/api/component-detail')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get component details with ordering', async () => {
      const response = await request(app)
        .get('/api/component-detail')
        .query({ 
          orderBy: 'longitud',
          orderAt: 'ASC'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/component-detail/:id', () => {
    it('should get component detail by ID', async () => {
      const response = await request(app)
        .get(`/api/component-detail/${testDetailId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.id_componente).toBe(testComponentId);
      expect(response.body.longitud).toBe(testDetailData.longitud);
    });

    it('should return 404 for non-existent component detail', async () => {
      const response = await request(app)
        .get('/api/component-detail/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/component-detail/component/:componentId', () => {
    it('should get component detail by component ID', async () => {
      const response = await request(app)
        .get(`/api/component-detail/component/${testComponentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /api/component-detail/:id', () => {
    it('should update component detail', async () => {
      const updateData = {
        longitud: 12.0,
        ancho: 6.0,
        peso: 2.5
      };

      const response = await request(app)
        .patch(`/api/component-detail/${testDetailId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('objectUpdated');
      expect(response.body.objectUpdated.longitud).toBe(updateData.longitud);
      expect(response.body.objectUpdated.ancho).toBe(updateData.ancho);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        longitud: -5, // Invalid negative length
        ancho: 0 // Invalid zero width
      };

      const response = await request(app)
        .patch(`/api/component-detail/${testDetailId}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/component-detail/:id', () => {
    it('should delete component detail', async () => {
      const response = await request(app)
        .delete(`/api/component-detail/${testDetailId}`)
        .expect(200);

      expect(response.body).toHaveProperty('objectDeleted');
      expect(response.body.objectDeleted).toBe(true);
    });

    it('should return 404 for non-existent component detail', async () => {
      const response = await request(app)
        .delete('/api/component-detail/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/component-detail/search endpoints', () => {
    beforeAll(async () => {
      // Create test component details for search tests
      const testDetails = [
        { ...testDetailData, longitud: 10.5, ancho: 5.2, material: 'Plastic' },
        { ...testDetailData, longitud: 15.0, ancho: 8.0, material: 'Metal' },
        { ...testDetailData, longitud: 8.0, ancho: 4.0, material: 'Ceramic' }
      ];

      for (const detail of testDetails) {
        await request(app).post('/api/component-detail').send(detail);
      }
    });

    it('should search by length', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/length')
        .query({ longitud: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by width', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/width')
        .query({ ancho: 5 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by weight', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/weight')
        .query({ peso: 2.0 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by material', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/material')
        .query({ material: 'Plastic' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by minimum input voltage', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/min-input-voltage')
        .query({ voltaje_min_entrada: 3.0 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by maximum input voltage', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/max-input-voltage')
        .query({ voltaje_max_entrada: 5.5 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by recommended voltage', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/recommended-voltage')
        .query({ voltaje_recomendado: 5.0 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by datasheet', async () => {
      const response = await request(app)
        .get('/api/component-detail/search/datasheet')
        .query({ hoja_datos: 'datasheet.pdf' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
}); 