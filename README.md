# ConduceFácil Chile 🚗

Este proyecto aborda la problemática de la baja oferta de trámites en línea en las municipalidades chilenas, donde actualmente solo el 19% permite agendar exámenes de conducir de forma digital. Nuestra solución propone una plataforma centralizada que utiliza mapas interactivos para mejorar la distribución de la demanda en escuelas de conducción y centros de examen.

## 👥 Integrantes
* Alexander Parada Silva
* Vicente Aburto Falcón

## 🛠️ Tecnologías y Herramientas
* **Frontend:** Ionic Framework con React y TypeScript.
* **Navegación:** React Router (con rutas públicas y protegidas).
* **Diseño UI/UX:** Figma (Prototipado móvil y web).
* **Gestión:** GitHub Projects e Issues para el seguimiento de la trayectoria.

## 📝 Requerimientos del Proyecto

### Requerimientos Funcionales (RF)
1. **Mapa Interactivo:** Visualización de escuelas de conductores y centros municipales mediante marcadores geolocalizados.
2. **Buscador Parametrizado:** Filtrado de locales y servicios por Región y Comuna.
3. **Sistema de Agendamiento:** Funcionalidad para solicitar citas para exámenes o clases teóricas/prácticas.
4. **Seguimiento de Trayectoria:** Panel de usuario para visualizar el historial y progreso de clases impartidas.
5. **Catálogo de Servicios:** Información detallada de cada centro, incluyendo precios, tipos de licencia y requisitos.
6. **Gestión de Disponibilidad (Roles):** Interfaz para que administradores de centros actualicen cupos y horarios en tiempo real.
7. **Notificaciones de Estado:** Avisos automáticos sobre confirmación de citas y recordatorios de clases.

### Requerimientos No Funcionales (RNF)
1. **Usabilidad:** Diseño responsivo y centrado en el usuario, adaptado tanto para dispositivos móviles como para web.
2. **Seguridad:** Implementación de autenticación segura (JWT) y manejo de rutas protegidas para la trayectoria del usuario.
3. **Rendimiento:** Optimización en la carga de datos geográficos para asegurar una navegación fluida en mapas.

## 🚀 Instalación y Ejecución
Para correr este proyecto localmente:

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
