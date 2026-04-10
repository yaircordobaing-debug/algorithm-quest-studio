# 🏆 Algorithm Quest Studio

Transformando el aprendizaje de algoritmos en una experiencia interactiva de nivel profesional.

## 🚀 Características Principales
- **Studio Split-Screen**: Vista dual 40/60 (Código/Simulación) para un aprendizaje inmersivo.
- **Configuración Inteligente**: Barra superior dedicada para entrada de datos y objetivos, evitando obstrucciones.
- **Dual-View Heap Sort**: Visualización sincronizada de Árbol Máximo (Heap) y Arreglo de Memoria.
- **Narrativa Humana**: Mensajes didácticos y con sentido (Dummies-friendly) en lugar de códigos técnicos.
- **Control Total**: Playback bar centrada con control de velocidad y paso a paso.
- **Dashboard Categorizado**: Navegación por Search, Sort, Graphs, ML, Optimization y Crypto.
- **25+ Algoritmos**: Desde Búsqueda Binaria hasta Regresión Lineal y RSA.

## 🛠️ Tecnologías
- **Vanilla JavaScript**: Motor de algoritmos y visualización.
- **CSS3 (Modern Glassmorphism)**: Interfaz premium inspirada en dashboards de alta fidelidad.
- **GitHub Actions**: CI para validación estructural.

## 📂 Estructura del Proyecto
- `css/`: Sistema de diseño base con tokens de color y layout split-screen.
- `js/algorithms/`: Lógica del motor `AlgorithmEngine` para generación de estados.
- `js/data/`: Metadatos y snippets de código sincronizados por lenguaje (Java, Python, JS).
- `js/ui/`: `Visualizer.js` para renderizado dinámico en Canvas y DOM.

## 📊 Estado Actual del Proyecto

### ✅ Lo que ya hay:
- Interfaz Pro con Layout 40/60 y look Glassmorphic.
- Sistema de inputs relocados a la cabecera para máxima usabilidad.
- Visualización de Heap Sort optimizada con vista Árbol+Arreglo.
- Narrativa didáctica integrada en todos los algoritmos clave.
- Soporte multilingüe de código fuente (Java, Python, JS).

### ⏳ Lo que falta / Próximos Pasos:
- **Validación Estricta de Inputs**: Manejo de errores para entradas malformadas en el arreglo de datos.
- **Más Visualizadores Duales**: Extender la vista dual (Estructura + Arreglo) a algoritmos como Binary Search Tree.
- **Optimización Mobile**: Ajustar los contenedores de simulación para una experiencia fluida en tablets y móviles.
- **Exportación de Simulación**: Funcionalidad para descargar la animación como GIF o secuencia de imágenes.

## 🧪 Cómo usar
1. Abre `index.html` para explorar el Dashboard.
2. Selecciona un algoritmo para entrar al **Studio**.
3. Usa los controles de **Reproducción** o **Paso a Paso** para analizar la ejecución.
