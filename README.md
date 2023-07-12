

![Index app](./doc/assets/CRUD_Bucket_s3.drawio.png)

# ApiRest_Dispositivos_Electronicos_ExpressJS
Api Rest acerca de dispositivos electrónicos implementado con Express, NodeJS, Sequelize, dotenv, cors, swagger, swagger-ui, PostgreSQL, otros.

* [Repositorio base de datos](https://github.com/andresWeitzel/db_dispositivos_electronicos_postgreSQL)


<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1)  Descripción, configuración y tecnologías

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)


### Sección 2) Endpoints y Ejemplos 
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)

### Sección 3) Prueba de funcionalidad y Referencias
 
 - [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
 - [3.1) Referencias.](#31-referencias-)


<br>

</details>



<br>

## Sección 1)  Descripción, configuración y tecnologías


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 <br>

### 1.0.0) Descripción General

  *  

 
 ### 1.0.1) Descripción Arquitectura y Funcionamiento
 
 * 

<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
  <br>
 
#### 1.1.0) Configuraciones iniciales
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download).
* Instalamos todas las librerías necesarias
```git
npm i
```

 
<br>

</details>


### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>
 
#### 1.2.0) Configuraciones iniciales
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/ApiRest_Dispositivos_Electronicos_ExpressJS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Abrimos una terminal desde vsc
* Inicializamos un proyecto nodejs
```git
npm init
```
* Creamos un archivo .gitignore y agregamos los files necesarios (por el momento node_modules)
```git
node_modules
```
* Creamos un direct source (src) para agregar toda la lógica de nuestra app
* Instalamos el plugin para sequelize
```git
npm i sequelize
```
* Instalamos los plugins para postgreSQL
```git
npm i pg pg-hstore
```
* Instalamos el plugin para [express](https://www.npmjs.com/package/express)
```git
npm i express
```
* Instalamos el plugin para [cors](https://www.npmjs.com/package/cors)
```git
npm i cors
```
* Instalamos el plugin para [dotenv](https://www.npmjs.com/package/dotenv)
```git
npm i dotenv
```
* Instalamos los plugins para el uso de [swagger](https://www.google.com.ar/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjKhYbuxO7_AhWcqpUCHZX1DGIQFnoECBAQAQ&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fswagger-ui-express&usg=AOvVaw298jcT8gyPCXrfFgV1z8o6&opi=89978449)
```git
npm i swagger-ui-express swagger-jsdoc
```



<br>

</details>


### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>

| **Tecnologías** | **Versión** | **Finalidad** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |

</br>


| **Plugin** | **Descripción** |               
| -------------  | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Librerías para la Definición Modular |

</br>


| **Extensión** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |

<br>

</details>


<br>


## Sección 2) Endpoints y Ejemplos. 


### 2.0) Endpoints y recursos [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>


<br>

</details>

<br>


## Sección 3) Prueba de funcionalidad y Referencias. 


### 3.0) Prueba de funcionalidad [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>


</details>


### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 <br>

#### Sequelize con PostgreSQL 
* [PostgreSQL con Sequelize](https://www.makeuseof.com/use-postgresql-with-sequelize-in-nodejs/)

#### Swagger y Nodejs
* [Automatically Generate Swagger Docs With ExpressJS & NodeJS](https://www.youtube.com/watch?v=5aryMKiBEKY)
* [Repositorio de ejemplo](https://github.com/TomDoesTech/REST-API-Tutorial-Updated/tree/main)

#### Videotutoriales
* [Ejemplificación Creación de Api Rest](https://www.youtube.com/watch?v=tpso18ghda4)

#### Ejemplos de código
* [Ejemplo de microservicio usando Sequelize, Mysql y NodeJS](https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS)

<br>

</details>
