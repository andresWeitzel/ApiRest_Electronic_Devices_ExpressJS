![Index app](./doc/assets/componentes-example.png)

<div align="right">
   <img width="25" height="25" src="./doc/assets/icons/backend/javascript-typescript/png/sequelize.png" />
   <img width="25" height="25" src="./doc/assets/icons/database/png/postgres.png" />
   <img width="25" height="25" src="./doc/assets/icons/backend/javascript-typescript/png/typescript.png" />
   <img width="25" height="25" src="./doc/assets/icons/devops/png/swagger.png" />
   <img width="25" height="25" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
   <img width="25" height="25" src="./doc/assets/icons/backend/javascript-typescript/png/express-js.png" />
   <img width="25" height="25" src="./doc/assets/icons/devops/png/postman.png" />
   <img width="25" height="25" src="./doc/assets/icons/devops/png/git.png" />
</div>

<br>

<br>

<div align="right">
     <a href="./translations/README.es.md" target="_blank">
       <img src="./doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
   </a>
    <a href="./README.md" target="_blank">
       <img src="./doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
   </a>
</div>


<br>

<div align="center">

# ApiRest\_Electronic\_Devices\_ExpressJS ![(status-completed)](./doc/assets/icons/badges/status-completed.svg)


</div>

Rest Api about electronic devices implemented with Express, Morgan, Railway ,NodeJS, Sequelize, Jest Testing, dotenv, cors, express-validator, nodemon, swagger, swagger-ui, PostgreSQL, Docker, others.

