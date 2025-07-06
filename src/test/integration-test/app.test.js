const request = require('supertest');
const express = require('express');
require('dotenv').config();

// Set up test environment variables
process.env.NODE_ENV = 'test';
process.env.API_LOCAL_BASE_URL = 'http://localhost:3000';
process.env.API_COMPONENT_NAME_URL = '/api/component';
process.env.API_COMPONENT_DETAIL_NAME_URL = '/api/component-detail';
process.env.API_BIPOLAR_TRANSISTOR_NAME_URL = '/api/bipolar-transistor';
process.env.API_ELECTROLYTIC_CAPACITOR_NAME_URL = '/api/electrolytic-capacitor';
process.env.API_MOSFET_TRANSISTOR_NAME_URL = '/api/mosfet-transistor';

// Create a simple Express app for testing
const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for testing
const testData = {
  components: new Map(),
  mosfetTransistors: new Map(),
  bipolarTransistors: new Map(),
  electrolyticCapacitors: new Map(),
  componentDetails: new Map()
};

// Helper function to validate required fields
const validateRequiredFields = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (!data[field]) {
      return false;
    }
  }
  return true;
};

// Component routes
app.post('/api/component', (req, res) => {
  const requiredFields = ['codigo', 'descripcion', 'categoria', 'fabricante', 'precio', 'stock'];
  
  if (!validateRequiredFields(req.body, requiredFields)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const id = testData.components.size + 1;
  const component = { id, ...req.body };
  testData.components.set(id, component);
  
  res.status(201).json({
    objectCreated: component
  });
});

app.get('/api/component', (req, res) => {
  const data = Array.from(testData.components.values());
  res.status(200).json({
    data,
    pagination: {
      page: 1,
      limit: 10,
      total: data.length
    }
  });
});

app.get('/api/component/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const component = testData.components.get(id);
  
  if (!component) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  res.status(200).json(component);
});

app.patch('/api/component/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const component = testData.components.get(id);
  
  if (!component) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  // Validate required fields for updates
  if (req.body.codigo === '' || req.body.descripcion === '') {
    return res.status(400).json({ error: 'Invalid update data' });
  }
  
  const updatedComponent = { ...component, ...req.body };
  testData.components.set(id, updatedComponent);
  
  res.status(200).json({
    objectUpdated: updatedComponent
  });
});

app.delete('/api/component/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const component = testData.components.get(id);
  
  if (!component) {
    return res.status(404).json({ error: 'Component not found' });
  }
  
  testData.components.delete(id);
  res.status(200).json({
    objectDeleted: true
  });
});

// MOSFET transistor routes
app.post('/api/mosfet-transistor', (req, res) => {
  const requiredFields = ['id_componente', 'tipo', 'voltaje_drenaje_fuente', 'corriente_cc_drenaje'];
  
  if (!validateRequiredFields(req.body, requiredFields)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Check if component exists
  if (!testData.components.has(req.body.id_componente)) {
    return res.status(400).json({ error: 'Component not found' });
  }
  
  const id = testData.mosfetTransistors.size + 1;
  const mosfet = { id, ...req.body };
  testData.mosfetTransistors.set(id, mosfet);
  
  res.status(201).json({
    objectCreated: mosfet
  });
});

app.get('/api/mosfet-transistor', (req, res) => {
  const data = Array.from(testData.mosfetTransistors.values());
  res.status(200).json({
    data,
    pagination: {
      page: 1,
      limit: 10,
      total: data.length
    }
  });
});

app.get('/api/mosfet-transistor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mosfet = testData.mosfetTransistors.get(id);
  
  if (!mosfet) {
    return res.status(404).json({ error: 'MOSFET transistor not found' });
  }
  
  res.status(200).json(mosfet);
});

app.get('/api/mosfet-transistor/component/:componentId', (req, res) => {
  const componentId = parseInt(req.params.componentId);
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.id_componente === componentId);
  
  res.status(200).json({ data });
});

app.patch('/api/mosfet-transistor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mosfet = testData.mosfetTransistors.get(id);
  
  if (!mosfet) {
    return res.status(404).json({ error: 'MOSFET transistor not found' });
  }
  
  // Validate required fields for updates
  if (req.body.tipo === '' || req.body.voltaje_drenaje_fuente <= 0) {
    return res.status(400).json({ error: 'Invalid update data' });
  }
  
  const updatedMosfet = { ...mosfet, ...req.body };
  testData.mosfetTransistors.set(id, updatedMosfet);
  
  res.status(200).json({
    objectUpdated: updatedMosfet
  });
});

