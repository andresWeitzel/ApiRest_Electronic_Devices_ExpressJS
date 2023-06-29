

![Index app](./doc/assets/CRUD_Bucket_s3.drawio.png)

# ApiRest_Dispositivos_Electronicos_ExpressJS
Api Rest acerca de dispositivos electrónicos implementado con Express, NodeJS, Sequelize, PostgreSQL, otros..
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

#### 1.1.1) Docker para Windows 10/11 (64 bits).
* Descargamos e instalamos el JDK de [Java > 8.x](https://www.java.com/es/download/ie_manual.jsp) para poder implementar docker.
* Descargamos [Docker (para windows)](https://docs.docker.com/desktop/install/windows-install/).
* Abrimos una PS como admin y habilitamos el subsistema de linux :
   ```cmd
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```
* Habilitamos las funciones de la máquina virtual :
   ```cmd
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
* Descargamos el paquete de actualización del [kernel WSL2 Linux](https://learn.microsoft.com/it-it/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package).
* Ejecutamos e instalamos dicho paquete..siguiente..siguiente.
* Establecemos WSL 2 como la versión predeterminada para Docker :
   ```cmd
   wsl --set-default-version 2
   ```
* Por último instalamos docker:
   * Ejecutamos el .exe "Docker Desktop Installer".
   * Cuando se abra el .exe dejamos selecionado "Use WSL2 instead of Hyper-V".
   * Seguidamente ok, sig., etc y esperamos que finalice la instalación.
   * Abrir la app y comprobar el correcto funcionamiento.
* ***IMPORTANTE*** : Es necesario reiniciar el sistema para que el mismo tome los cambios del Kernel WSL2 correctamente.

#### 1.1.2) Configuración de contenedores de docker
#### Contenedor RabbitMQ
* Descargamos la imagen de rabbitmq desde los repositorios centrales de docker (La config de docker está como variable de entorno, podemos decargar imagenes en cualquier directorio)
```git
docker pull rabbitmq:3-management
```
* Creamos el contenedor con las configuraciones declaradas (La config de docker está como variable de entorno, podemos crear contenedores desde cualquier directorio)
```git
docker run --name rabbitmq --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```
* Seguidamente deberíamos tener el container corriendo desde docker desktop
 
 
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
* Instalamos los plugins para sequelize
```git
npm i sequelize
```
* Instalamos los plugins para postgreSQL
```git
npm i pg pg-hstore
```
* Instalamos los plugins para [express](https://www.npmjs.com/package/express)
```git
npm i express
```



#### 1.2.1) Docker para Windows 10/11 (64 bits).
* Descargamos e instalamos el JDK de [Java > 8.x](https://www.java.com/es/download/ie_manual.jsp) para poder implementar docker.
* Descargamos [Docker (para windows)](https://docs.docker.com/desktop/install/windows-install/).
* Abrimos una PS como admin y habilitamos el subsistema de linux :
   ```cmd
   dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
   ```
* Habilitamos las funciones de la máquina virtual :
   ```cmd
   dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
   ```
* Descargamos el paquete de actualización del [kernel WSL2 Linux](https://learn.microsoft.com/it-it/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package).
* Ejecutamos e instalamos dicho paquete..siguiente..siguiente.
* Establecemos WSL 2 como la versión predeterminada para Docker :
   ```cmd
   wsl --set-default-version 2
   ```
* Por último instalamos docker:
   * Ejecutamos el .exe "Docker Desktop Installer".
   * Cuando se abra el .exe dejamos selecionado "Use WSL2 instead of Hyper-V".
   * Seguidamente ok, sig., etc y esperamos que finalice la instalación.
   * Abrir la app y comprobar el correcto funcionamiento.
* ***IMPORTANTE*** : Es necesario reiniciar el sistema para que el mismo tome los cambios del Kernel WSL2 correctamente.

#### 1.2.2) Configuración de contenedores de docker
#### Contenedor RabbitMQ
* Descargamos la imagen de rabbitmq desde los repositorios centrales de docker (La config de docker está como variable de entorno, podemos decargar imagenes en cualquier directorio)
```git
docker pull rabbitmq:3-management
```
* Creamos el contenedor con las configuraciones declaradas (La config de docker está como variable de entorno, podemos crear contenedores desde cualquier directorio)
```git
docker run --name rabbitmq --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```
* Seguidamente deberíamos tener el container corriendo desde docker desktop

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

#### Sequelize soc
* [PostgreSQL con Sequelize](https://www.makeuseof.com/use-postgresql-with-sequelize-in-nodejs/)

<br>

</details>
