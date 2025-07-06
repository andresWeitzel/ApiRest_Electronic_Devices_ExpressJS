const { app, request } = require('./app.test');

describe('Component Endpoints', () => {
  let testComponentId;
  let testComponentData;

  beforeAll(() => {
    testComponentData = {
      codigo: 'TEST-COMP-001',
      descripcion: 'Test Component Description',
      categoria: 'Test Category',
      fabricante: 'Test Manufacturer',
      numero_parte: 'TEST-PART-001',
      precio: 10.50,
      stock: 100,
      imagen: 'test-image.jpg'
    };
  });

  describe('POST /api/component', () => {
    it('should create a new component', async () => {
      const response = await request(app)
        .post('/api/component')
        .send(testComponentData)
        .expect(201);

      expect(response.body).toHaveProperty('objectCreated');
      expect(response.body.objectCreated).toHaveProperty('id');
      expect(response.body.objectCreated.codigo).toBe(testComponentData.codigo);
      
      testComponentId = response.body.objectCreated.id;
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        codigo: '', // Invalid empty code
        descripcion: 'Test Description'
      };

      const response = await request(app)
        .post('/api/component')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/component', () => {
    it('should get all components with pagination', async () => {
      const response = await request(app)
        .get('/api/component')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get components with filters', async () => {
      const response = await request(app)
        .get('/api/component')
        .query({ 
          codigo: 'TEST',
          categoria: 'Test',
          fabricante: 'Test'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should get components with ordering', async () => {
      const response = await request(app)
        .get('/api/component')
        .query({ 
          orderBy: 'codigo',
          orderAt: 'ASC'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe('GET /api/component/:id', () => {
    it('should get component by ID', async () => {
      const response = await request(app)
        .get(`/api/component/${testComponentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.codigo).toBe(testComponentData.codigo);
    });

    it('should return 404 for non-existent component', async () => {
      const response = await request(app)
        .get('/api/component/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PATCH /api/component/:id', () => {
    it('should update component', async () => {
      const updateData = {
        descripcion: 'Updated Test Description',
        precio: 15.75
      };

      const response = await request(app)
        .patch(`/api/component/${testComponentId}`)
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('objectUpdated');
      expect(response.body.objectUpdated.descripcion).toBe(updateData.descripcion);
      expect(response.body.objectUpdated.precio).toBe(updateData.precio);
    });

    it('should return 400 for invalid update data', async () => {
      const invalidData = {
        codigo: '' // Invalid empty code
      };

      const response = await request(app)
        .patch(`/api/component/${testComponentId}`)
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/component/:id', () => {
    it('should delete component', async () => {
      const response = await request(app)
        .delete(`/api/component/${testComponentId}`)
        .expect(200);

      expect(response.body).toHaveProperty('objectDeleted');
      expect(response.body.objectDeleted).toBe(true);
    });

    it('should return 404 for non-existent component', async () => {
      const response = await request(app)
        .delete('/api/component/99999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/component/search endpoints', () => {
    beforeAll(async () => {
      // Create test components for search tests
      const testComponents = [
        { ...testComponentData, codigo: 'SEARCH-001', precio: 10 },
        { ...testComponentData, codigo: 'SEARCH-002', precio: 20 },
        { ...testComponentData, codigo: 'SEARCH-003', precio: 30 }
      ];

      for (const component of testComponents) {
        await request(app).post('/api/component').send(component);
      }
    });

    it('should search by code', async () => {
      const response = await request(app)
        .get('/api/component/search/code')
        .query({ codigo: 'SEARCH' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by description', async () => {
      const response = await request(app)
        .get('/api/component/search/description')
        .query({ descripcion: 'Test' })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by price range', async () => {
      const response = await request(app)
        .get('/api/component/search/price-min-max')
        .query({ precio_min: 5, precio_max: 25 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should search by stock range', async () => {
      const response = await request(app)
        .get('/api/component/search/stock-min-max')
        .query({ stock_min: 50, stock_max: 150 })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
}); 