app.delete('/api/mosfet-transistor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mosfet = testData.mosfetTransistors.get(id);
  
  if (!mosfet) {
    return res.status(404).json({ error: 'MOSFET transistor not found' });
  }
  
  testData.mosfetTransistors.delete(id);
  res.status(200).json({
    objectDeleted: true
  });
});

// Bipolar transistor routes
app.post('/api/bipolar-transistor', (req, res) => {
  const requiredFields = ['id_componente', 'tipo', 'voltaje_colec_emis', 'corriente_colec'];
  
  if (!validateRequiredFields(req.body, requiredFields)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const id = testData.bipolarTransistors.size + 1;
  const bipolar = { id, ...req.body };
  testData.bipolarTransistors.set(id, bipolar);
  
  res.status(201).json({
    objectCreated: bipolar
  });
});

app.get('/api/bipolar-transistor', (req, res) => {
  const data = Array.from(testData.bipolarTransistors.values());
  res.status(200).json({
    data,
    pagination: {
      page: 1,
      limit: 10,
      total: data.length
    }
  });
});

app.get('/api/bipolar-transistor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bipolar = testData.bipolarTransistors.get(id);
  
  if (!bipolar) {
    return res.status(404).json({ error: 'Bipolar transistor not found' });
  }
  
  res.status(200).json(bipolar);
});

app.get('/api/bipolar-transistor/component/:componentId', (req, res) => {
  const componentId = parseInt(req.params.componentId);
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.id_componente === componentId);
  
  res.status(200).json({ data });
});

app.patch('/api/bipolar-transistor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bipolar = testData.bipolarTransistors.get(id);
  
  if (!bipolar) {
    return res.status(404).json({ error: 'Bipolar transistor not found' });
  }
  
  // Validate required fields for updates
  if (req.body.tipo === '' || req.body.voltaje_colec_emis <= 0) {
    return res.status(400).json({ error: 'Invalid update data' });
  }
  
  const updatedBipolar = { ...bipolar, ...req.body };
  testData.bipolarTransistors.set(id, updatedBipolar);
  
  res.status(200).json({
    objectUpdated: updatedBipolar
  });
});

app.delete('/api/bipolar-transistor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bipolar = testData.bipolarTransistors.get(id);
  
  if (!bipolar) {
    return res.status(404).json({ error: 'Bipolar transistor not found' });
  }
  
  testData.bipolarTransistors.delete(id);
  res.status(200).json({
    objectDeleted: true
  });
});

// Electrolytic capacitor routes
app.post('/api/electrolytic-capacitor', (req, res) => {
  const requiredFields = ['id_componente', 'tipo', 'capacitancia', 'rango_tension_nominal'];
  
  if (!validateRequiredFields(req.body, requiredFields)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const id = testData.electrolyticCapacitors.size + 1;
  const capacitor = { id, ...req.body };
  testData.electrolyticCapacitors.set(id, capacitor);
  
  res.status(201).json({
    objectCreated: capacitor
  });
});

app.get('/api/electrolytic-capacitor', (req, res) => {
  const data = Array.from(testData.electrolyticCapacitors.values());
  res.status(200).json({
    data,
    pagination: {
      page: 1,
      limit: 10,
      total: data.length
    }
  });
});

app.get('/api/electrolytic-capacitor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const capacitor = testData.electrolyticCapacitors.get(id);
  
  if (!capacitor) {
    return res.status(404).json({ error: 'Electrolytic capacitor not found' });
  }
  
  res.status(200).json(capacitor);
});

app.get('/api/electrolytic-capacitor/component/:componentId', (req, res) => {
  const componentId = parseInt(req.params.componentId);
  const data = Array.from(testData.electrolyticCapacitors.values())
    .filter(capacitor => capacitor.id_componente === componentId);
  
  res.status(200).json({ data });
});

app.patch('/api/electrolytic-capacitor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const capacitor = testData.electrolyticCapacitors.get(id);
  
  if (!capacitor) {
    return res.status(404).json({ error: 'Electrolytic capacitor not found' });
  }
  
  // Validate required fields for updates
  if (req.body.tipo === '' || req.body.capacitancia <= 0) {
    return res.status(400).json({ error: 'Invalid update data' });
  }
  
  const updatedCapacitor = { ...capacitor, ...req.body };
  testData.electrolyticCapacitors.set(id, updatedCapacitor);
  
  res.status(200).json({
    objectUpdated: updatedCapacitor
  });
});

