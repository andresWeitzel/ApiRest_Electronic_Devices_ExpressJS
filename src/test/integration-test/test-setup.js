const { Sequelize } = require('sequelize');

// Test database configuration - Using SQLite in memory for tests
const testDbConfig = {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false, // Disable logging for tests
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Create test database connection
const testSequelize = new Sequelize(testDbConfig);

// Test setup and teardown
const setupTestDatabase = async () => {
  try {
    // Sync all models with force: true to recreate tables
    await testSequelize.sync({ force: true });
    console.log('Test database synced successfully');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
};

const teardownTestDatabase = async () => {
  try {
    await testSequelize.close();
    console.log('Test database connection closed');
  } catch (error) {
    console.error('Error closing test database:', error);
  }
};

// Mock the main database connection for tests
jest.mock('../../db/config', () => {
  const { Sequelize } = require('sequelize');
  
  const mockDbConfig = {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  const mockSequelize = new Sequelize(mockDbConfig);
  
  return {
    dbConnection: mockSequelize
  };
});

module.exports = {
  testSequelize,
  setupTestDatabase,
  teardownTestDatabase
}; 