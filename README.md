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

Rest Api about electronic devices implemented with express, morgan-middleware, nodeJS, sequelize, dotenv, cors, express-validator, nodemon, swagger, swagger-ui, postgreSQL, others.

*   [Database repository](https://github.com/andresWeitzel/db_dispositives_electronicos_postgreSQL)
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
*   [1.3) Technologies.](#13-technologies-)

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

*   We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download).
*   We install all the necessary libraries

```git
npm i
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

### 1.3) Technologies [🔝](#index-)

<details>
   <summary>View</summary>
  <br>

| **Technologies** | **Version** | **Purpose** |
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2 | Automatic Module Injection for Lambdas |
| [NodeJS](https://nodejs.org/en/) | 14.18.1 | JS Library |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2 | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11 | Http Client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Command Prompt for command line |
| [Git](https://git-scm.com/downloads) | 2.29.1 | Version Control |

</br>

| **Plugin** | **Description** |
| ------------- | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Libraries for Modular Definition |

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

<br>

</details>