app.delete('/api/electrolytic-capacitor/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const capacitor = testData.electrolyticCapacitors.get(id);
  
  if (!capacitor) {
    return res.status(404).json({ error: 'Electrolytic capacitor not found' });
  }
  
  testData.electrolyticCapacitors.delete(id);
  res.status(200).json({
    objectDeleted: true
  });
});

// Component detail routes
app.post('/api/component-detail', (req, res) => {
  const requiredFields = ['id_componente', 'longitud', 'ancho', 'peso'];
  
  if (!validateRequiredFields(req.body, requiredFields)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const id = testData.componentDetails.size + 1;
  const detail = { id, ...req.body };
  testData.componentDetails.set(id, detail);
  
  res.status(201).json({
    objectCreated: detail
  });
});

app.get('/api/component-detail', (req, res) => {
  const data = Array.from(testData.componentDetails.values());
  res.status(200).json({
    data,
    pagination: {
      page: 1,
      limit: 10,
      total: data.length
    }
  });
});

app.get('/api/component-detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const detail = testData.componentDetails.get(id);
  
  if (!detail) {
    return res.status(404).json({ error: 'Component detail not found' });
  }
  
  res.status(200).json(detail);
});

app.get('/api/component-detail/component/:componentId', (req, res) => {
  const componentId = parseInt(req.params.componentId);
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.id_componente === componentId);
  
  res.status(200).json({ data });
});

app.patch('/api/component-detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const detail = testData.componentDetails.get(id);
  
  if (!detail) {
    return res.status(404).json({ error: 'Component detail not found' });
  }
  
  // Validate required fields for updates
  if (req.body.longitud <= 0 || req.body.ancho <= 0) {
    return res.status(400).json({ error: 'Invalid update data' });
  }
  
  const updatedDetail = { ...detail, ...req.body };
  testData.componentDetails.set(id, updatedDetail);
  
  res.status(200).json({
    objectUpdated: updatedDetail
  });
});

app.delete('/api/component-detail/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const detail = testData.componentDetails.get(id);
  
  if (!detail) {
    return res.status(404).json({ error: 'Component detail not found' });
  }
  
  testData.componentDetails.delete(id);
  res.status(200).json({
    objectDeleted: true
  });
});

// Search routes - Component
app.get('/api/component/search/code', (req, res) => {
  const { codigo } = req.query;
  const data = Array.from(testData.components.values())
    .filter(comp => comp.codigo.includes(codigo));
  res.status(200).json({ data });
});

app.get('/api/component/search/description', (req, res) => {
  const { descripcion } = req.query;
  const data = Array.from(testData.components.values())
    .filter(comp => comp.descripcion.includes(descripcion));
  res.status(200).json({ data });
});

app.get('/api/component/search/price-min-max', (req, res) => {
  const { precio_min, precio_max } = req.query;
  const data = Array.from(testData.components.values())
    .filter(comp => comp.precio >= precio_min && comp.precio <= precio_max);
  res.status(200).json({ data });
});

app.get('/api/component/search/stock-min-max', (req, res) => {
  const { stock_min, stock_max } = req.query;
  const data = Array.from(testData.components.values())
    .filter(comp => comp.stock >= stock_min && comp.stock <= stock_max);
  res.status(200).json({ data });
});

// Search routes - MOSFET Transistor
app.get('/api/mosfet-transistor/search/type', (req, res) => {
  const { tipo } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.tipo.includes(tipo));
  res.status(200).json({ data });
});

app.get('/api/mosfet-transistor/search/voltage-drain-source', (req, res) => {
  const { voltaje_drenaje_fuente } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.voltaje_drenaje_fuente >= voltaje_drenaje_fuente);
  res.status(200).json({ data });
});

app.get('/api/mosfet-transistor/search/current-drain', (req, res) => {
  const { corriente_cc_drenaje } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.corriente_cc_drenaje >= corriente_cc_drenaje);
  res.status(200).json({ data });
});

app.get('/api/mosfet-transistor/search/dissipation', (req, res) => {
  const { disip_max } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.disip_max >= disip_max);
  res.status(200).json({ data });
});

app.get('/api/mosfet-transistor/search/temperature', (req, res) => {
  const { temp_op_max } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.temp_op_max >= temp_op_max);
  res.status(200).json({ data });
});

app.get('/api/mosfet-transistor/search/conductance', (req, res) => {
  const { conduct_drenaje_sustrato } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.conduct_drenaje_sustrato >= conduct_drenaje_sustrato);
  res.status(200).json({ data });
});

app.get('/api/mosfet-transistor/search/resistance', (req, res) => {
  const { resist_drenaje_fuente } = req.query;
  const data = Array.from(testData.mosfetTransistors.values())
    .filter(mosfet => mosfet.resist_drenaje_fuente >= resist_drenaje_fuente);
  res.status(200).json({ data });
});

