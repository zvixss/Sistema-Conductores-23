# 🚗 Sistema ConduceFácil: Plataforma Web de Gestión de Conductores y Licencias

ConduceFácil es una plataforma web integral diseñada para automatizar y optimizar la gestión de exámenes de conducción, el seguimiento de la obtención de licencias municipales y la emisión de recordatorios automatizados. El sistema ha sido construido bajo un enfoque de arquitectura de microservicios contenerizados, asegurando alta disponibilidad, modularidad y un estricto cumplimiento de estándares de seguridad informática y experiencia de usuario (UX/UI).

---

## 🏛️ Arquitectura de Software y Componentes

El ecosistema de ConduceFácil está compuesto por tres servicios o capas de software totalmente aislados pero intercomunicados dentro de una red interna virtualizada:

1. **Frontend (`/appWeb`):** Interfaz de usuario rica e interactiva implementada con **React.js** y **TypeScript**, utilizando el framework **Ionic**. La compilación se gestiona mediante **Vite** para optimizar los tiempos de carga.
2. **Backend (`/backend`):** API RESTful robusta construida sobre **Node.js** con el framework **Express.js**. Sigue un patrón arquitectónico MVC dividiendo el flujo en Rutas, Middlewares y Controladores.
3. **Base de Datos (`/database`):** Motor de base de datos relacional **MySQL 8.0**. La base de datos se inicializa y estructura automáticamente al montar el contenedor a partir del script principal (`conducefacil.sql`).

---

## 📊 Matriz de Cumplimiento de Requerimientos (Evaluación Formativa)

A continuación se desglosa cómo se implementaron los requerimientos exigidos en la rúbrica del proyecto:

### 🔹 EF 1: Funcionalidades Core, Almacenamiento y Notificaciones
* **CRUD de Exámenes:** El usuario dispone de control total sobre sus reservas permitiendo agendar, visualizar, reprogramar y cancelar citas.
* **Lógica de Negocio en Reprogramación:** Restricción lógica estricta que impide seleccionar fechas u horas pasadas. El modal precarga la fecha y hora agendada previamente para evitar errores.
* **Sistema de Alertas Dinámicas:** Autogeneración de recordatorios críticos evaluando fechas pendientes (alerta a los 7 días, 1 día antes y el día del examen).
* **Gestión de Notificaciones:** Capacidad del usuario para limpiar su bandeja eliminando el historial de notificaciones.
* **Persistencia de Sesión:** Uso de token JWT guardado en el `localStorage` del navegador.

### 🔹 EF 3: Seguridad Avanzada en la API
* **Protección contra Inyecciones SQL:** Las interacciones con la base de datos se realizan mediante consultas preparadas (`?`) nativas, neutralizando intentos de inyección.
* **Protección XSS y Cabeceras HTTP:** Integración de la librería **Helmet** en el servidor para inyectar cabeceras de seguridad que mitigan ataques Cross-Site Scripting y ocultan metadatos.
* **Políticas de CORS Seguro:** Lista blanca estricta que solo permite peticiones provenientes de los puertos de desarrollo autorizados del frontend (`http://localhost:5173` y `http://localhost:8100`).
* **Cifrado Criptográfico:** Contraseñas hasheadas de forma asimétrica utilizando **bcryptjs**.

### 🔹 EF 4: Control de Acceso Basado en Roles (RBAC)
* **Middlewares del Servidor:** Capas de protección en las rutas con `authMiddleware.js` (verifica validez del JWT) y `adminMiddleware.js` (comprueba que el rol sea estrictamente `'admin'`).
* **Protección de Rutas en el Frontend:** Uso del componente `<PrivateRoute />` que intercepta y redirige automáticamente al `/home` a cualquier usuario común que intente forzar la URL hacia el panel de administración.

### 🔹 EF 5: Integración con API Externa (Correos Reales)
* **Comprobantes Automatizados:** Integración con servicio de mensajería mediante la librería **Nodemailer**.
* **Disparadores de Eventos:** Envío de un correo electrónico real de confirmación/aviso ante acciones críticas sobre los exámenes (Agendar, Reprogramar o Cancelar).

### 🔹 EF 6: Despliegue Automatizado Mediante Contenedores (Docker)
* **Aislamiento Completo:** El proyecto prescinde de herramientas locales como XAMPP. Todo se ejecuta de forma aislada mediante contenedores Docker orquestados.

---

## 🚀 Guía de Instalación y Despliegue Local

El proyecto está completamente "Dockerizado". Siga estos pasos para levantar el entorno completo en su máquina local:

### ⚙️ Requisitos Previos:
- Tener instalado **Docker Desktop** y asegurarse de que la aplicación esté abierta y en ejecución.
- Garantizar que los puertos **3000** (API), **5173 / 8100** (Web) y **3306** (MySQL) estén libres. **Importante:** Si utiliza servicios locales como XAMPP, deberá detenerlos por completo para evitar colisiones de puertos.

### 📥 Pasos para ejecutar:

**Paso 1:** Descargue el archivo `.zip` del proyecto desde la plataforma virtual y extráigalo en una carpeta local de su preferencia.

**Paso 2:** Abra la terminal de su sistema operativo y posiciónese en la **raíz principal** del proyecto (donde se encuentra el archivo `docker-compose.yml`).

**Paso 3:** Ejecute el comando maestro para iniciar la descarga de dependencias y el ensamblado de los contenedores:

```bash
docker-compose up --build
```

**Paso 4 (Tiempo de inicialización):** La primera vez que el entorno se construye, MySQL debe crear la base de datos desde cero. Por favor, **espere entre 15 y 20 segundos** mirando la terminal hasta que el backend anuncie el siguiente mensaje:

> `¡Conectado a la base de datos MySQL con éxito!`

**Paso 5:** Una vez conectado el servidor, abra su navegador web e ingrese a la siguiente dirección:

👉 **http://localhost:5173**

---

## 👤 Credenciales de Acceso para la Evaluación

Para probar los distintos niveles de privilegios (RBAC) y evaluar la plataforma, utilice las siguientes cuentas de prueba preconfiguradas en el sistema:

### 👑 Vista de Administrador (Panel de Control)
- **Identificador / Correo:** `test@gmail.com`
- **Contraseña:** `Queso1234`
- *Permite:* Acceder al módulo de control exclusivo, visualizar el listado completo de usuarios y ejecutar eliminaciones con doble confirmación de seguridad.

### 🟢 Vista de Conductor (Cliente Común)
- **Identificador / Usuario:** `Pedro Pascal`
- **Contraseña:** `Qwer1234`
- *Permite:* Agendar exámenes, reprogramar citas con bloqueo automático de fechas pasadas, gestionar notificaciones y visualizar trayectoria.

---
*Desarrollado para la Escuela de Ingeniería Informática de la Pontificia Universidad Católica de Valparaíso (PUCV).*
