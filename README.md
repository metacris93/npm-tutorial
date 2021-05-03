 # Gestión de paquetes NPM
NPM es el gestor de paquetes para Node JS.
## Contenido
<!--ts-->
- [Instalacion de NPM en MAC OS](#instalacion-de-npm-en-mac-os)
- [Comandos Basicos](#comandos-basicos)
- [Instalacion De Paquetes](#instalacion-de-paquetes)
- [Actualizacion De Paquetes](#actualizacion-de-paquetes)
- [Eliminacion De Paquetes](#eliminacion-de-paquetes)
- [Package.json y el uso de los simbolos](#package-json-y-el-uso-de-los-simbolos)
- [Dependencias no estan correctamente instaladas](#dependencias-no-estan-correctamente-instaladas)
- [Seguridad en los paquetes NPM](#seguridad-en-los-paquetes-npm)
- [Crear un paquete para NPM](#crear-un-paquete-para-npm)
- [Publicar un paquete NPM](#publicar-un-paquete-npm)
<!--ts-->

Instalacion de Npm en Mac Os
--------------------------
Para tener la última versión de NPM.
```sh
sudo npm install npm@latest -g
```
Para verificar la versión instalada hacemos lo siguiente:
```sh
npm -v
```
Comandos Basicos
--------------------------
Para iniciar un proyecto utilizamos cualquiera de los siguientes comandos:
```sh
npm init
npm init -y
```
Se nos va a crear un archivo package.json con toda la información de nuestro proyecto.

Si queremos asignar datos como nuestro correo, nombre y la licencia en nuestros proyectos, hacemos lo siguiente:
```sh
npm set init.author.email "my_email"
npm set init.author.name "my_name"
npm set init.author.license "my_license"
```
Instalacion De Paquetes
--------------------------
La estructura del comando para instalar un paquete es el siguiente:
```sh
npm install <paquete> <flag>
```
* <paquete> - Nombre del paquete.
* <flag> - Existen varios tipos de flag:
> -D  - `npm install paquete -D` (el paquete a instalar es una dependencia de desarrollo).
> -S  - `npm install paquete -S` (dependencia que forma parte del proyecto).
> -O  - `npm install paquete -O` (dependencia opcional).
> --dry-run  - `npm paquete react --dry-run` (simula que va a instalar un paquete, solo muestra el output pero no lo instala, el objetivo de esto es para saber que dependencias de esa librería se van a instalar).
> -f - `npm install paquete -f` (va a forzar la instalación).
> -g - `sudo npm install -g paquete` (realiza una instalación global de ese paquete, no lo hace a nivel de nuestro proyecto)

Para instalar todas las dependencias del proyecto:
> `npm install` (vuelve a instalar las dependencias)
> `npm install paquete@0.15.0` (instala el paquete en su versión 0.15.0)

Actualizacion De Paquetes
--------------------------
1) Para revisar que paquetes disponen de nuevas versiones escribimos lo siguiente: `npm outdate`.
2) Para tener una visualización de lo que ocurre en el punto 1) escribimos: `npm outdate --dd`.
3) Para actualizar los paquetes que no están en la ultima versión escribimos: `npm update`.
4) Para actualizar un paquete especifico`npm install paquete@latest`.

Eliminacion De Paquetes
--------------------------
1) Para eliminar un paquete de `node_modules` y del archivo package.json: `npm uninstall paquete`.
2) Para desinstalar un paquete de todo `node_modules` pero no del archivo package.json: `npm uninstall paquete --no-save`.

Package json y el uso de los simbolos
--------------------------
En los parámetros de dependencias de nuestro archivo package.json vamos a encontrar que las versiones de las librerías empiezan con cualquiera de los siguientes caracteres `^` `~`, ¿qué significa esto?.
- ^ = Conocido como caret, si lo mantenemos dentro de la configuración de nuestro package estamos garantizando que cuando realicemos una actualización `(utilizando el comando npm)`, vamos a descargar los cambios menores, parches y bug fixes.
- ~ = Establece que vamos a recibir actualizaciones que son parches o bug fixes.
- Si alguna de las dependencias pierde compatibilidad con nuestro proyecto por realizar una actualización y queremos trabajar con una sola versión, borramos ese caracter que está al principio.

Dependencias no estan correctamente instaladas
--------------------------
Si llega a darse el caso en que las dependencias del proyecto no están instalados correctamente, podemos hacer lo siguiente:
```sh
npm cache clear --force
#Para verificar que verdaderamente se borro podemos usar
npm cache verify
```
Podemos eliminar el paquete con el siguiente comando:
```sh
rm -rf node_modules  #este comando elimina la carpeta node_modules
```
Existe un paquete en NPM que se ecnarga de borrar de forma segura la carpeta `node_modules`, ese paquete se llama `rimraf`.
```sh
sudo npm install -g rimraf
```
Ahora podemos ejecutar el siguiente comando para eliminar node_module
```sh
rimraf node_modules
#Ahora podemos volver a instalar nuestro paquetes
npm install
```
Seguridad en los paquetes NPM
--------------------------
Para revisar las vulnerabilidades de nuestro proyecto utilizamos el siguiente comando:
`npm audit fix`
Si esto no soluciona, lo que hay que hacer es ir actualizando las dependencias con `npm update`.

Crear un paquete para NPM
--------------------------
Cuando nuestro proyecto esté listo, debemos realizar algunos pasos adicionales para que pueda ser utilizado.
En el directorio raíz de nuestro proyecto creamos la carpeta bin y dentro de esa carpeta el archivo `global.js`.
```js
#!/usr/bin/env node
//Variable que llama la funcion que exportamos
let random = require('../src/index.js');
//Ejecuto la funcion
random.randomMsg();
```
Modificamos el package.json y colocamos la configuración del bin.
```
  "bin": {
    "random-msg": "./bin/global.js"
  },
  "preferGlobal": true
```
Publicar un paquete NPM
--------------------------
1) Para publicar nuestro paquete al repositorio de NPM, debemos probar de forma local.
> `sudo npm link` hace una referencia a ese paquete

2) Realizar una instalación global o local:
> `sudo npm install -g ~/user/documents/paquete/`
o
> `sudo npm install -S ~/user/documents/paquete/`

3) Crear una cuenta para poder subir el paquete - https://www.npmjs.com/
4) Verificar la cuenta que llega al correo electrónico registrado.
5) Loguearse en la cuenta desde la consola usando el siguiente comando:
> `npm adduser`
6) Estar seguro que el nombre de nuestro paquete no esté repetido, porque va a devolver un error 403.
7) el nombre de nuestro paquete lo van a encontrar en el campo `name` del archivo package.json. El comando a utilizar para subir el paquete es:
> `npm publish`