*   [Database repository](https://github.com/andresWeitzel/db_dispositivos_electronicos_postgreSQL)
*   [Functionality Test Playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDLAizKGgiChAKBJx1V19Fo)<a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDLAizKGgiChAKBJx1V19Fo" target="_blank" > <img src="./doc/assets/social-networks/yt.png" width="5%" height="5%" /> </a>
*   [Postman Collection](./postman/collections/Api_DispElectr_Express.postman_collection.json) - Complete API testing collection included in the project

<br>

## Index 📜

<details>
  <summary> View </summary>

  <br>

### Section 1) Description, configuration and technologies

*   [1.0) Project Description.](#10-description-)
*   [1.1) Project Execution.](#11-project-execution-)
*   [1.2) Project configuration from scratch](#12-project-configuration-from-scratch-)
*   [1.3) Database Configuration with Docker and PostgreSQL](#13-database-configuration-with-docker-and-postgresql-)
*   [1.4) Technologies.](#14-technologies-)

### Section 2) Testing Documentation and Implementation

*   [2.0) Testing Overview.](#20-testing-overview-)
*   [2.1) Testing Structure.](#21-testing-structure-)
*   [2.2) Testing Commands.](#22-testing-commands-)
*   [2.3) Test Types.](#23-test-types-)
*   [2.4) Test Configuration.](#24-test-configuration-)
*   [2.5) Test Coverage.](#25-test-coverage-)
*   [2.6) Test Cases.](#26-test-cases-)
*   [2.7) Troubleshooting.](#27-troubleshooting-)
*   [2.8) Quality Metrics.](#28-quality-metrics-)
*   [2.9) Maintenance.](#29-maintenance-)

### Section 3) Endpoints and Examples

*   [3.0) EndPoints and resources.](#30-endpoints-and-resources-)

### Section 4) Functionality Testing and References

*   [4.0) Functionality test.](#40-functionality-test-)
*   [4.1) References.](#41-references-)
*   [4.2) Postman Collection.](#42-postman-collection-)

<br>

</details>

<br>

## Section 1) Description, configuration and technologies

### 1.0) Description [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

### 1.0.0) General Description

**ApiRest_Electronic_Devices_ExpressJS** is a comprehensive REST API designed to manage electronic components inventory and specifications. This project provides a robust backend solution for electronic device management systems, featuring advanced search capabilities, detailed component specifications, and a scalable architecture.

**Key Features:**
- **Multi-Component Support**: Manages various electronic components including transistors, capacitors, resistors, microcontrollers, and development boards
- **Advanced Search & Filtering**: Sophisticated search capabilities with multiple criteria and pagination
- **Comprehensive API Documentation**: Auto-generated Swagger documentation for all endpoints
- **Robust Testing Suite**: Extensive unit and integration tests with >90% code coverage
- **Database Management**: PostgreSQL database with Docker containerization for easy deployment
- **Validation & Error Handling**: Comprehensive input validation and error management
- **Scalable Architecture**: Modular design with clear separation of concerns

**Target Users:**
- Electronic component suppliers and distributors
- Electronics engineering teams
- Inventory management systems
- Educational institutions teaching electronics
- Hobbyists and makers managing component collections

### 1.0.1) Description Architecture and Operation

**Architecture Overview:**
The application follows a **layered architecture pattern** with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   API Routes    │  │   Middleware    │  │   Swagger    │ │
│  │                 │  │                 │  │ Documentation│ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Business Logic Layer                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Controllers   │  │    Services     │  │   Helpers    │ │
│  │                 │  │                 │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Data Access Layer                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │    Models       │  │   Sequelize     │  │  PostgreSQL  │ │
│  │                 │  │     ORM         │  │  Database    │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Core Components:**

1. **Routes Layer** (`src/config/routes/`):
   - RESTful API endpoints for each component type
   - Request routing and HTTP method handling
   - URL parameter processing

2. **Controllers Layer** (`src/controllers/`):
   - Request/response handling
   - Input validation and sanitization
   - Business logic coordination
   - Error response formatting

3. **Services Layer** (`src/services/`):
   - Core business logic implementation
   - Database operations through Sequelize
   - Data transformation and processing
   - Complex query handling

4. **Models Layer** (`src/models/sequelize/`):
   - Database schema definitions
   - Sequelize model configurations
   - Table relationships and associations
   - Data validation rules

5. **Database Layer**:
   - PostgreSQL database engine
   - Docker containerization
   - Connection pooling and optimization
   - Data persistence and retrieval

**Data Flow:**
1. **Request Reception**: HTTP requests are received by Express.js
2. **Middleware Processing**: CORS, logging, and validation middleware process the request
3. **Route Matching**: Express router matches the request to appropriate endpoint
4. **Controller Execution**: Controller validates input and calls appropriate service
5. **Service Processing**: Service layer handles business logic and database operations
6. **Response Generation**: Formatted response is sent back to client

**Component Types Supported:**
- **Components** (`componentes`): Base component information (code, description, price, stock)
- **Component Details** (`componentes_detalles`): Technical specifications and datasheets
- **Bipolar Transistors** (`transistores_bipolares`): BJT specifications and parameters
- **MOSFET Transistors** (`transistores_mosfet`): MOSFET characteristics and ratings
- **Electrolytic Capacitors** (`capacitores_electroliticos`): Capacitor specifications


<br>

</details>

### 1.1) Project Execution [🔝](#index-)

<details>
   <summary>View</summary>
   <br>

#### 1.1.0) Initial settings

#### Prerequisites
Before starting, ensure you have the following installed:
- **Node.js** (v18 LTS or higher) - [Download here](https://nodejs.org/en/download)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **IDE** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

#### Step 1: Clone and Setup Project

1. **Clone the repository:**
```bash
git clone https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS
```

2. **Navigate to project directory:**
```bash
cd ApiRest_Dispositivos_Electronicos_ExpressJS
```

3. **Install dependencies:**
```bash
npm install
```

#### Step 2: Database Setup

1. **Start PostgreSQL database with Docker:**
```bash
docker-compose up -d
```

2. **Verify database container is running (optional):**
```bash
docker ps
```

3. **Check database logs (optional):**
```bash
docker-compose logs postgres
```

4. **Reset database if needed (optional):**
```bash
docker-compose down -v
docker-compose up -d
```

#### Step 3: Run the Application

**Development Mode (with auto-reload):**
```bash
npm run start:dev
```

**Production Mode:**
```bash
npm start
```

**Alternative development command:**
```bash
npm run dev
```

#### Step 4: Verify Installation

1. **Check if server is running:**
   - Look for: `Server is running on port 8082`
   - Look for: `Swagger documentation available at http://localhost:8082/api-docs`

2. **Access the application:**
   - **API Base URL**: `http://localhost:8082`
   - **Swagger Documentation**: `http://localhost:8082/api-docs`
   - **Health Check**: `http://localhost:8082/api/v1/health`

#### Troubleshooting

**Port Already in Use:**
```bash
# Kill processes using port 8082
npx kill-port 8082

# Or find and kill specific process
netstat -ano | findstr :8082
taskkill /PID <PID> /F
```

**Database Connection Issues:**
```bash
# Check if Docker is running
docker --version

# Check container status
docker-compose ps

# Restart containers
docker-compose restart

# View detailed logs
docker-compose logs postgres
```

**Node.js Version Issues:**
```bash
# Check Node.js version
node --version

# Use nvm to switch versions (if installed)
nvm use 18
```

**Permission Issues (Linux/Mac):**
```bash
# Fix Docker permissions
sudo usermod -aG docker $USER
# Log out and log back in
```

#### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run start:dev` | Start development server with auto-reload |
| `npm run dev` | Alternative development command |
| `npm test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:unit` | Run unit tests only |
| `npm run test:integration` | Run integration tests only |
| `npm run format-prettier` | Format code with Prettier |
| `npm run check` | Check markdown formatting |

<br>

</details>

### 1.2) Project configuration from scratch [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### 1.2.0) Initial settings

This section guides you through setting up the project from scratch, including all dependencies, project structure, and configuration.

#### Prerequisites
- **Node.js** (v18 LTS or higher) - [Download here](https://nodejs.org/en/download)
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download here](https://git-scm.com/downloads)
- **IDE** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

#### Step 1: Project Initialization

1. **Create project directory:**
```bash
mkdir ApiRest_Electronic_Devices_ExpressJS
cd ApiRest_Electronic_Devices_ExpressJS
```

2. **Initialize Node.js project:**
```bash
npm init -y
```

3. **Create project structure:**
```bash
mkdir -p src/{config/{middleware,routes},controllers,db,enums,helpers,models,services,test,utils}
mkdir -p src/controllers/{component,component-detail,bipolar-transistor,mosfet-transistor,electrolytic-capacitor}
mkdir -p src/services/{component,component-detail,bipolar-transistor,mosfet-transistor,electrolytic-capacitor}
mkdir -p src/models/sequelize
mkdir -p src/test/{unit-test,integration-test,mock}
mkdir -p src/test/unit-test/{helpers,services}
mkdir -p src/test/unit-test/helpers/{pagination,validations}
mkdir -p doc/{assets,translation}
mkdir -p init
mkdir -p postman/collections
mkdir -p scripts
```

#### Step 2: Core Dependencies Installation

1. **Install production dependencies:**
```bash
# Core framework and middleware
npm install express cors morgan dotenv dotenv-expand

# Database and ORM
npm install sequelize pg pg-hstore

# API documentation
npm install swagger-ui-express swagger-jsdoc

# Logging
npm install winston

# Body parsing
npm install body-parser
```

2. **Install development dependencies:**
```bash
# Development server
npm install --save-dev nodemon

# Testing framework
npm install --save-dev jest supertest

# Code formatting and linting
npm install --save-dev prettier

# Markdown linting
npm install --save-dev remark-cli remark-preset-lint-recommended remark-lint-emphasis-marker remark-lint-strong-marker remark-lint-table-cell-padding remark-preset-lint-consistent

# Validation
npm install --save-dev express-validator

# Utilities
npm install --save-dev express-list-endpoints sqlite3
```

#### Step 3: Configuration Files

1. **Create .gitignore:**
```bash
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Test reports
test-report.json
```

2. **Create package.json scripts:**
```json
{
  "scripts": {
    "start": "node src/server.js",
    "start:dev": "nodemon src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --verbose",
    "test:watch": "jest --watch --verbose",
    "test:cov": "jest --coverage --verbose",
    "test:unit": "jest --verbose ./src/test/unit-test",
    "test:integration": "jest --verbose ./src/test/integration-test",
    "test:pagination-helpers": "jest --verbose ./src/test/unit-test/helpers/pagination/*",
    "test:services": "jest --verbose ./src/test/unit-test/services/*",
    "test:validations": "jest --verbose ./src/test/unit-test/helpers/validations/*",
    "test:all": "node scripts/run-tests.js",
    "format-prettier": "prettier --write \"{src,test}/**/*.{js,ts}\"",
    "check": "remark . --quiet --frail",
    "format-remark": "remark . --quiet --frail --output",
    "format-md": "remark . --output"
  }
}
```

#### Step 4: Database Configuration

1. **Create docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: electronic_devices_db
    environment:
      POSTGRES_DB: dispositivos_electronicos
      POSTGRES_USER: dispositivos_user
      POSTGRES_PASSWORD: dispositivos_pass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init:/docker-entrypoint-initdb.d
    command: >
      postgres
      -c shared_buffers=256MB
      -c effective_cache_size=1GB
      -c maintenance_work_mem=64MB
      -c wal_buffers=16MB
      -c work_mem=4MB

volumes:
  postgres_data:
```

2. **Create .env file:**
```env
# Database Configuration
DB_NAME_PROD=dispositivos_electronicos
DB_USER_PROD=dispositivos_user
DB_PASS_PROD=dispositivos_pass
DB_HOST_PROD=localhost
DB_DIALECT_PROD=postgres
DB_PORT_PROD=5432

# Application Configuration
PROD_PORT=8082
APP_PORT=8082

# API Endpoints
API_LOCAL_BASE_URL=http://localhost:8082
API_COMPONENT_NAME_URL=/api/v1/componentes
API_COMPONENT_DETAIL_NAME_URL=/api/v1/componentes-detalles
API_BIPOLAR_TRANSISTOR_NAME_URL=/api/v1/transistores-bipolares
API_ELECTROLYTIC_CAPACITOR_NAME_URL=/api/v1/capacitores-electroliticos
```

#### Step 5: Core Application Files

1. **Create src/server.js:**
```javascript
require('dotenv').config();

const PORT = process.env.PROD_PORT || process.env.APP_PORT || 8082;
const { appMiddleware } = require('./config/middleware/index');
const { swaggerDocs } = require('./utils/swagger');
const { defineAssociations } = require('./models/sequelize/associations');

let app;

const run = async () => {
  try {
    defineAssociations();
    app = await appMiddleware();
    
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
      await swaggerDocs(app, PORT);
    });
  } catch (error) {
    console.log(`Error in run() function: ${error}`);
  }
};

run();
```

2. **Create Jest configuration (jest.config.js):**
```javascript
const config = {
  setupFilesAfterEnv: ['./src/test/mock/set-env-vars.js'],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/test/**',
    '!src/server.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};

module.exports = config;
```

#### Step 6: Start Development

1. **Start database:**
```bash
docker-compose up -d
```

2. **Run the application:**
```bash
# Development mode
npm run start:dev

# Production mode
npm start
```

3. **Run tests:**
```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# With coverage
npm run test:cov
```

#### Step 7: Additional Configuration

1. **Create README.md with project documentation**
2. **Set up Postman collection for API testing**
3. **Configure VS Code settings for consistent development**
4. **Set up CI/CD pipeline (optional)**

#### Project Structure Overview

```
ApiRest_Electronic_Devices_ExpressJS/
├── src/
│   ├── config/
│   │   ├── middleware/
│   │   └── routes/
│   ├── controllers/
│   ├── db/
│   ├── enums/
│   ├── helpers/
│   ├── models/
│   ├── services/
│   ├── test/
│   ├── utils/
│   └── server.js
├── doc/
├── init/
├── postman/
├── scripts/
├── docker-compose.yml
├── jest.config.js
├── package.json
└── README.md
```

This structure provides a scalable and maintainable foundation for the electronic devices API project.

<br>

</details>

### 1.3) Database Configuration with Docker and PostgreSQL [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### 1.3.0) Database Overview

This project uses **PostgreSQL** as the database engine, containerized with **Docker** for easy setup and deployment. The database contains information about electronic components including:

*   **Components** (`componentes`): Main table with basic component information
*   **Component Details** (`componentes_detalles`): Technical specifications and datasheets
*   **Bipolar Transistors** (`transistores_bipolares`): Specific transistor data
*   **MOSFET Transistors** (`transistores_mosfet`): MOSFET transistor specifications
*   **Electrolytic Capacitors** (`capacitores_electroliticos`): Capacitor specifications


#### 1.3.1) Docker Setup

The project includes a `docker-compose.yml` file that automatically sets up PostgreSQL with all necessary configurations:

**Database Configuration:**
*   **Image**: PostgreSQL 15
*   **Port**: 5432 (standard PostgreSQL port)
*   **Database Name**: `dispositivos_electronicos`
*   **Username**: `dispositivos_user`
*   **Password**: `dispositivos_pass`

**Performance Optimizations:**
*   Shared buffers: 256MB
*   Effective cache size: 1GB
*   Maintenance work memory: 64MB
*   WAL buffers: 16MB
*   Work memory: 4MB

#### 1.3.2) Environment Variables

Create a `.env` file in the project root with the following configuration:

```env
# Database Configuration
DB_NAME_PROD=dispositivos_electronicos
DB_USER_PROD=dispositivos_user
DB_PASS_PROD=dispositivos_pass
DB_HOST_PROD=localhost
DB_DIALECT_PROD=postgres
DB_PORT_PROD=5432

# Application Configuration
PROD_PORT=8082
APP_PORT=8082

# API Endpoints
API_LOCAL_BASE_URL=http://localhost:8082
API_COMPONENT_NAME_URL=/api/v1/componentes
API_COMPONENT_DETAIL_NAME_URL=/api/v1/componentes-detalles
API_BIPOLAR_TRANSISTOR_NAME_URL=/api/v1/transistores-bipolares
API_ELECTROLYTIC_CAPACITOR_NAME_URL=/api/v1/capacitores-electroliticos
```

#### 1.3.3) Database Initialization

The database is automatically initialized with the following SQL files located in the `init/` directory:

1. **`01_db_dispositivos_electronicos_DDL.sql`**: Creates all tables, sequences, and constraints
2. **`02_db_dispositivos_electronicos_DML_INSERT.sql`**: Inserts initial data
3. **`03_db_dispositivos_electronicos_DML_UPDATE.sql`**: Sample update operations
4. **`04_db_dispositivos_electronicos_DML_DELETE.sql`**: Sample delete operations
5. **`05_db_dispositivos_electronicos_DML_QUERIES.sql`**: Sample queries

#### 1.3.4) Starting the Database

**Prerequisites:**
*   [Docker](https://docs.docker.com/get-docker/) installed on your system
*   [Docker Compose](https://docs.docker.com/compose/install/) installed

**Commands:**

1. **Start the database:**
   ```bash
   docker-compose up -d
   ```

2. **Check if the database is running:**
   ```bash
   docker-compose ps
   ```

3. **View database logs:**
   ```bash
   docker-compose logs postgres
   ```

4. **Stop the database:**
   ```bash
   docker-compose down
   ```

5. **Stop and remove all data (volumes):**
   ```bash
   docker-compose down -v
   ```

#### 1.3.5) Database Connection

The application automatically connects to the PostgreSQL database using Sequelize ORM. The connection is configured in `src/db/config.js` and uses the environment variables defined in your `.env` file.

**Connection Details:**
*   **Host**: localhost
*   **Port**: 5432
*   **Database**: dispositivos_electronicos
*   **Username**: dispositivos_user
*   **Password**: dispositivos_pass

#### 1.3.6) Database Schema

The database includes the following main tables:

**Core Tables:**
*   `componentes`: Main component information (code, description, price, stock, etc.)
*   `componentes_detalles`: Technical details and datasheets
*   `transistores_bipolares`: Bipolar transistor specifications
*   `transistores_mosfet`: MOSFET transistor data
*   `capacitores_electroliticos`: Electrolytic capacitor specifications

**Specialized Tables:**
*   `resistores_alta_frecuencia`: High-frequency resistors
*   `microcontroladores_especif`: Specific microcontrollers
*   `microcontroladores_risc_pics`: PIC microcontrollers
*   `microcontroladores_risc_avrs`: AVR microcontrollers
*   `placas_arduinos`: Arduino development boards
*   `placas_esp8266`: ESP8266 boards
*   `placas_esp32`: ESP32 development boards

#### 1.3.7) Troubleshooting

**Common Issues:**

1. **Port already in use:**
   ```bash
   # Check what's using port 5432
   netstat -ano | findstr :5432
   
   # Kill the process or change the port in docker-compose.yml
   ```

2. **Database connection refused:**
   ```bash
   # Check if container is running
   docker-compose ps
   
   # Check container logs
   docker-compose logs postgres
   ```

3. **Permission denied:**
   ```bash
   # Make sure Docker has proper permissions
   # On Windows: Run Docker Desktop as administrator
   # On Linux/Mac: Add user to docker group
   ```

4. **Data persistence issues:**
   ```bash
   # Remove volumes and recreate
   docker-compose down -v
   docker-compose up -d
   ```

<br>

</details>

### 1.4) Technologies [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

| **Technologies** | **Version** | **Purpose** |
| ------------- | ------------- | ------------- |
| [NodeJS](https://nodejs.org/en/) | 18.x | JavaScript Runtime |
| [Express](https://expressjs.com/) | 4.21.2 | Web Framework |
| [PostgreSQL](https://www.postgresql.org/) | 15 | Database Engine |
| [Docker](https://www.docker.com/) | Latest | Containerization |
| [Sequelize](https://sequelize.org/) | 6.32.1 | ORM for Node.js |
| [Jest](https://jestjs.io/) | 29.7.0 | Testing Framework |
| [Swagger](https://swagger.io/) | 6.2.8 | API Documentation |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2 | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11 | HTTP Client |
| [Git](https://git-scm.com/downloads) | 2.29.1 | Version Control |

</br>

| **Plugin** | **Description** |
| ------------- | ------------- |
| [pg](https://www.npmjs.com/package/pg) | PostgreSQL client for Node.js |
| [pg-hstore](https://www.npmjs.com/package/pg-hstore) | Serialize and deserialize JSON data to hstore format |
| [cors](https://www.npmjs.com/package/cors) | Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | Environment variables loader |
| [morgan](https://www.npmjs.com/package/morgan) | HTTP request logger middleware |
| [nodemon](https://www.npmjs.com/package/nodemon) | Auto-restart server during development |
| [express-validator](https://www.npmjs.com/package/express-validator) | Request validation middleware |
| [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) | Swagger UI for Express |
| [winston](https://www.npmjs.com/package/winston) | Logging library |

</br>

| **Extension** |
| ------------- |
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |

<br>

</details>

<br>

## Section 2) Testing Documentation and Implementation

### 2.0) Testing Overview [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

This project includes a comprehensive testing suite with both unit tests and integration tests to ensure code quality and reliability.

**Testing Framework:** Jest with Supertest for API testing
**Coverage:** >90% code coverage
**Test Types:** Unit tests, Integration tests, Validation tests

<br>

</details>

### 2.1) Testing Structure [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

```
src/test/
├── integration-test/          # Integration tests
│   ├── app.test.js           # App configuration for tests
│   ├── test-setup.js         # Test database configuration
│   ├── component.test.js     # Component endpoint tests
│   ├── mosfet-transistor.test.js
│   ├── bipolar-transistor.test.js
│   ├── electrolytic-capacitor.test.js
│   └── component-detail.test.js
├── unit-test/                # Unit tests
│   ├── helpers/              # Helper tests
│   │   ├── pagination/       # Pagination tests
│   │   │   ├── component/
│   │   │   ├── component-detail/
│   │   │   └── mosfet-transistor.test.js
│   │   └── validations/      # Validation tests
│   │       ├── component.test.js
│   │       └── mosfet-transistor.test.js
│   └── services/             # Service tests
│       ├── component.test.js
│       └── mosfet-transistor.test.js
└── mock/                     # Mocks and configuration
    └── set-env-vars.js       # Environment variables for tests
```

<br>

</details>

### 2.2) Testing Commands [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### Execute all tests
```bash
npm test
```

#### Execute unit tests
```bash
npm run test:unit
```

#### Execute integration tests
```bash
npm run test:integration
```

#### Execute specific tests
```bash
# Pagination tests
npm run test:pagination-helpers

# Service tests
npm run test:services

# Validation tests
npm run test:validations
```

#### Execute tests with coverage
```bash
npm run test:cov
```

#### Execute tests in watch mode
```bash
npm run test:watch
```

<br>

</details>

### 2.3) Test Types [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### 2.3.1) Unit Tests

Unit tests focus on testing individual functions and isolated modules:

**Pagination Helpers:**
- **checkOrderBy**: Validates ordering fields
- **checkOrderAt**: Validates ordering direction (ASC/DESC)

**Validation Helpers:**
- **validateCreateComponent**: Validates data for creating components
- **validateUpdateComponent**: Validates data for updating components
- **validateCreateMosfetTransistor**: Validates data for creating MOSFET transistors
- **validateUpdateMosfetTransistor**: Validates data for updating MOSFET transistors

**Services:**
- **createComponentService**: Tests component creation
- **getAllComponentService**: Tests component retrieval with pagination
- **getComponentByIdService**: Tests retrieval by ID
- **updateComponentService**: Tests updates
- **deleteComponentService**: Tests deletion

#### 2.3.2) Integration Tests

Integration tests test complete API endpoints:

**Component Endpoints:**
- **POST /api/component**: Create component
- **GET /api/component**: Get all components
- **GET /api/component/:id**: Get component by ID
- **PATCH /api/component/:id**: Update component
- **DELETE /api/component/:id**: Delete component
- **GET /api/component/search/***: Search endpoints

**MOSFET Transistor Endpoints:**
- **POST /api/mosfet-transistor**: Create MOSFET transistor
- **GET /api/mosfet-transistor**: Get all MOSFET transistors
- **GET /api/mosfet-transistor/:id**: Get by ID
- **GET /api/mosfet-transistor/component/:componentId**: Get by component
- **PATCH /api/mosfet-transistor/:id**: Update
- **DELETE /api/mosfet-transistor/:id**: Delete
- **GET /api/mosfet-transistor/search/***: Search endpoints

**Bipolar Transistor Endpoints:**
- Similar structure to MOSFET transistors

**Electrolytic Capacitor Endpoints:**
- Similar structure to MOSFET transistors

**Component Detail Endpoints:**
- Similar structure to components

<br>

</details>

### 2.4) Test Configuration [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### 2.4.1) Environment Variables for Tests

```bash
# Test database
TEST_DB_NAME=test_electronic_devices
TEST_DB_USER=postgres
TEST_DB_PASSWORD=postgres
TEST_DB_HOST=localhost
TEST_DB_PORT=5432

# Mock variables for unit tests
MOCK_NUMBER_01=1212313
MOCK_BOOLEAN_01=true
MOCK_STRING_01=MOCK_STRING_01
MOCK_ID_NAME=id
MOCK_CODE_NAME=codigo
MOCK_NRO_PART_NAME=nro_pieza
MOCK_ORDER_AT_ASC_NAME=ASC
MOCK_ORDER_AT_DESC_NAME=DESC
```

#### 2.4.2) Jest Configuration

```javascript
// jest.config.js
const config = {
  setupFilesAfterEnv: ['./src/test/mock/set-env-vars.js'],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/test/**',
    '!src/server.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
```

<br>

</details>

### 2.5) Test Coverage [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

The tests cover:

#### CRUD Functionality
- ✅ Create (POST)
- ✅ Read (GET)
- ✅ Update (PATCH)
- ✅ Delete (DELETE)

#### Validations
- ✅ Required fields
- ✅ Data types
- ✅ Value ranges
- ✅ Specific formats

#### Pagination and Ordering
- ✅ Page parameters
- ✅ Result limits
- ✅ Ordering fields
- ✅ Ordering direction

#### Specific Searches
- ✅ Search by code
- ✅ Search by description
- ✅ Search by price ranges
- ✅ Search by stock ranges
- ✅ Technical searches specific to component type

#### Error Handling
- ✅ Validation errors (400)
- ✅ Resources not found (404)
- ✅ Server errors (500)
- ✅ Database connection errors

<br>

</details>

### 2.6) Test Cases [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### Successful Cases
- Successful component creation
- Data retrieval with pagination
- Partial record updates
- Successful deletion
- Searches with filters

#### Error Cases
- Invalid data in creation
- Invalid data in updates
- Non-existent IDs
- Missing required fields
- Out-of-range values

#### Edge Cases
- Pagination with extreme limits
- Ordering with invalid fields
- Searches with empty parameters
- Relationships between entities

<br>

</details>

### 2.7) Troubleshooting [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### Common Issues

1. **Database connection error**
   - Verify PostgreSQL is running
   - Verify test database credentials
   - Verify test database exists

2. **Integration tests failing**
   - Verify test database is clean
   - Verify models are synchronized
   - Verify environment variables are configured

3. **Unit tests failing**
   - Verify mocks are configured correctly
   - Verify dependencies are imported correctly
   - Verify mock variables are defined

#### Debug Logs

To enable detailed logs during tests:

```bash
# Enable Jest logs
npm test -- --verbose

# Enable database logs
DEBUG=sequelize:* npm test
```

<br>

</details>

### 2.8) Quality Metrics [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

- **Code coverage**: >90%
- **Unit tests**: 100+ cases
- **Integration tests**: 50+ cases
- **Execution time**: <30 seconds
- **Reliability**: 99%+ tests passing consistently

<br>

</details>

### 2.9) Maintenance [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### Adding New Tests

1. **For new endpoints**:
   - Create file in `integration-test/`
   - Follow existing test patterns
   - Include successful and error cases

2. **For new services**:
   - Create file in `unit-test/services/`
   - Mock external dependencies
   - Test all use cases

3. **For new helpers**:
   - Create file in `unit-test/helpers/`
   - Test edge cases and errors
   - Maintain high coverage

#### Updating Existing Tests

- Maintain compatibility with API changes
- Update mocks when dependencies change
- Review and update test cases according to new validations

<br>

</details>

<br>

## Section 3) Endpoints and Examples.

### 3.0) Endpoints and resources [🔝](#index-)

<details>
   <summary>View</summary>
<br>

## API Overview

The API provides RESTful endpoints for managing electronic components with the following base URL:
```
http://localhost:8082/api/v1
```

### Authentication
Currently, the API does not require authentication. All endpoints are publicly accessible.

### Response Format
All API responses follow a consistent JSON format:

**Success Response:**
```json
{
  "status": "success",
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Component Endpoints

### 3.1) GET Operations

#### 3.1.1) Get All Components

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/componentes?page=1&limit=5&orderBy=codigo&orderAt=ASC' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Components retrieved successfully",
  "data": [
    {
      "id": 1,
      "codigo": "COMP001",
      "descripcion": "Arduino Uno R3",
      "categoria": "Development Board",
      "fabricante": "Arduino",
      "precio": 25.99,
      "stock": 50,
      "imagen": "arduino-uno.jpg",
      "nro_pieza": "A000066",
      "created_at": "2023-06-28T16:46:31.000Z",
      "updated_at": "2023-06-28T16:46:31.000Z"
    },
    {
      "id": 2,
      "codigo": "COMP002",
      "descripcion": "Raspberry Pi 4 Model B",
      "categoria": "Development Board",
      "fabricante": "Raspberry Pi Foundation",
      "precio": 45.00,
      "stock": 25,
      "imagen": "raspberry-pi-4.jpg",
      "nro_pieza": "RPI4-4GB",
      "created_at": "2023-06-28T16:47:15.000Z",
      "updated_at": "2023-06-28T16:47:15.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 150,
    "pages": 30
  }
}
```

###### Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Invalid pagination parameters. Page must be a positive number and limit must be between 1 and 100."
}
```

###### Response (500 Internal Server Error)

```json
{
  "status": "error",
  "message": "Database connection error. Please try again later."
}
```

#### 3.1.2) Get Component by ID

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/componentes/1' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Component retrieved successfully",
  "data": {
    "id": 1,
    "codigo": "COMP001",
    "descripcion": "Arduino Uno R3",
    "categoria": "Development Board",
    "fabricante": "Arduino",
    "precio": 25.99,
    "stock": 50,
    "imagen": "arduino-uno.jpg",
    "nro_pieza": "A000066",
    "created_at": "2023-06-28T16:46:31.000Z",
    "updated_at": "2023-06-28T16:46:31.000Z"
  }
}
```

###### Response (404 Not Found)

```json
{
  "status": "error",
  "message": "Component not found with ID: 999"
}
```

#### 3.1.3) Search Components by Code

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/componentes/search/codigo/COMP001' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Components found successfully",
  "data": [
    {
      "id": 1,
      "codigo": "COMP001",
      "descripcion": "Arduino Uno R3",
      "categoria": "Development Board",
      "fabricante": "Arduino",
      "precio": 25.99,
      "stock": 50,
      "imagen": "arduino-uno.jpg",
      "nro_pieza": "A000066"
    }
  ]
}
```

#### 3.1.4) Search Components by Price Range

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/componentes/search/precio-min-max/10/50' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Components found successfully",
  "data": [
    {
      "id": 1,
      "codigo": "COMP001",
      "descripcion": "Arduino Uno R3",
      "categoria": "Development Board",
      "fabricante": "Arduino",
      "precio": 25.99,
      "stock": 50
    },
    {
      "id": 2,
      "codigo": "COMP002",
      "descripcion": "Raspberry Pi 4 Model B",
      "categoria": "Development Board",
      "fabricante": "Raspberry Pi Foundation",
      "precio": 45.00,
      "stock": 25
    }
  ]
}
```

### 3.2) POST Operations

#### 3.2.1) Create Component

###### Request (POST)

```bash
curl --location --request POST 'http://localhost:8082/api/v1/componentes' \
--header 'Content-Type: application/json' \
--data-raw '{
    "codigo": "COMP003",
    "descripcion": "ESP32 Development Board",
    "categoria": "Development Board",
    "fabricante": "Espressif",
    "precio": 12.99,
    "stock": 75,
    "imagen": "esp32-dev-board.jpg",
    "nro_pieza": "ESP32-DEV"
}'
```

###### Response (201 Created)

```json
{
  "status": "success",
  "message": "Component created successfully",
  "data": {
    "id": 3,
    "codigo": "COMP003",
    "descripcion": "ESP32 Development Board",
    "categoria": "Development Board",
    "fabricante": "Espressif",
    "precio": 12.99,
    "stock": 75,
    "imagen": "esp32-dev-board.jpg",
    "nro_pieza": "ESP32-DEV",
    "created_at": "2023-06-28T17:30:15.000Z",
    "updated_at": "2023-06-28T17:30:15.000Z"
  }
}
```

###### Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "codigo",
      "message": "Code is required and must be between 3 and 20 characters"
    },
    {
      "field": "precio",
      "message": "Price must be a positive number"
    },
    {
      "field": "stock",
      "message": "Stock must be a non-negative integer"
    }
  ]
}
```

###### Response (409 Conflict)

```json
{
  "status": "error",
  "message": "Component with code 'COMP003' already exists"
}
```

### 3.3) PATCH Operations

#### 3.3.1) Update Component

###### Request (PATCH)

```bash
curl --location --request PATCH 'http://localhost:8082/api/v1/componentes/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "precio": 29.99,
    "stock": 45,
    "descripcion": "Arduino Uno R3 - Updated Description"
}'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Component updated successfully",
  "data": {
    "id": 1,
    "codigo": "COMP001",
    "descripcion": "Arduino Uno R3 - Updated Description",
    "categoria": "Development Board",
    "fabricante": "Arduino",
    "precio": 29.99,
    "stock": 45,
    "imagen": "arduino-uno.jpg",
    "nro_pieza": "A000066",
    "updated_at": "2023-06-28T18:15:30.000Z"
  }
}
```

###### Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "precio",
      "message": "Price must be a positive number"
    }
  ]
}
```

###### Response (404 Not Found)

```json
{
  "status": "error",
  "message": "Component not found with ID: 999"
}
```

### 3.4) DELETE Operations

#### 3.4.1) Delete Component

###### Request (DELETE)

```bash
curl --location --request DELETE 'http://localhost:8082/api/v1/componentes/3' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Component deleted successfully"
}
```

###### Response (404 Not Found)

```json
{
  "status": "error",
  "message": "Component not found with ID: 999"
}
```

###### Response (409 Conflict)

```json
{
  "status": "error",
  "message": "Cannot delete component. It has associated records in other tables"
}
```

## MOSFET Transistor Endpoints

### 3.5) GET Operations

#### 3.5.1) Get All MOSFET Transistors

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/transistores-mosfet?page=1&limit=5' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "MOSFET transistors retrieved successfully",
  "data": [
    {
      "id": 1,
      "componente_id": 1,
      "tipo": "N-Channel",
      "voltaje_drenaje_fuente": 60,
      "corriente_cc_drenaje": 3.2,
      "disip_max": 1.4,
      "resist_drenaje_fuente": 0.085,
      "temp_op_max": 150,
      "conduct_drenaje_sustrato": 0.0001,
      "created_at": "2023-06-28T16:46:31.000Z",
      "updated_at": "2023-06-28T16:46:31.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 25,
    "pages": 5
  }
}
```

#### 3.5.2) Get MOSFET Transistor by ID

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/transistores-mosfet/1' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "MOSFET transistor retrieved successfully",
  "data": {
    "id": 1,
    "componente_id": 1,
    "tipo": "N-Channel",
    "voltaje_drenaje_fuente": 60,
    "corriente_cc_drenaje": 3.2,
    "disip_max": 1.4,
    "resist_drenaje_fuente": 0.085,
    "temp_op_max": 150,
    "conduct_drenaje_sustrato": 0.0001,
    "componente": {
      "id": 1,
      "codigo": "COMP001",
      "descripcion": "Arduino Uno R3"
    }
  }
}
```

### 3.6) POST Operations

#### 3.6.1) Create MOSFET Transistor

###### Request (POST)

```bash
curl --location --request POST 'http://localhost:8082/api/v1/transistores-mosfet' \
--header 'Content-Type: application/json' \
--data-raw '{
    "componente_id": 2,
    "tipo": "P-Channel",
    "voltaje_drenaje_fuente": 30,
    "corriente_cc_drenaje": 2.1,
    "disip_max": 1.0,
    "resist_drenaje_fuente": 0.12,
    "temp_op_max": 150,
    "conduct_drenaje_sustrato": 0.0001
}'
```

###### Response (201 Created)

```json
{
  "status": "success",
  "message": "MOSFET transistor created successfully",
  "data": {
    "id": 2,
    "componente_id": 2,
    "tipo": "P-Channel",
    "voltaje_drenaje_fuente": 30,
    "corriente_cc_drenaje": 2.1,
    "disip_max": 1.0,
    "resist_drenaje_fuente": 0.12,
    "temp_op_max": 150,
    "conduct_drenaje_sustrato": 0.0001,
    "created_at": "2023-06-28T17:45:20.000Z",
    "updated_at": "2023-06-28T17:45:20.000Z"
  }
}
```

###### Response (400 Bad Request)

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "componente_id",
      "message": "Component ID is required and must exist"
    },
    {
      "field": "voltaje_drenaje_fuente",
      "message": "Drain-source voltage must be a positive number"
    }
  ]
}
```

### 3.7) PATCH Operations

#### 3.7.1) Update MOSFET Transistor

###### Request (PATCH)

```bash
curl --location --request PATCH 'http://localhost:8082/api/v1/transistores-mosfet/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "disip_max": 1.6,
    "temp_op_max": 175
}'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "MOSFET transistor updated successfully",
  "data": {
    "id": 1,
    "componente_id": 1,
    "tipo": "N-Channel",
    "voltaje_drenaje_fuente": 60,
    "corriente_cc_drenaje": 3.2,
    "disip_max": 1.6,
    "resist_drenaje_fuente": 0.085,
    "temp_op_max": 175,
    "conduct_drenaje_sustrato": 0.0001,
    "updated_at": "2023-06-28T18:20:45.000Z"
  }
}
```

### 3.8) DELETE Operations

#### 3.8.1) Delete MOSFET Transistor

###### Request (DELETE)

```bash
curl --location --request DELETE 'http://localhost:8082/api/v1/transistores-mosfet/2' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "MOSFET transistor deleted successfully"
}
```

## Bipolar Transistor Endpoints

### 3.9) GET Operations

#### 3.9.1) Get All Bipolar Transistors

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/transistores-bipolares?page=1&limit=5' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Bipolar transistors retrieved successfully",
  "data": [
    {
      "id": 1,
      "componente_id": 3,
      "tipo": "NPN",
      "voltaje_colec_emis": 40,
      "voltaje_colec_base": 60,
      "voltaje_emis_base": 6,
      "corriente_colec": 0.6,
      "ganancia_hfe": 100,
      "disip_max": 0.625,
      "temp_juntura": 150,
      "voltaje_colec_emis_sat": 0.3,
      "created_at": "2023-06-28T16:46:31.000Z",
      "updated_at": "2023-06-28T16:46:31.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 15,
    "pages": 3
  }
}
```

### 3.10) POST Operations

#### 3.10.1) Create Bipolar Transistor

###### Request (POST)

```bash
curl --location --request POST 'http://localhost:8082/api/v1/transistores-bipolares' \
--header 'Content-Type: application/json' \
--data-raw '{
    "componente_id": 4,
    "tipo": "PNP",
    "voltaje_colec_emis": 30,
    "voltaje_colec_base": 50,
    "voltaje_emis_base": 5,
    "corriente_colec": 0.5,
    "ganancia_hfe": 80,
    "disip_max": 0.5,
    "temp_juntura": 150,
    "voltaje_colec_emis_sat": 0.2
}'
```

###### Response (201 Created)

```json
{
  "status": "success",
  "message": "Bipolar transistor created successfully",
  "data": {
    "id": 2,
    "componente_id": 4,
    "tipo": "PNP",
    "voltaje_colec_emis": 30,
    "voltaje_colec_base": 50,
    "voltaje_emis_base": 5,
    "corriente_colec": 0.5,
    "ganancia_hfe": 80,
    "disip_max": 0.5,
    "temp_juntura": 150,
    "voltaje_colec_emis_sat": 0.2,
    "created_at": "2023-06-28T17:50:10.000Z",
    "updated_at": "2023-06-28T17:50:10.000Z"
  }
}
```

## Electrolytic Capacitor Endpoints

### 3.11) GET Operations

#### 3.11.1) Get All Electrolytic Capacitors

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/capacitores-electroliticos?page=1&limit=5' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Electrolytic capacitors retrieved successfully",
  "data": [
    {
      "id": 1,
      "componente_id": 5,
      "capacitancia": 100,
      "voltaje_nominal": 16,
      "tolerancia": 20,
      "rango_temperatura": "-40 to 85",
      "tipo": "Aluminum",
      "created_at": "2023-06-28T16:46:31.000Z",
      "updated_at": "2023-06-28T16:46:31.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 20,
    "pages": 4
  }
}
```

### 3.12) POST Operations

#### 3.12.1) Create Electrolytic Capacitor

###### Request (POST)

```bash
curl --location --request POST 'http://localhost:8082/api/v1/capacitores-electroliticos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "componente_id": 6,
    "capacitancia": 220,
    "voltaje_nominal": 25,
    "tolerancia": 10,
    "rango_temperatura": "-55 to 105",
    "tipo": "Tantalum"
}'
```

###### Response (201 Created)

```json
{
  "status": "success",
  "message": "Electrolytic capacitor created successfully",
  "data": {
    "id": 2,
    "componente_id": 6,
    "capacitancia": 220,
    "voltaje_nominal": 25,
    "tolerancia": 10,
    "rango_temperatura": "-55 to 105",
    "tipo": "Tantalum",
    "created_at": "2023-06-28T17:55:30.000Z",
    "updated_at": "2023-06-28T17:55:30.000Z"
  }
}
```

## Component Detail Endpoints

### 3.13) GET Operations

#### 3.13.1) Get All Component Details

###### Request (GET)

```bash
curl --location --request GET 'http://localhost:8082/api/v1/componentes-detalles?page=1&limit=5' \
--header 'Content-Type: application/json'
```

###### Response (200 OK)

```json
{
  "status": "success",
  "message": "Component details retrieved successfully",
  "data": [
    {
      "id": 1,
      "componente_id": 1,
      "longitud": 68.6,
      "ancho": 53.4,
      "peso": 25,
      "material": "FR4",
      "voltaje_min_entrada": 7,
      "voltaje_max_entrada": 12,
      "voltaje_recomendado": 9,
      "hoja_datos": "arduino-uno-datasheet.pdf",
      "created_at": "2023-06-28T16:46:31.000Z",
      "updated_at": "2023-06-28T16:46:31.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 10,
    "pages": 2
  }
}
```

### 3.14) POST Operations

#### 3.14.1) Create Component Detail

###### Request (POST)

```bash
curl --location --request POST 'http://localhost:8082/api/v1/componentes-detalles' \
--header 'Content-Type: application/json' \
--data-raw '{
    "componente_id": 2,
    "longitud": 85.6,
    "ancho": 56.0,
    "peso": 46,
    "material": "FR4",
    "voltaje_min_entrada": 4.75,
    "voltaje_max_entrada": 5.25,
    "voltaje_recomendado": 5.0,
    "hoja_datos": "raspberry-pi-4-datasheet.pdf"
}'
```

###### Response (201 Created)

```json
{
  "status": "success",
  "message": "Component detail created successfully",
  "data": {
    "id": 2,
    "componente_id": 2,
    "longitud": 85.6,
    "ancho": 56.0,
    "peso": 46,
    "material": "FR4",
    "voltaje_min_entrada": 4.75,
    "voltaje_max_entrada": 5.25,
    "voltaje_recomendado": 5.0,
    "hoja_datos": "raspberry-pi-4-datasheet.pdf",
    "created_at": "2023-06-28T18:00:15.000Z",
    "updated_at": "2023-06-28T18:00:15.000Z"
  }
}
```

## Error Handling

### Common Error Responses

#### 400 Bad Request
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

#### 404 Not Found
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

#### 409 Conflict
```json
{
  "status": "error",
  "message": "Resource already exists or has dependencies"
}
```

#### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error. Please try again later."
}
```

## API Documentation

Interactive API documentation is available at:
```
http://localhost:8082/api-docs
```

This Swagger UI provides:
- Interactive endpoint testing
- Request/response examples
- Schema definitions
- Authentication information

<br>

</details>

<br>

## Section 4) Functionality Testing and References.

### 4.0) Functionality test [🔝](#index-)

<details>
   <summary>View</summary>
<br>

## Testing Overview

This section provides comprehensive guidance on testing the API functionality, including manual testing procedures, automated testing, and recommended testing tools.

## Manual Testing

### Prerequisites for Testing
1. **Server Running**: Ensure the API server is running on `http://localhost:8082`
2. **Database Active**: Verify PostgreSQL database is running via Docker
3. **Test Data**: Ensure the database contains test data (automatically loaded via init scripts)

### Testing Tools

#### 1. Postman Collection
A comprehensive Postman collection is included in the project:
- **Location**: `postman/collections/Api_DispElectr_Express.postman_collection.json`
- **Import**: Import this collection into Postman for easy API testing
- **Environment**: Configure environment variables for different testing scenarios

**Collection Features:**
- **Complete API Coverage**: All endpoints for components, transistors, capacitors, and component details
- **Pre-configured Requests**: Ready-to-use requests with proper headers and body examples
- **Environment Variables**: Uses variables for base URL and common parameters
- **Request Examples**: Includes sample data for all POST/PATCH operations
- **Response Validation**: Pre-configured tests for common response scenarios
- **Organized Structure**: Requests grouped by component type for easy navigation

**How to Use:**
1. **Import Collection**: In Postman, go to File → Import → Upload Files and select the collection file
2. **Set Environment**: Create a new environment with variable `base_url` set to `http://localhost:8082`
3. **Start Testing**: The collection will be ready to use with all endpoints configured
4. **Modify as Needed**: Update request bodies and parameters according to your testing needs

#### 2. Swagger UI
Interactive API documentation and testing:
- **URL**: `http://localhost:8082/api-docs`
- **Features**: 
  - Interactive endpoint testing
  - Request/response examples
  - Schema validation
  - Real-time API exploration

#### 3. cURL Commands
Command-line testing examples:

**Test Server Health:**
```bash
curl -X GET http://localhost:8082/api/v1/health
```

**Get All Components:**
```bash
curl -X GET "http://localhost:8082/api/v1/componentes?page=1&limit=5"
```

**Create a Component:**
```bash
curl -X POST http://localhost:8082/api/v1/componentes \
  -H "Content-Type: application/json" \
  -d '{
    "codigo": "TEST001",
    "descripcion": "Test Component",
    "categoria": "Test Category",
    "fabricante": "Test Manufacturer",
    "precio": 10.99,
    "stock": 100
  }'
```

## Automated Testing

### Running Tests

#### 1. All Tests
```bash
npm test
```

#### 2. Specific Test Types
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Tests with coverage
npm run test:cov

# Tests in watch mode
npm run test:watch
```

#### 3. Specific Test Categories
```bash
# Pagination helper tests
npm run test:pagination-helpers

# Service layer tests
npm run test:services

# Validation tests
npm run test:validations
```

### Test Structure

#### Unit Tests (`src/test/unit-test/`)
- **Helpers**: Pagination and validation logic
- **Services**: Business logic and data processing
- **Coverage**: >90% code coverage

#### Integration Tests (`src/test/integration-test/`)
- **API Endpoints**: Complete request/response testing
- **Database Operations**: CRUD operations with real database
- **Error Handling**: Validation and error scenarios

### Test Data Management

#### Database Setup
```bash
# Start test database
docker-compose up -d

# Reset database (if needed)
docker-compose down -v
docker-compose up -d
```

#### Test Environment Variables
```env
# Test database configuration
TEST_DB_NAME=test_electronic_devices
TEST_DB_USER=postgres
TEST_DB_PASSWORD=postgres
TEST_DB_HOST=localhost
TEST_DB_PORT=5432
```

## Testing Scenarios

### 1. Component Management

#### Create Component
```bash
POST /api/v1/componentes
Content-Type: application/json

{
  "codigo": "COMP001",
  "descripcion": "Arduino Uno R3",
  "categoria": "Development Board",
  "fabricante": "Arduino",
  "precio": 25.99,
  "stock": 50
}
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Component created successfully",
  "data": {
    "id": 1,
    "codigo": "COMP001",
    "descripcion": "Arduino Uno R3",
    // ... other fields
  }
}
```

#### Get Components with Pagination
```bash
GET /api/v1/componentes?page=1&limit=5&orderBy=codigo&orderAt=ASC
```

#### Search Components
```bash
GET /api/v1/componentes/search/codigo/COMP001
GET /api/v1/componentes/search/precio-min-max/10/50
```

### 2. MOSFET Transistor Testing

#### Create MOSFET
```bash
POST /api/v1/transistores-mosfet
Content-Type: application/json

{
  "componente_id": 1,
  "tipo": "N-Channel",
  "voltaje_drenaje_fuente": 60,
  "corriente_cc_drenaje": 3.2,
  "disip_max": 1.4
}
```

#### Search by Technical Parameters
```bash
GET /api/v1/transistores-mosfet/search/tipo/N-Channel
GET /api/v1/transistores-mosfet/search/voltaje-drenaje-fuente/60
```

### 3. Error Handling Testing

#### Invalid Data
```bash
POST /api/v1/componentes
Content-Type: application/json

{
  "codigo": "",  // Invalid: empty code
  "precio": -10  // Invalid: negative price
}
```

**Expected Response:**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "codigo",
      "message": "Code is required"
    },
    {
      "field": "precio",
      "message": "Price must be positive"
    }
  ]
}
```

#### Resource Not Found
```bash
GET /api/v1/componentes/999999
```

**Expected Response:**
```json
{
  "status": "error",
  "message": "Component not found"
}
```

## Performance Testing

### Load Testing with Artillery
```bash
# Install Artillery
npm install -g artillery

# Run load test
artillery run load-test.yml
```

### Example Load Test Configuration
```yaml
# load-test.yml
config:
  target: 'http://localhost:8082'
  phases:
    - duration: 60
      arrivalRate: 10
  defaults:
    headers:
      Content-Type: 'application/json'

scenarios:
  - name: "Get Components"
    requests:
      - get:
          url: "/api/v1/componentes"
```

## Security Testing

### Input Validation
- Test with SQL injection attempts
- Test with XSS payloads
- Test with oversized payloads
- Test with malformed JSON

### Rate Limiting (Future)
- Test API rate limits
- Test concurrent requests
- Test abuse scenarios

## Monitoring and Logging

### Application Logs
```bash
# View application logs
docker-compose logs -f app

# View database logs
docker-compose logs -f postgres
```

### Test Reports
```bash
# Generate test coverage report
npm run test:cov

# View coverage report
open coverage/lcov-report/index.html
```

## Continuous Integration

### GitHub Actions (Recommended)
```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run test:cov
```

## Testing Best Practices

### 1. Test Data Isolation
- Use separate test database
- Clean up test data after each test
- Use unique identifiers for test data

### 2. Test Coverage
- Aim for >90% code coverage
- Test both success and error scenarios
- Test edge cases and boundary conditions

### 3. Performance Testing
- Test with realistic data volumes
- Monitor response times
- Test concurrent access

### 4. Security Testing
- Validate all inputs
- Test authentication (when implemented)
- Test authorization (when implemented)

## Troubleshooting Tests

### Common Issues

#### Database Connection
```bash
# Check if database is running
docker-compose ps

# Restart database
docker-compose restart postgres
```

#### Port Conflicts
```bash
# Check port usage
netstat -ano | findstr :8082

# Kill conflicting processes
npx kill-port 8082
```

#### Test Environment
```bash
# Clear test cache
npm test -- --clearCache

# Run tests with verbose output
npm test -- --verbose
```

<br>

</details>

### 4.1) References [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### Docker and PostgreSQL

*   [Docker Official PostgreSQL Image](https://hub.docker.com/_/postgres)
*   [Docker Compose Documentation](https://docs.docker.com/compose/)
*   [PostgreSQL with Docker Best Practices](https://docs.docker.com/samples/postgresql_service/)
*   [Docker Compose Environment Variables](https://docs.docker.com/compose/environment-variables/)

#### Sequelize with PostgreSQL

*   [PostgreSQL with Sequelize](https://www.makeuseof.com/use-postgresql-with-sequelize-in-nodejs/)
*   [Associations between tables](https://sequelize.org/docs/v6/core-concepts/assocs/)

#### Swagger and Nodejs

*   [Automatically Generate Swagger Docs With ExpressJS & NodeJS](https://www.youtube.com/watch?v=5aryMKiBEKY)
*   [Example repository](https://github.com/TomDoesTech/REST-API-Tutorial-Updated/tree/main)

#### Video tutorials

*   [Playlist Example Creation of Rest Api](https://www.youtube.com/watch?v=tpso18ghda4)
*   [Creation and config Api rest from scratch](https://www.youtube.com/watch?v=bK3AJfs7qNY\&t=1019s)

#### Code Examples

*   [Example of microservice using Sequelize, Mysql and NodeJS](https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS)

#### Bookstores

*   [Handling validations with express-validator](https://medium.com/dataseries/introduction-to-request-body-validation-in-express-apps-with-express-validator-7b9725ca780d)
*   [express-validator official doc](https://express-validator.github.io/docs/guides/getting-started)

#### Remark-lint

*   [remark-lint-emphasis-marker](https://www.npmjs.com/package/remark-lint-emphasis-marker)
*   [remark-preset-lint-recommended](https://www.npmjs.com/package/remark-preset-lint-recommended)
*   [remark-reference-links](https://www.npmjs.com/package/remark-reference-links)

#### Railway

*   [Example Deploy with Nodejs and Mysql](https://www.youtube.com/watch?v=C3NhmT__Mn4\&ab_channel=Fazt)

<br>

</details>

### 4.2) Postman Collection [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### Postman Collection Overview

A comprehensive Postman collection is included in this project to facilitate API testing and development. The collection contains pre-configured requests for all API endpoints with proper headers, body examples, and environment variables.

**Collection Location:**
- **File**: `postman/collections/Api_DispElectr_Express.postman_collection.json`
- **Size**: ~481KB with 11,000+ lines of configuration
- **Coverage**: Complete API coverage for all endpoints

#### Collection Features

**📋 Complete API Coverage:**
- **Components**: CRUD operations, search, and pagination
- **MOSFET Transistors**: Technical specifications and parameters
- **Bipolar Transistors**: BJT characteristics and ratings
- **Electrolytic Capacitors**: Capacitor specifications
- **Component Details**: Technical details and datasheets

**🔧 Pre-configured Setup:**
- **Environment Variables**: Base URL and common parameters
- **Request Headers**: Proper Content-Type and authorization headers
- **Body Examples**: Sample data for all POST/PATCH operations
- **Response Validation**: Pre-configured tests for common scenarios
- **Organized Structure**: Requests grouped by component type

**📊 Testing Capabilities:**
- **Request Examples**: Ready-to-use requests with sample data
- **Response Validation**: Automatic validation of response status and structure
- **Error Testing**: Pre-configured error scenarios
- **Pagination Testing**: Examples with different page and limit parameters
- **Search Testing**: Various search criteria and filters

#### How to Use the Collection

**Step 1: Import Collection**
1. Open Postman application
2. Click **File** → **Import** → **Upload Files**
3. Select the file: `postman/collections/Api_DispElectr_Express.postman_collection.json`
4. Click **Import**

**Step 2: Set Up Environment**
1. Create a new environment in Postman
2. Add the following variable:
   - **Variable**: `base_url`
   - **Initial Value**: `http://localhost:8082`
   - **Current Value**: `http://localhost:8082`
3. Save the environment and select it

**Step 3: Start Testing**
1. Ensure your API server is running (`npm run start:dev`)
2. Ensure your database is running (`docker-compose up -d`)
3. Navigate through the collection folders
4. Click on any request to see its configuration
5. Modify request bodies or parameters as needed
6. Click **Send** to execute the request

#### Collection Structure

```
Api_DispElectr_Express Collection
├── Components
│   ├── GET All Components
│   ├── GET Component by ID
│   ├── POST Create Component
│   ├── PATCH Update Component
│   ├── DELETE Component
│   └── Search Components
├── MOSFET Transistors
│   ├── GET All MOSFET Transistors
│   ├── GET MOSFET by ID
│   ├── POST Create MOSFET
│   ├── PATCH Update MOSFET
│   ├── DELETE MOSFET
│   └── Search MOSFET Transistors
├── Bipolar Transistors
│   └── [Similar structure]
├── Electrolytic Capacitors
│   └── [Similar structure]
└── Component Details
    └── [Similar structure]
```

#### Customization Tips

**Modifying Request Bodies:**
- Update the JSON body in the request to match your test data
- Use environment variables for dynamic values
- Test different validation scenarios

**Adding New Tests:**
- Use the **Tests** tab in Postman to add custom validation
- Test response status codes, response times, and data structure
- Add assertions for specific business logic

**Environment Variables:**
- Create different environments for development, staging, and production
- Use variables for base URLs, authentication tokens, and common parameters
- Share environments with team members

#### Troubleshooting

**Common Issues:**
1. **Connection Refused**: Ensure the API server is running on port 8082
2. **Database Errors**: Verify PostgreSQL is running via Docker
3. **Validation Errors**: Check request body format and required fields
4. **Environment Issues**: Verify environment variables are set correctly

**Best Practices:**
- Always test with the latest collection version
- Keep environment variables updated
- Use descriptive test names and descriptions
- Document any custom modifications made to requests

<br>

</details>
