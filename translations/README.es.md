<div align="center">

![Index app](../doc/assets/componentes-example.png)

</div>

<div align="right">
   <img width="25" height="25" src="../doc/assets/icons/backend/javascript-typescript/png/sequelize.png" />
   <img width="25" height="25" src="../doc/assets/icons/database/png/postgres.png" />
   <img width="25" height="25" src="../doc/assets/icons/backend/javascript-typescript/png/typescript.png" />
   <img width="25" height="25" src="../doc/assets/icons/devops/png/swagger.png" />
   <img width="25" height="25" src="../doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
   <img width="25" height="25" src="../doc/assets/icons/backend/javascript-typescript/png/express-js.png" />
   <img width="25" height="25" src="../doc/assets/icons/devops/png/postman.png" />
   <img width="25" height="25" src="../doc/assets/icons/devops/png/git.png" />
</div>

<br>

<br>

<div align="right">
     <a href="../README.md" target="_blank">
       <img src="../doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
   </a>
    <a href="./README.es.md" target="_blank">
       <img src="../doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
   </a>
</div>


<br>

<div align="center">

# ApiRest_Dispositivos_Electronicos_ExpressJS ![(status-completed)](../doc/assets/icons/badges/status-completed.svg)


</div>

API Rest para la gestión de componentes electrónicos implementada con Express, NodeJS, Sequelize, Jest, dotenv, cors, express-validator, nodemon, swagger, PostgreSQL, Docker y más.

