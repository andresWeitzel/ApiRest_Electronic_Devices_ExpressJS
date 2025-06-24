![Index app](https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS/blob/master/doc/assets/componentes-example.png)

<div align="right">
     <a href="https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS/blob/master/translations/README.es.md" target="_blank">
       <img src="https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS/blob/master/doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
   </a>
    <a href="https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS/blob/master/README.md" target="_blank">
       <img src="https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS/blob/master/doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
   </a>
</div>

<div align="center">

# ApiRest\_Electronic\_Devices\_ExpressJS

</div>

Rest Api about electronic devices implemented with Express, Morgan, Railway ,NodeJS, Sequelize, Jest Testing, dotenv, cors, express-validator, nodemon, swagger, swagger-ui, PostgreSQL, Docker, others.

*   [Database repository](https://github.com/andresWeitzel/db_dispositivos_electronicos_postgreSQL)
*   [Functionality Test Playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDLAizKGgiChAKBJx1V19Fo)<a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDLAizKGgiChAKBJx1V19Fo" target="_blank" > <img src="https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS/blob/master/doc/assets/social-networks/yt.png" width="5%" height="5%" /> </a>

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

### Section 2) Endpoints and Examples

*   [2.0) EndPoints and resources.](#20-endpoints-and-resources-)

### Section 3) Functionality Testing and References

*   [3.0) Functionality test.](#30-functionality-test-)
*   [3.1) References.](#31-references-)

<br>

</details>

<br>

## Section 1) Description, configuration and technologies

### 1.0) Description [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

### 1.0.0) General Description

*

### 1.0.1) Description Architecture and Operation

*

<br>

</details>

### 1.1) Project Execution [🔝](#index-)

<details>
   <summary>View</summary>
   <br>

#### 1.1.0) Initial settings

*   Once a work environment has been created through some IDE, we clone the project

```git
git clone https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS
```

*   We position ourselves on the project

```git
cd 'projectName'
```

*   We install the LTS version of [Nodejs(v18)](https://nodejs.org/en/download).
*   We install all the necessary libraries

```git
npm i
```

*   `Important` : Make sure Docker are installed on your system (for Windows, use [Docker Desktop]([https://nodejs.org/en/download]\(https://www.docker.com/products/docker-desktop/\)))

*   Start and build the MySQL database container:

```bash
docker-compose up -d
```

*   Verify the container is running:

```bash
docker ps
```

*   If you need to reset the database (optional) :

```bash
docker-compose down -v
docker-compose up -d
```


*   The environment variables used in the project are maintained to simplify their configuration process. It is recommended to add the corresponding file (.env) to the .gitignore.

* We run the app from a terminal for a local environment.

```git
npm run dev
```

*   We run the app from a terminal for a productive environment.

```git
npm start
```

*   If a message appears indicating that port 8080 is already in use, we can terminate all dependent processes and run the app again

```git
npx kill-port 8080
```

* We run the app from a terminal for a local environment.

```git
npm run dev
```

*   We run the app from a terminal for a productive environment.

```git
npm start
```

<br>

</details>

### 1.2) Project configuration from scratch [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

#### 1.2.0) Initial settings

*   Once a work environment has been created through some IDE, we clone the project

```git
git clone https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS
```

*   We position ourselves on the project

```git
cd 'projectName'
```

*   We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
*   We open a terminal from vsc
*   We initialize a nodejs project

```git
npm init -y
```

*   We create a .gitignore file and add the necessary files (for the moment node\_modules)

```git
node_modules
```

*   We create a direct source (src) to add all the logic of our app
*   We install the sequelize plugin

```git
npm i sequelize
```

*   We install the plugins for postgreSQL

```git
npm i pg pg-hstore
```

*   We install the plugin for [express (framework)](https://www.npmjs.com/package/express)

```git
npm i express
```

*   We install the plugin for [cors (resource management)](https://www.npmjs.com/package/cors)

```git
npm i cors
```

*   We install the plugin for [dotenv (environment variables)](https://www.npmjs.com/package/dotenv)

```git
npm i dotenv
```

*   We install the plugin for [morgan-middleware (errors, formats, etc)](https://expressjs.com/en/resources/middleware/morgan.html)

```git
npm i morgan
```

*   We install the plugin for [nodemon (autoreload server)](https://www.npmjs.com/package/nodemon) globally

```git
npm i -g nodemon
```

*   We install the plugin for [nodemon (autoreload server)](https://www.npmjs.com/package/nodemon) for development

```git
npm i nodemon --save-dev
```

*   We install the plugins for the use of \[swagger]\(https://www.google.com.ar/url?sa=t\&rct=j\&q=\&esrc=s\&source=web\&cd=\&cad=rja\&uact=8\&ved=2ahUKEwjKhYbuxO7\_AhWcqpUCHZX1DGIQFnoECBAQAQ\&url=https%3A% 2F%2Fwww.npmjs.com%2Fpackage%2Fswagger-ui-express\&usg=AOvVaw298jcT8gyPCXrfFgV1z8o6\&opi=89978449)

```git
npm i swagger-ui-express swagger-jsdoc
```

*   The environment variables used in the project are maintained to simplify their configuration process. It is recommended to add the corresponding file (.env) to the .gitignore.
*   The following script configured in the project's package.json is responsible for
    *   Raise the server with express (productive environment)
    *   Raise the server with express and nodemon (local dev environment)
    ```git
    "scripts": {
       "dev": "nodemon src/server.js",
       "start": "node src/server.js"
     },
    ```

<!---->

    * We run the app from a terminal for a local environment.
    ```git
    npm run dev

*   We run the app from a terminal for a productive environment.

```git
npm start
```

*   If a message appears indicating that port 8080 is already in use, we can terminate all dependent processes and run the app again

```git
npx kill-port 8080
npm run dev or npm start
```

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
*   **High Frequency Resistors** (`resistores_alta_frecuencia`): Resistor data
*   **Microcontrollers** (`microcontroladores_*`): Various microcontroller types
*   **Development Boards** (`placas_*`): Arduino, ESP8266, ESP32 boards

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
# ===========================================
# CONFIGURACIÓN DE BASE DE DATOS POSTGRESQL
# ===========================================

# Variables de producción (prioridad alta)
DB_NAME_PROD=dispositivos_electronicos
DB_USER_PROD=dispositivos_user
DB_PASS_PROD=dispositivos_pass
DB_HOST_PROD=localhost
DB_DIALECT_PROD=postgres
DB_PORT_PROD=5432

# Variables de desarrollo (prioridad baja)
DATABASE_NAME=dispositivos_electronicos
DATABASE_USER=dispositivos_user
DATABASE_PASSWORD=dispositivos_pass
DATABASE_HOST=localhost
DATABASE_DIALECT=postgres
DATABASE_PORT=5432

# Configuración del pool de conexiones
DB_POOL_MAX_PROD=10
DB_POOL_MIN_PROD=0
DB_POOL_ACQUIRE_PROD=30000
DB_POOL_IDLE_PROD=10000

DATABASE_POOL_MAX=10
DATABASE_POOL_MIN=0
DATABASE_POOL_ACQUIRE=30000
DATABASE_POOL_IDLE=10000

# ===========================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ===========================================

# Puerto de la aplicación
PROD_PORT=8082
APP_PORT=8082

# ===========================================
# CONFIGURACIÓN DE API ENDPOINTS
# ===========================================

API_LOCAL_BASE_URL=http://localhost:8082
API_COMPONENT_NAME_URL=/api/v1/componentes
API_COMPONENT_DETAIL_NAME_URL=/api/v1/componentes-detalles
API_BIPOLAR_TRANSISTOR_NAME_URL=/api/v1/transistores-bipolares

# ===========================================
# VARIABLES PARA TESTING
# ===========================================

MOCK_NUMBER_01=1212313
MOCK_BOOLEAN_01=true
MOCK_STRING_01=MOCK_STRING_01
MOCK_ID_NAME=id
MOCK_DATASHEET_NAME=hoja_de_datos
MOCK_VOLUME_NAME=volumen
MOCK_CODE_NAME=codigo
MOCK_NRO_PART_NAME=nro_pieza
MOCK_ORDER_AT_ASC_NAME=ASC
MOCK_ORDER_AT_DESC_NAME=DESC
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

## Section 2) Endpoints and Examples.

### 2.0) Endpoints and resources [🔝](#index-)

<details>
   <summary>View</summary>
<br>

<br>

</details>

<br>

## Section 3) Functionality Testing and References.

### 3.0) Functionality test [🔝](#index-)

<details>
   <summary>View</summary>
<br>

</details>

### 3.1) References [🔝](#index-)

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
