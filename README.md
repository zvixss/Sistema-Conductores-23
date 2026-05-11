# ConduceFácil 🚗💨
**Optimización y Descentralización del Agendamiento de Licencias de Conducir**

Este proyecto surge como una solución tecnológica a la crisis de disponibilidad en las Direcciones de Tránsito en Chile. Actualmente, **solo el 19% de las comunas permite agendar exámenes en línea**, lo que genera cuellos de botella y esperas de meses para los ciudadanos.

## Integrantes:
* Alexander Parada Silva
* Vicente Aburto Falcón

---

## 🎯 Propósito del Proyecto
El objetivo principal es **descentralizar la demanda de licencias**. ConduceFácil permite a los usuarios visualizar la carga de trabajo de distintas municipalidades para elegir aquellas con mayor disponibilidad, reduciendo los tiempos de espera globales.

### Solución Propuesta:
* **Visualización Inteligente:** Mapa interactivo que muestra la disponibilidad de horas en diversas comunas.
* **Conexión con Escuelas:** Integración con escuelas de conductores para validar la trayectoria del alumno.
* **Agendamiento Optimizado:** Sistema que sugiere municipalidades "bajo la lupa" con menor tiempo de espera.
* **Gestión de Perfil:** Espacio para que el ciudadano controle su documentación y estado del trámite.

---

## 🎨 Diseño y Prototipado (Figma)
El diseño de la interfaz se realizó en **Figma**, enfocándose en la usabilidad móvil y de escritorio mediante componentes de **Ionic**.

### Cómo probar el prototipo:
1.  **Acceder al enlace:** [Sistema ConduceFácil - Figma](https://www.figma.com/site/2NcgVbsyereHBcFL6wao3l/SIstema-Conductores?node-id=0-1&t=eHXlu6ZrZac98wCv-1)
2.  **Modo Presentación:** Una vez que cargue el archivo, presiona el icono de **"Play" (▶️)** ubicado en la esquina superior derecha.
3.  **Navegación:** * En la **versión móvil**, utiliza los `IonTabs` (barra inferior) para navegar entre las secciones.
    * En la **versión desktop**, utiliza el menú lateral desplegable.

---

## 💻 Guía de Ejecución Local

Para levantar el proyecto y revisar el código fuente, sigue estas instrucciones utilizando el terminal (CMD o PowerShell).

### Requisitos Previos:
* **Visual Studio Code** instalado.
* **Node.js** instalado.
* CLI de **Ionic** instalado (`npm install -g @ionic/cli`).

### Pasos para ejecutar:
1.  **Abrir el proyecto:** Inicia VS Code y abre la carpeta llamada `appWeb`.
2.  **Instalar Dependencias:** Abre la terminal integrada y ejecuta el siguiente comando para descargar las librerías necesarias:
    ```cmd
    npm install
    ```
3.  **Ejecutar la Aplicación:** Una vez finalizada la instalación, levanta el servidor local con el comando:
    ```cmd
    ionic serve
    ```
4.  **Visualización:** El sistema se abrirá automáticamente en tu navegador en la dirección `http://localhost:8100`.

---

## 🛠️ Stack Tecnológico
- **Frontend:** Ionic Framework con React y TypeScript.
- **Diseño:** Figma.
- **Editor de Código:** Visual Studio Code.
- **Control de Versiones:** Git & GitHub.
