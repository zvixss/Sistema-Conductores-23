# ConduceFácil 🚗💨
**Optimización y Descentralización del Agendamiento de Licencias de Conducir**

Este proyecto surge como una solución tecnológica a la crisis de disponibilidad en las Direcciones de Tránsito en Chile. Actualmente, **solo el 19% de las comunas permite agendar exámenes en línea**, lo que genera esperas de meses para los ciudadanos.

## Integrantes:
* Alexander Parada Silva
* Vicente Aburto Falcón

---

## 🎯 Propósito del Proyecto
El objetivo principal es **descentralizar la demanda de licencias**. ConduceFácil permite a los usuarios visualizar la carga de trabajo de distintas municipalidades para elegir aquellas con mayor disponibilidad, reduciendo los tiempos de espera globales.

### Solución Propuesta:
* **Visualización Inteligente:** Mapa interactivo que muestra la disponibilidad de horas en diversas comunas.
* **Conexión con Escuelas:** Integración con escuelas de conductores para validar la trayectoria del alumno.
* **Agendamiento Optimizado:** Sistema que sugiere municipalidades con menor tiempo de espera.
* **Gestión de Perfil:** Espacio para que el ciudadano controle su documentación y estado del trámite.

---

## 🎨 Diseño y Prototipado (Figma)
El diseño de la interfaz se realizó en **Figma**, enfocándose en la usabilidad móvil y de escritorio mediante componentes de **Ionic**.

### Cómo probar el prototipo:
1.  **Acceder al enlace:** [Sistema ConduceFácil - Figma](https://www.figma.com/site/2NcgVbsyereHBcFL6wao3l/SIstema-Conductores?node-id=0-1&t=eHXlu6ZrZac98wCv-1)
2.  **Modo Presentación:** Una vez cargue el archivo, presiona el icono de **"Play" (▶️)** ubicado en la esquina superior derecha.
3.  **Navegación:** * En la **versión móvil**, utiliza los `IonTabs` (barra inferior) para navegar.
    * En la **versión desktop**, utiliza el menú lateral desplegable.

---

## 💻 Guía de Ejecución Local

Para levantar el proyecto y revisar el código fuente, sigue estas instrucciones. **Nota:** El código fuente se encuentra en la rama `master`.

### Requisitos Previos:
* **Visual Studio Code** instalado.
* **Node.js** instalado.
* CLI de **Ionic** instalado (`npm install -g @ionic/cli`).

### Pasos para ejecutar:
1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/zvixss/Sistema-Conductores-23.git
    ```
2.  **Acceder a la rama correcta:** Asegúrate de estar en la rama `master`:
    ```bash
    git checkout master
    ```
3.  **Entrar a la carpeta del proyecto:**
    ```bash
    cd appWeb
    ```
4.  **Instalar Dependencias:** Abre la terminal y ejecuta:
    ```bash
    npm install
    ```
5.  **Ejecutar la Aplicación:** Levanta el servidor local con el comando:
    ```bash
    ionic serve
    ```
6.  **Visualización:** El sistema se abrirá automáticamente en tu navegador en `http://localhost:8100`.

---

## 🛠️ Stack Tecnológico
- **Frontend:** Ionic Framework con React y TypeScript.
- **Diseño:** Figma.
- **Editor de Código:** Visual Studio Code.
- **Control de Versiones:** Git & GitHub (Rama `master`).
