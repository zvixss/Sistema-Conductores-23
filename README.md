# ConduceFácil: Sistema de Gestión de Exámenes de Conductores - Entrega Parcial 2

Este repositorio contiene el código fuente correspondiente a la **Entrega Parcial 2** del proyecto para la asignatura de Ingeniería Web y Móvil (ICI 4247). 

El sistema permite la gestión y el agendamiento de horas para exámenes de conducir, conectando una interfaz desarrollada en Ionic/React con una API RESTful en Node.js, y utilizando MySQL como motor de base de datos.

### 👥 Integrantes del Equipo
* Vicente Aburto Falcón
* Alexander Parada Silva

---

## 📁 Estructura del Proyecto

El repositorio está compuesto por dos directorios principales que funcionan de manera independiente:

* `/backend`: Contiene la lógica del servidor (Node.js + Express), enrutamiento de la API, controladores, validaciones de concurrencia y seguridad (JWT y bcrypt).
* `/appWeb`: Contiene el frontend de la aplicación web construido con Ionic, React y TypeScript, incluyendo el manejo del mapa interactivo y el consumo de la API.

---

## 🚀 Guía de Instalación y Ejecución Local

Para levantar el entorno completo en una máquina local, se requiere tener instalado **XAMPP** y **Node.js**.

### 1. Configuración de la Base de Datos (XAMPP)
1. Abre el panel de control de **XAMPP** y enciende los módulos de **Apache** y **MySQL**.
2. Haz clic en el botón **"Admin"** de MySQL en el panel de XAMPP para abrir phpMyAdmin en tu navegador.
3. Crea una nueva base de datos y nómbrala exactamente como: `conducefacil`.
4. Haz clic sobre la base de datos recién creada, ve a la pestaña superior **"Importar"** y sube el archivo `.sql` de respaldo (incluido en este repositorio). Esto generará e importará automáticamente todas las tablas requeridas (`examenes`, `licencias`, `municipalidades`, `notificaciones`, `usuarios`).

### 2. Levantar el Backend (API REST)
Abre una terminal en tu editor de código, ingresa a la carpeta del backend, instala las dependencias necesarias y enciende el servidor:

```bash
cd backend
npm install
node src/server.js
```
*(El terminal indicará que el servidor se encuentra escuchando en el puerto 3000).*

### 3. Levantar el Frontend (Aplicación Web)
Abre una **nueva terminal** (dejando la del backend en ejecución), ingresa a la carpeta del frontend, instala los paquetes de Node y arranca la aplicación:

```bash
cd appWeb
npm install
npm run dev
```
*(La aplicación se abrirá en tu navegador web predeterminado).*

---

## 📦 Dependencias y Librerías del Sistema

El proyecto gestiona sus paquetes a través de NPM. Al ejecutar `npm install` en los respectivos directorios, se instalarán las siguientes dependencias principales listadas en los `package.json`:

### Dependencias del Backend (`/backend`)
* `express` (v4.x): Framework principal para montar el servidor y la API REST.
* `mysql2`: Driver para establecer la conexión asíncrona con el motor de base de datos de XAMPP.
* `bcrypt`: Librería criptográfica para el hasheo y validación segura de las contraseñas de los usuarios.
* `jsonwebtoken` (JWT): Para la generación y validación de tokens de sesión, permitiendo proteger las rutas privadas.
* `cors`: Middleware habilitado para permitir peticiones HTTP cruzadas desde el frontend.
* `nodemon` (Dependencia de desarrollo): Para el reinicio automático del servidor en fase de pruebas.

### Dependencias del Frontend (`/appWeb`)
* `@ionic/react` y `@ionic/react-router`: Componentes base de la interfaz móvil/web y sistema de navegación.
* `react` y `react-dom`: Core para la construcción de interfaces estructuradas.
* `react-zoom-pan-pinch`: Herramienta implementada para la manipulación, zoom y paneo del mapa interactivo de sedes municipales.
* `ionicons`: Paquete oficial de iconografía de Ionic para la interfaz de usuario.

---

## 🧪 Pruebas Funcionales y API (Postman)

Para cumplir con el requerimiento de validación de endpoints, se incluye en el repositorio la colección exportada de pruebas funcionales para Postman. 

Para revisar el correcto funcionamiento de las rutas protegidas, importa la colección en Postman y ejecuta las peticiones en el siguiente orden:

1. **Login de Usuario (`POST /api/auth/login`):**
   * **Body (JSON):** `{"identificador": "test@gmail.com", "password": "tu_clave_aqui"}`
   * Verifica el hash de la contraseña en la base de datos y retorna el Token JWT de sesión con un código `200 OK`.

     <img width="1151" height="718" alt="image" src="https://github.com/user-attachments/assets/3e3a5342-32fa-4011-bb5c-2823c9e4903b" />

2. **Listar Municipalidades (`GET /api/examenes/municipalidades`):**
   * **Autorización:** Requiere configurar la pestaña *Authorization* seleccionando *Bearer Token* e ingresando el token obtenido en el login.
   * Retorna la lista completa de las sedes municipales habilitadas (`200 OK`).

     <img width="1147" height="709" alt="image" src="https://github.com/user-attachments/assets/013864cb-19ac-47ec-b7e3-7f5dd3c335ec" />

3. **Agendar Examen (`POST /api/examenes/agendar`):**
   * **Autorización:** Requiere *Bearer Token*.
   * **Body (JSON):** `{"tipo_examen": "Primera Licencia Clase B", "fecha": "2026-06-20", "hora": "10:00:00", "id_municipalidad": 10}`
   * Valida la disponibilidad del horario. Si es exitoso, inserta el examen en la base de datos y retorna un código `201 Created`.
  
     <img width="1146" height="714" alt="image" src="https://github.com/user-attachments/assets/806caf37-487b-4ad5-9a96-592bcd51870a" />


---

## 🛠️ Tecnologías y Librerías Utilizadas
* **Frontend (`appWeb`):** Ionic v7, React, TypeScript, React Router DOM, Vite, `react-zoom-pan-pinch`.
* **Backend (`backend`):** Node.js, Express.js.
* **Persistencia:** MySQL (vía XAMPP) usando el driver `mysql2`.
* **Seguridad:** `jsonwebtoken` para el control de acceso y `bcrypt` para el encriptado de credenciales.