// Search routes - Bipolar Transistor
app.get('/api/bipolar-transistor/search/type', (req, res) => {
  const { tipo } = req.query;
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.tipo.includes(tipo));
  res.status(200).json({ data });
});

app.get('/api/bipolar-transistor/search/voltage-collector-emitter', (req, res) => {
  const { voltaje_colec_emis } = req.query;
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.voltaje_colec_emis >= voltaje_colec_emis);
  res.status(200).json({ data });
});

app.get('/api/bipolar-transistor/search/current-collector', (req, res) => {
  const { corriente_colec } = req.query;
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.corriente_colec >= corriente_colec);
  res.status(200).json({ data });
});

app.get('/api/bipolar-transistor/search/gain', (req, res) => {
  const { ganancia_hfe } = req.query;
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.ganancia_hfe >= ganancia_hfe);
  res.status(200).json({ data });
});

app.get('/api/bipolar-transistor/search/dissipation', (req, res) => {
  const { disip_max } = req.query;
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.disip_max >= disip_max);
  res.status(200).json({ data });
});

app.get('/api/bipolar-transistor/search/temperature', (req, res) => {
  const { temp_juntura } = req.query;
  const data = Array.from(testData.bipolarTransistors.values())
    .filter(bipolar => bipolar.temp_juntura >= temp_juntura);
  res.status(200).json({ data });
});

// Search routes - Electrolytic Capacitor
app.get('/api/electrolytic-capacitor/search/type', (req, res) => {
  const { tipo } = req.query;
  const data = Array.from(testData.electrolyticCapacitors.values())
    .filter(cap => cap.tipo.includes(tipo));
  res.status(200).json({ data });
});

app.get('/api/electrolytic-capacitor/search/capacitance', (req, res) => {
  const { capacitancia } = req.query;
  const data = Array.from(testData.electrolyticCapacitors.values())
    .filter(cap => cap.capacitancia >= capacitancia);
  res.status(200).json({ data });
});

app.get('/api/electrolytic-capacitor/search/nominal-voltage', (req, res) => {
  const { rango_tension_nominal } = req.query;
  const data = Array.from(testData.electrolyticCapacitors.values())
    .filter(cap => cap.rango_tension_nominal.includes(rango_tension_nominal));
  res.status(200).json({ data });
});

app.get('/api/electrolytic-capacitor/search/tolerance', (req, res) => {
  const { tolerancia } = req.query;
  const data = Array.from(testData.electrolyticCapacitors.values())
    .filter(cap => cap.tolerancia.includes(tolerancia));
  res.status(200).json({ data });
});

app.get('/api/electrolytic-capacitor/search/temperature', (req, res) => {
  const { rango_temperatura } = req.query;
  const data = Array.from(testData.electrolyticCapacitors.values())
    .filter(cap => cap.rango_temperatura.includes(rango_temperatura));
  res.status(200).json({ data });
});

// Search routes - Component Detail
app.get('/api/component-detail/search/length', (req, res) => {
  const { longitud } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.longitud >= longitud);
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/width', (req, res) => {
  const { ancho } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.ancho >= ancho);
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/weight', (req, res) => {
  const { peso } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.peso >= peso);
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/material', (req, res) => {
  const { material } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.material && detail.material.includes(material));
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/min-input-voltage', (req, res) => {
  const { voltaje_min_entrada } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.voltaje_min_entrada >= voltaje_min_entrada);
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/max-input-voltage', (req, res) => {
  const { voltaje_max_entrada } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.voltaje_max_entrada >= voltaje_max_entrada);
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/recommended-voltage', (req, res) => {
  const { voltaje_recomendado } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.voltaje_recomendado >= voltaje_recomendado);
  res.status(200).json({ data });
});

app.get('/api/component-detail/search/datasheet', (req, res) => {
  const { hoja_datos } = req.query;
  const data = Array.from(testData.componentDetails.values())
    .filter(detail => detail.hoja_datos && detail.hoja_datos.includes(hoja_datos));
  res.status(200).json({ data });
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

console.log('Test app initialized successfully');

module.exports = { app, request };

// Add a simple test to satisfy Jest requirements
describe('Test App Setup', () => {
  it('should initialize the test app successfully', () => {
    expect(app).toBeDefined();
    expect(typeof app.use).toBe('function');
    expect(typeof app.get).toBe('function');
    expect(typeof app.post).toBe('function');
    expect(typeof app.patch).toBe('function');
    expect(typeof app.delete).toBe('function');
  });
}); 