*   [Repositorio de la base de datos](https://github.com/andresWeitzel/db_dispositivos_electronicos_postgreSQL)
*   [Playlist de pruebas de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurDLAizKGgiChAKBJx1V19Fo)
*   [Colección de Postman](../postman/collections/Api_DispElectr_Express.postman_collection.json) - Colección completa para pruebas de la API

<br>

## Índice 📜

<details>
   <summary>Ver</summary>
  <br>

- [1.0) Descripción del proyecto](#10-descripción)
- [1.1) Ejecución del proyecto](#11-ejecución-del-proyecto)
- [1.2) Configuración desde cero](#12-configuración-desde-cero)
- [1.3) Configuración de base de datos con Docker y PostgreSQL](#13-configuración-de-base-de-datos-con-docker-y-postgresql)
- [1.4) Tecnologías](#14-tecnologías)
- [2.0) Pruebas y documentación](#20-pruebas-y-documentación)
- [3.0) Endpoints y ejemplos](#30-endpoints-y-ejemplos)
- [4.0) Pruebas de funcionalidad y referencias](#40-pruebas-de-funcionalidad-y-referencias)
- [4.1) Colección de Postman](#41-colección-de-postman)
- [5.0) Arquitectura del proyecto](#50-arquitectura-del-proyecto)
- [6.0) Créditos y licencia](#60-créditos-y-licencia)

<br>

</details>

## Sección 1) Descripción, configuración y tecnologías

### 1.0) Descripción [🔝](#índice-)

<details>
   <summary>Ver</summary>
  <br>

### 1.0.0) Descripción general

**ApiRest_Dispositivos_Electronicos_ExpressJS** es una API REST integral diseñada para gestionar inventario y especificaciones de componentes electrónicos. Este proyecto provee una solución robusta de backend para sistemas de gestión de dispositivos electrónicos, con capacidades avanzadas de búsqueda, especificaciones detalladas de componentes y una arquitectura escalable.

**Características principales:**
- **Soporte multi-componente**: Gestiona diversos componentes electrónicos incluyendo transistores, capacitores, resistencias, microcontroladores y placas de desarrollo
- **Búsqueda y filtrado avanzado**: Capacidades sofisticadas de búsqueda con múltiples criterios y paginación
- **Documentación API completa**: Documentación Swagger auto-generada para todos los endpoints
- **Suite de pruebas robusta**: Pruebas unitarias e integrales extensas con >90% de cobertura
- **Gestión de base de datos**: Base de datos PostgreSQL con Docker para fácil despliegue
- **Validación y manejo de errores**: Validación de entrada y gestión de errores integral
- **Arquitectura escalable**: Diseño modular con separación clara de responsabilidades

**Usuarios objetivo:**
- Proveedores y distribuidores de componentes electrónicos
- Equipos de ingeniería electrónica
- Sistemas de gestión de inventario
- Instituciones educativas que enseñan electrónica
- Hobbistas y makers que gestionan colecciones de componentes

### 1.0.1) Arquitectura y funcionamiento

**Resumen de arquitectura:**
La aplicación sigue un **patrón de arquitectura en capas** con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Presentación                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Rutas API     │  │   Middleware    │  │   Swagger    │ │
│  │                 │  │                 │  │ Documentación│ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Lógica de Negocio                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Controladores │  │    Servicios    │  │   Helpers    │ │
│  │                 │  │                 │  │              │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                    Capa de Acceso a Datos                   │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │    Modelos      │  │   Sequelize     │  │  PostgreSQL  │ │
│  │                 │  │     ORM         │  │  Base de datos│ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Componentes principales:**

1. **Capa de rutas** (`src/config/routes/`):
   - Endpoints RESTful para cada tipo de componente
   - Enrutamiento de solicitudes y manejo de métodos HTTP
   - Procesamiento de parámetros de URL

2. **Capa de controladores** (`src/controllers/`):
   - Manejo de solicitudes/respuestas
   - Validación y saneamiento de entrada
   - Coordinación de lógica de negocio
   - Formateo de respuestas de error

3. **Capa de servicios** (`src/services/`):
   - Implementación de lógica de negocio
   - Operaciones de base de datos vía Sequelize
   - Transformación y procesamiento de datos
   - Manejo de consultas complejas

4. **Capa de modelos** (`src/models/sequelize/`):
   - Definición de esquemas de base de datos
   - Configuración de modelos Sequelize
   - Relaciones y asociaciones de tablas
   - Reglas de validación de datos

5. **Capa de base de datos**:
   - Motor de base de datos PostgreSQL
   - Contenerización con Docker
   - Pooling y optimización de conexiones
   - Persistencia y recuperación de datos

**Flujo de datos:**
1. **Recepción de solicitud**: Express.js recibe las solicitudes HTTP
2. **Procesamiento de middleware**: CORS, logging y validación procesan la solicitud
3. **Enrutamiento**: El router de Express dirige la solicitud al endpoint adecuado
4. **Ejecución de controlador**: El controlador valida la entrada y llama al servicio correspondiente
5. **Procesamiento en servicios**: La capa de servicios maneja la lógica de negocio y operaciones de base de datos
6. **Generación de respuesta**: Se envía la respuesta formateada al cliente

**Tipos de componentes soportados:**
- **Componentes** (`componentes`): Información base (código, descripción, precio, stock)
- **Detalles de componente** (`componentes_detalles`): Especificaciones técnicas y hojas de datos
- **Transistores bipolares** (`transistores_bipolares`): Especificaciones y parámetros BJT
- **Transistores MOSFET** (`transistores_mosfet`): Características y ratings MOSFET
- **Capacitores electrolíticos** (`capacitores_electroliticos`): Especificaciones de capacitores

<br>

</details>

### 1.1) Ejecución del proyecto [🔝](#índice-)

<details>
   <summary>Ver</summary>
   <br>

#### 1.1.0) Configuración inicial

#### Prerrequisitos
Antes de comenzar, asegúrate de tener instalado lo siguiente:
- **Node.js** (v18 LTS o superior) - [Descargar aquí](https://nodejs.org/en/download)
- **Docker Desktop** - [Descargar aquí](https://www.docker.com/products/docker-desktop/)
- **Git** - [Descargar aquí](https://git-scm.com/downloads)
- **IDE** (VS Code recomendado) - [Descargar aquí](https://code.visualstudio.com/)

#### Paso 1: Clonar y preparar el proyecto

1. **Clona el repositorio:**
```bash
git clone https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS
```

2. **Navega al directorio del proyecto:**
```bash
cd ApiRest_Dispositivos_Electronicos_ExpressJS
```

3. **Instala las dependencias:**
```bash
npm install
```

#### Paso 2: Configuración de la base de datos

1. **Inicia la base de datos PostgreSQL con Docker:**
```bash
docker-compose up -d
```

2. **Verifica que el contenedor esté corriendo (opcional):**
```bash
docker ps
```

3. **Revisa los logs de la base de datos (opcional):**
```bash
docker-compose logs postgres
```

4. **Reinicia la base de datos si es necesario (opcional):**
```bash
docker-compose down -v
docker-compose up -d
```

#### Paso 3: Ejecutar la aplicación

**Modo desarrollo (con recarga automática):**
```bash
npm run start:dev
```

**Modo producción:**
```bash
npm start
```

**Comando alternativo de desarrollo:**
```bash
npm run dev
```

#### Paso 4: Verificar la instalación

1. **Verifica que el servidor esté corriendo:**
   - Busca: `Server is running on port 8082`
   - Busca: `Swagger documentation available at http://localhost:8082/api-docs`

2. **Accede a la aplicación:**
   - **URL base de la API**: `http://localhost:8082`
   - **Documentación Swagger**: `http://localhost:8082/api-docs`
   - **Health Check**: `http://localhost:8082/api/v1/health`

#### Solución de problemas

**Puerto en uso:**
```bash
# Matar procesos usando el puerto 8082
npx kill-port 8082

# O encontrar y matar el proceso específico
netstat -ano | findstr :8082
taskkill /PID <PID> /F
```

**Problemas de conexión a la base de datos:**
```bash
# Verifica si Docker está corriendo
docker --version

# Verifica el estado del contenedor
docker-compose ps

# Reinicia los contenedores
docker-compose restart

# Ver logs detallados
docker-compose logs postgres
```

**Problemas de versión de Node.js:**
```bash
# Verifica la versión de Node.js
node --version

# Usa nvm para cambiar de versión (si está instalado)
nvm use 18
```

**Problemas de permisos (Linux/Mac):**
```bash
# Corrige permisos de Docker
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a entrar
```

#### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en producción |
| `npm run start:dev` | Inicia el servidor en desarrollo con recarga automática |
| `npm run dev` | Comando alternativo de desarrollo |
| `npm test` | Ejecuta todas las pruebas |
| `npm run test:watch` | Ejecuta pruebas en modo watch |
| `npm run test:cov` | Ejecuta pruebas con cobertura |
| `npm run test:unit` | Ejecuta solo pruebas unitarias |
| `npm run test:integration` | Ejecuta solo pruebas de integración |
| `npm run format-prettier` | Formatea el código con Prettier |
| `npm run check` | Verifica el formato markdown |

<br>

</details>

### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
   <summary>Ver</summary>
  <br>

#### 1.2.0) Configuración inicial

Esta sección te guía para configurar el proyecto desde cero, incluyendo todas las dependencias, estructura y configuración.

#### Prerrequisitos
- **Node.js** (v18 LTS o superior) - [Descargar aquí](https://nodejs.org/en/download)
- **Docker Desktop** - [Descargar aquí](https://www.docker.com/products/docker-desktop/)
- **Git** - [Descargar aquí](https://git-scm.com/downloads)
- **IDE** (VS Code recomendado) - [Descargar aquí](https://code.visualstudio.com/)

#### Paso 1: Inicialización del proyecto

1. **Crea el directorio del proyecto:**
```bash
mkdir ApiRest_Dispositivos_Electronicos_ExpressJS
cd ApiRest_Dispositivos_Electronicos_ExpressJS
```

2. **Inicializa el proyecto Node.js:**
```bash
npm init -y
```

3. **Crea la estructura del proyecto:**
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

#### Paso 2: Instalación de dependencias principales

1. **Instala dependencias de producción:**
```bash
# Framework y middleware principal
npm install express cors morgan dotenv dotenv-expand

# Base de datos y ORM
npm install sequelize pg pg-hstore

# Documentación API
npm install swagger-ui-express swagger-jsdoc

# Logging
npm install winston

# Parseo de body
npm install body-parser
```

2. **Instala dependencias de desarrollo:**
```bash
# Servidor de desarrollo
npm install --save-dev nodemon

# Framework de testing
npm install --save-dev jest supertest

# Formateo y linting
npm install --save-dev prettier

# Linting de markdown
npm install --save-dev remark-cli remark-preset-lint-recommended remark-lint-emphasis-marker remark-lint-strong-marker remark-lint-table-cell-padding remark-preset-lint-consistent

# Validación
npm install --save-dev express-validator

# Utilidades
npm install --save-dev express-list-endpoints sqlite3
```

#### Paso 3: Archivos de configuración

1. **Crea .gitignore:**
```bash
# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Variables de entorno
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Datos de runtime
pids
*.pid
*.seed
*.pid.lock

# Cobertura de herramientas como istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Directorios de dependencias
node_modules/
jspm_packages/

# Cache opcional de npm
.npm

# Historial REPL opcional
.node_repl_history

# Salida de 'npm pack'
*.tgz

# Archivo de integridad de Yarn
.yarn-integrity

# Archivos de entorno dotenv
.env

# Archivos de IDE
.vscode/
.idea/
*.swp
*.swo

# Archivos generados por el SO
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Reportes de test
test-report.json
```

2. **Agrega scripts a package.json:**
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

#### Paso 4: Configuración de la base de datos

1. **Crea docker-compose.yml:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: dispositivos_electronicos_db
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

2. **Crea el archivo .env:**
```env
# Configuración de base de datos
DB_NAME_PROD=dispositivos_electronicos
DB_USER_PROD=dispositivos_user
DB_PASS_PROD=dispositivos_pass
DB_HOST_PROD=localhost
DB_DIALECT_PROD=postgres
DB_PORT_PROD=5432

# Configuración de la aplicación
PROD_PORT=8082
APP_PORT=8082

# Endpoints de la API
API_LOCAL_BASE_URL=http://localhost:8082
API_COMPONENT_NAME_URL=/api/v1/componentes
API_COMPONENT_DETAIL_NAME_URL=/api/v1/componentes-detalles
API_BIPOLAR_TRANSISTOR_NAME_URL=/api/v1/transistores-bipolares
API_ELECTROLYTIC_CAPACITOR_NAME_URL=/api/v1/capacitores-electroliticos
```

#### Paso 5: Archivos principales de la aplicación

1. **Crea src/server.js:**
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
    console.log(`Error en la función run(): ${error}`);
  }
};

run();
```

2. **Crea la configuración de Jest (jest.config.js):**
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

#### Paso 6: Iniciar desarrollo

1. **Inicia la base de datos:**
```bash
docker-compose up -d
```

2. **Ejecuta la aplicación:**
```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm start
```

3. **Ejecuta pruebas:**
```bash
# Todas las pruebas
npm test

# Solo pruebas unitarias
npm run test:unit

# Solo pruebas de integración
npm run test:integration

# Con cobertura
npm run test:cov
```

#### Paso 7: Configuración adicional

1. **Crea README.md con la documentación del proyecto**
2. **Configura la colección de Postman para pruebas de la API**
3. **Configura VS Code para desarrollo consistente**
4. **Configura pipeline CI/CD (opcional)**

#### Estructura general del proyecto

```
ApiRest_Dispositivos_Electronicos_ExpressJS/
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

Esta estructura provee una base escalable y mantenible para el proyecto de API de dispositivos electrónicos.

<br>

</details>

### 2.0) Pruebas y documentación

<details>
   <summary>Ver</summary>
   <br>

Este proyecto incluye una suite completa de pruebas con pruebas unitarias e integración para asegurar la calidad y confiabilidad del código.

**Framework de pruebas:** Jest con Supertest para pruebas de API
**Cobertura:** >90% de cobertura de código
**Tipos de prueba:** Pruebas unitarias, pruebas de integración, pruebas de validación

### 2.0.1) Documentación Swagger

- **Swagger UI**: Accede a la documentación interactiva de la API en `http://localhost:8082/api-docs`
- **Definición OpenAPI**: El archivo de configuración Swagger se encuentra en `src/utils/swagger.js`

</details>

## Sección 3) Endpoints y ejemplos

### 3.0) Endpoints y ejemplos [🔝](#índice-)

<details>
   <summary>Ver</summary>
   <br>

#### 3.0.0) Endpoints y ejemplos

- **Componentes** (`componentes`):
  - **GET**: `http://localhost:8082/api/v1/componentes`
  - **POST**: `http://localhost:8082/api/v1/componentes`
  - **PUT**: `http://localhost:8082/api/v1/componentes/:id`
  - **DELETE**: `http://localhost:8082/api/v1/componentes/:id`

- **Detalles de componente** (`componentes_detalles`):
  - **GET**: `http://localhost:8082/api/v1/componentes-detalles`
  - **POST**: `http://localhost:8082/api/v1/componentes-detalles`
  - **PUT**: `http://localhost:8082/api/v1/componentes-detalles/:id`
  - **DELETE**: `http://localhost:8082/api/v1/componentes-detalles/:id`

- **Transistores bipolares** (`transistores_bipolares`):
  - **GET**: `http://localhost:8082/api/v1/transistores-bipolares`
  - **POST**: `http://localhost:8082/api/v1/transistores-bipolares`
  - **PUT**: `http://localhost:8082/api/v1/transistores-bipolares/:id`
  - **DELETE**: `http://localhost:8082/api/v1/transistores-bipolares/:id`

- **Transistores MOSFET** (`transistores_mosfet`):
  - **GET**: `http://localhost:8082/api/v1/transistores-mosfet`
  - **POST**: `http://localhost:8082/api/v1/transistores-mosfet`
  - **PUT**: `http://localhost:8082/api/v1/transistores-mosfet/:id`
  - **DELETE**: `http://localhost:8082/api/v1/transistores-mosfet/:id`

- **Capacitores electrolíticos** (`capacitores_electroliticos`):
  - **GET**: `http://localhost:8082/api/v1/capacitores-electroliticos`
  - **POST**: `http://localhost:8082/api/v1/capacitores-electroliticos`
  - **PUT**: `http://localhost:8082/api/v1/capacitores-electroliticos/:id`
  - **DELETE**: `http://localhost:8082/api/v1/capacitores-electroliticos/:id`

<br>

</details>

## Sección 4) Pruebas de funcionalidad y referencias

### 4.0) Pruebas de funcionalidad y referencias [🔝](#índice-)

<details>
   <summary>Ver</summary>
   <br>

#### 4.0.0) Pruebas de funcionalidad

- **Pruebas unitarias**: Pruebas individuales para cada componente
- **Pruebas de integración**: Pruebas que verifican la interacción entre componentes
- **Pruebas de sistema**: Pruebas que verifican la funcionalidad completa del sistema

#### 4.0.1) Referencias

- **Documentación**: Swagger para documentación interactiva
- **Postman**: Colección de Postman para pruebas de la API
- **Video tutoriales**: [Playlist de pruebas de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurDLAizKGgiChAKBJx1V19Fo)

<br>

</details>

### 4.1) Colección de Postman [🔝](#índice-)

<details>
   <summary>Ver</summary>
   <br>

#### 4.1.0) Colección de Postman

Una colección completa de Postman está incluida en este proyecto para facilitar las pruebas y desarrollo de la API. La colección contiene solicitudes pre-configuradas para todos los endpoints de la API con headers apropiados, ejemplos de body y variables de entorno.

**Ubicación de la colección:**
- **Archivo**: `postman/collections/Api_DispElectr_Express.postman_collection.json`
- **Tamaño**: ~481KB con más de 11,000 líneas de configuración
- **Cobertura**: Cobertura completa de la API para todos los endpoints

**Características principales:**
- **Cobertura completa de la API**: CRUD, búsqueda y paginación para todos los componentes
- **Configuración pre-establecida**: Variables de entorno, headers y ejemplos de body
- **Capacidades de prueba**: Validación de respuestas, pruebas de error y paginación

<br>

</details>

### 5.0) Arquitectura del proyecto

<details>
   <summary>Ver</summary>
   <br>

### 5.0.0) Diagrama de arquitectura

El siguiente diagrama ilustra la arquitectura general del proyecto:

```mermaid
graph TD;
  A[Cliente/Frontend/Postman/Swagger] -->|HTTP| B(Express.js API)
  B --> C[Middleware (CORS, Logger, Validaciones)]
  C --> D[Controladores]
  D --> E[Servicios]
  E --> F[Modelos Sequelize]
  F --> G[(Base de datos PostgreSQL)]
```

El diagrama está disponible como imagen en la carpeta `doc/assets/` y puede ser visualizado en la documentación del proyecto.

</details>

### 6.0) Créditos y licencia

<details>
   <summary>Ver</summary>
   <br>

### 6.0.0) Créditos

- Desarrollador principal: **Andrés Weitzel**
- Repositorio de la base de datos: [db_dispositivos_electronicos_postgreSQL](https://github.com/andresWeitzel/db_dispositivos_electronicos_postgreSQL)
- Íconos y recursos visuales: [Simple Icons](https://simpleicons.org/), [SVG Repo](https://www.svgrepo.com/)

### 6.0.1) Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

</details>
