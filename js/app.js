// ════════════════════════════════════════════
//  Algorithm Quest Studio · app.js  v3
// ════════════════════════════════════════════

// ── Full didactic config for every algorithm ──
const ALGO_CONFIG = {
  /* ═══════ SEARCHING ═══════ */
  linear_search: {
    engineKey: 'linear_search_iterative',
    variants: [
      { value:'linear_search_iterative', label:'Iterativo' },
      { value:'linear_search_recursive', label:'Recursivo' }
    ],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>Imagina que buscas tus llaves en una mochila llena de cosas. ¿Qué haces? Las sacas <strong>una por una</strong> hasta encontrarlas. ¡Eso es la búsqueda lineal!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Recorre el arreglo posición por posición comparando cada elemento con el objetivo.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p>Arreglo: <code>[4, 8, 15, 42]</code> — Busco el <code>42</code><br>Revisa 4 ❌, 8 ❌, 15 ❌, 42 ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Simple pero lento en listas grandes. Funciona en cualquier lista, ordenada o no.</p>
      </div>`
  },
  binary_search: {
    engineKey: 'binary_search_iterative',
    variants: [
      { value:'binary_search_iterative', label:'Iterativo' },
      { value:'binary_search_recursive', label:'Recursivo' }
    ],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>¿Alguna vez jugaste "Adivina el número del 1 al 100"? Empiezas por el 50. Si dicen "mayor", pruebas el 75. Si "menor", el 25. ¡Eso es Binary Search!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Va al centro de la lista. Si el valor es mayor, descarta la mitad izquierda. Si es menor, descarta la mitad derecha. Repite.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p>Lista: <code>[4,8,15,23,42,67]</code> — Busco <code>42</code><br>Mid=15 → mayor → busco derecha → Mid=42 ✅ ¡Solo 2 pasos!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">📢</div>
        <h3>Resultado</h3>
        <p>Para 1.000 elementos → máximo <strong>10 comparaciones</strong>. Para 1.000.000 → solo 20. ¡Increíble!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚠️</div>
        <h3>Importante</h3>
        <p>El arreglo <strong>debe estar ordenado</strong>. Si no, no funciona.</p>
      </div>`
  },
  /* ═══════ SORTING ═══════ */
  bubble_sort: {
    engineKey: 'bubble_sort',
    variants: [{ value:'bubble_sort', label:'Iterativo' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>Imagina una pecera con burbujas. Las burbujas más grandes <strong>suben al tope</strong>. Igual aquí: los números grandes "flotan" hacia el final en cada pasada.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Compara dos números adyacentes. Si el izquierdo es mayor al derecho, los <strong>intercambia</strong>. Repite hasta que todo esté ordenado.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p><code>[5, 2, 4]</code><br>Paso 1: compara 5,2 → intercambia → <code>[2,5,4]</code><br>Paso 2: compara 5,4 → intercambia → <code>[2,4,5]</code> ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Fácil de entender. Lento para listas grandes (O n²). Bueno para aprender, malo para producción.</p>
      </div>`
  },
  insertion_sort: {
    engineKey: 'insertion_sort',
    variants: [{ value:'insertion_sort', label:'Iterativo' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>🃏 Imagina que estás jugando naipes y recibes cartas de una en una. Cada carta nueva la colocas en su <strong>lugar correcto</strong> entre las que ya tienes. ¡Eso es Insertion Sort!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Toma cada elemento del arreglo y lo <strong>inserta en su posición correcta</strong> dentro de la parte ya ordenada (a su izquierda).</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p><code>[5, 2, 4, 1]</code><br>i=1: tomo 2, muevo 5 → <code>[2,5,4,1]</code><br>i=2: tomo 4, muevo 5 → <code>[2,4,5,1]</code><br>i=3: tomo 1, muevo todo → <code>[1,2,4,5]</code> ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Muy bueno cuando la lista está <strong>casi ordenada</strong>. Mejor caso O(n). Simple y estable.</p>
      </div>`
  },
  selection_sort: {
    engineKey: 'selection_sort',
    variants: [{ value:'selection_sort', label:'Iterativo' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>🔍 Imagina que tienes fichas desordenadas sobre la mesa. Buscas la más pequeña y la pones primero. Luego buscas la siguiente más pequeña y así sucesivamente.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>En cada pasada, <strong>selecciona el elemento mínimo</strong> de la parte no ordenada y lo intercambia con el primero de esa parte.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p><code>[64, 25, 12, 22]</code><br>Paso 1: mínimo=12 → intercambia con 64 → <code>[12, 25, 64, 22]</code><br>Paso 2: mínimo=22 → intercambia con 25 → <code>[12, 22, 64, 25]</code> ...</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Siempre hace exactamente n-1 intercambios. Lento (O n²) pero predecible.</p>
      </div>`
  },
  merge_sort: {
    engineKey: 'merge_sort',
    variants: [{ value:'merge_sort', label:'Recursivo' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>Imagina que tienes muchas cartas desordenadas 📚. Las divides en dos montoncitos, luego otra vez, hasta que solo queda 1 carta. ¡Luego las unes ordenadamente!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Divide el problema en partes pequeñas, las ordena y luego las combina. Muy eficiente para listas grandes.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p><code>[5, 3, 8, 4]</code><br>División → <code>[5,3] [8,4]</code> → <code>[5][3][8][4]</code><br>Unión → <code>[3,5][4,8]</code> → <code>[3,4,5,8]</code> ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Divide → Ordena → Une. Es un algoritmo <strong>O(n log n)</strong> altamente eficiente.</p>
      </div>`
  },
  heap_sort: {
    engineKey: 'heap_sort',
    variants: [{ value:'heap_sort', label:'Iterativo' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🌳</div>
        <h3>Explicación Sencilla</h3>
        <p>Imagina un árbol donde siempre el número más grande está arriba 👑. Sacas el más grande, lo mandas al final y reorganizas el árbol.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Convierte el arreglo en un Max Heap, extrae el mayor elemento y lo coloca al final. Repite hasta terminar.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p><code>[4, 10, 3, 5, 1]</code><br>Heap: <code>[10, 5, 3, 4, 1]</code><br>Sale 10 → <code>[5, 4, 3, 1, 10]</code> ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Siempre <strong>O(n log n)</strong>. No usa memoria extra. Muy eficiente y estable en rendimiento.</p>
      </div>`
  },
  radix_sort: {
    engineKey: 'radix_sort',
    variants: [{ value:'radix_sort', label:'Por Dígitos' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🔢</div>
        <h3>Explicación Sencilla</h3>
        <p>No compara números completos. Los ordena por partes: primero unidades 🟢, luego decenas 🔵, luego centenas 🟣.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Ordena dígito por dígito usando Counting Sort internamente. No se basa en comparaciones directas.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p><code>[170, 45, 75, 90]</code><br>Unidades: <code>[170, 90, 45, 75]</code><br>Decenas: <code>[45, 170, 75, 90]</code> ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Complejidad <strong>O(nk)</strong>. Ideal para ordenar grandes cantidades de números enteros.</p>
      </div>`
  },
  quick_sort: {
    engineKey: 'quick_sort',
    variants: [{ value:'quick_sort', label:'Recursivo' }],
    theory: `
      <div class="theory-section">
        <div class="theory-icon">🧠</div>
        <h3>Explicación Sencilla</h3>
        <p>Imagina una fila de números 🎯. Escoges uno como “líder” (pivote). Los menores van a la izquierda y los mayores a la derecha. ¡Haces lo mismo con cada grupo!</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">⚙️</div>
        <h3>Qué hace</h3>
        <p>Divide el arreglo usando un pivote y ordena cada lado por separado. Es extremadamente rápido en la práctica.</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🎯</div>
        <h3>Ejemplo</h3>
        <p>Pivote: 4 en <code>[5, 3, 8, 4]</code><br>Partición → <code>[3] 4 [5, 8]</code><br>Ordenado → <code>[3, 4, 5, 8]</code> ✅</p>
      </div>
      <div class="theory-section">
        <div class="theory-icon">🪄</div>
        <h3>Resumen</h3>
        <p>Divide por pivote → ordena lados. Muy usado en sistemas reales por su eficiencia <strong>O(n log n)</strong>.</p>
      </div>`
  }
};

// ── Step modal explanations by stateId ──
const STEP_MODALS = {
  checkMatch:     { icon:'🔍', title:'Comparando...', body:'El algoritmo está <strong>mirando</strong> este elemento y preguntando: ¿Es el que busco?' },
  found:          { icon:'🎉', title:'¡Encontrado!',  body:'El elemento buscado fue hallado. La función devuelve el índice donde está guardado.' },
  notFound:       { icon:'😢', title:'No encontrado', body:'Recorrimos todo el arreglo y el elemento no existe. Devolvemos -1.' },
  swap:           { icon:'🔄', title:'¡Intercambio!', body:'Este par estaba en orden incorrecto. Los intercambiamos de posición.' },
  fixed:          { icon:'✅', title:'Elemento fijo', body:'Este elemento ya llegó a su posición correcta y no se moverá más.' },
  complete:       { icon:'🏆', title:'¡Ordenado!',    body:'El arreglo está completamente ordenado. ¡Algoritmo completado!' },
  init:           { icon:'🚀', title:'Iniciando...',  body:'El algoritmo comienza. Se establecen las variables iniciales (Low, High, Mid).' },
  whileCondition: { icon:'🔁', title:'Condición del bucle', body:'Se verifica si Low ≤ High. Si es verdad, continuamos buscando.' },
  calcMid:        { icon:'📐', title:'Calculando centro', body:'Encontramos el índice del elemento central: mid = (low + high) / 2.' },
  moveLow:        { icon:'→',  title:'Mover límite inferior', body:'El objetivo es MAYOR que el centro. Descartamos la mitad izquierda.' },
  moveHigh:       { icon:'←',  title:'Mover límite superior', body:'El objetivo es MENOR que el centro. Descartamos la mitad derecha.' },
};

// ──────────────────────── CATEGORIES ────────────────────────
const CATEGORIES = {
  search: {
    label: 'Algoritmos de Búsqueda', sub: 'Técnicas para localizar elementos en estructuras de datos',
    algorithms: [
      { id:'linear_search', title:'Linear Search', desc:'Busca elemento por elemento. Como buscar tus llaves una por una.', complexity:'O(n)',     space:'O(1)', difficulty:'easy',   tag:'search', available:true },
      { id:'binary_search', title:'Binary Search', desc:'Divide y descarta la mitad. Como adivinar un número del 1 al 100.', complexity:'O(log n)', space:'O(1)', difficulty:'medium', tag:'search', available:true },
      { id:'dfs', title:'DFS',          desc:'Explora un camino completo antes de retroceder.', complexity:'O(V+E)', space:'O(V)', difficulty:'medium', tag:'search', available:true },
      { id:'bfs', title:'BFS',          desc:'Explora nivel por nivel como ondas en el agua.', complexity:'O(V+E)', space:'O(V)', difficulty:'medium', tag:'search', available:true },
    ]
  },
  sort: {
    label: 'Algoritmos de Ordenamiento', sub: 'Organiza elementos según un criterio de orden establecido',
    algorithms: [
      { id:'bubble_sort',    title:'Bubble Sort',    desc:'Los mayores "burbujean" hacia el final. Simple y didáctico.',       complexity:'O(n²)',     space:'O(1)', difficulty:'easy',   tag:'sort', available:true },
      { id:'insertion_sort', title:'Insertion Sort', desc:'Como ordenar cartas: inserta cada elemento en su lugar correcto.', complexity:'O(n²)',     space:'O(1)', difficulty:'easy',   tag:'sort', available:true },
      { id:'selection_sort', title:'Selection Sort', desc:'Selecciona el mínimo y lo pone al principio, una y otra vez.',     complexity:'O(n²)',     space:'O(1)', difficulty:'easy',   tag:'sort', available:true },
      { id:'merge_sort',     title:'Merge Sort',     desc:'🚀 Divide y vencerás. Muy eficiente: O(n log n). Top en entrevistas.', complexity:'O(n log n)',space:'O(n)', difficulty:'medium', tag:'sort', available:true },
      { id:'quick_sort',     title:'Quick Sort',     desc:'🚀 El rey de la práctica. Divide por pivote. Complejidad promedio: O(n log n).', complexity:'O(n log n)',space:'O(log n)', difficulty:'medium', tag:'sort', available:true },
      { id:'heap_sort',      title:'Heap Sort',      desc:'👑 El Rey del Árbol. Siempre O(n log n) y sin memoria extra.',       complexity:'O(n log n)',space:'O(1)', difficulty:'hard',   tag:'sort', available:true },
      { id:'radix_sort',     title:'Radix Sort',     desc:'🔢 Ordena por dígitos (u, d, c). Ideal para números grandes.',           complexity:'O(nk)',     space:'O(n+k)', difficulty:'medium', tag:'sort', available:true },
      { id:'counting_sort',  title:'Counting Sort',  desc:'Cuenta cuántas veces aparece cada número y los reconstruye.',      complexity:'O(n+k)',    space:'O(k)', difficulty:'easy',   tag:'sort', available:true },
    ]
  },
  graph: {
    label: 'Algoritmos de Grafos', sub: 'Rutas, redes y dependencias entre nodos',
    algorithms: [
      { id:'dijkstra',       title:'Dijkstra',        desc:'Camino más corto. Como Google Maps con pesos positivos.',           complexity:'O(V²)',    difficulty:'hard', tag:'graph', available:true },
      { id:'bellman_ford',   title:'Bellman-Ford',    desc:'Igual a Dijkstra pero tolera pesos negativos en las aristas.',     complexity:'O(VE)',    difficulty:'hard', tag:'graph', available:true },
      { id:'floyd_warshall', title:'Floyd-Warshall',  desc:'Calcula todos los caminos más cortos entre todos los pares.',      complexity:'O(V³)',    difficulty:'hard', tag:'graph', available:true },
      { id:'prim',           title:'Prim (MST)',       desc:'Conecta todos los nodos con el menor costo total posible.',        complexity:'O(E log V)',difficulty:'hard', tag:'graph', available:true },
      { id:'kruskal',        title:'Kruskal (MST)',    desc:'Une rutas por peso sin formar ciclos usando Union-Find.',          complexity:'O(E log E)',difficulty:'hard', tag:'graph', available:true },
      { id:'topo_sort',      title:'Topological Sort', desc:'Ordena tareas respetando dependencias. Ej: estudia antes del examen.', complexity:'O(V+E)',difficulty:'medium', tag:'graph', available:true },
    ]
  },
  ml: {
    label: 'Machine Learning e IA', sub: 'Predicción, clasificación y agrupación de datos',
    algorithms: [
      { id:'linear_reg',   title:'Regresión Lineal',    desc:'Predice valores continuos. Ej: precio de una casa.',           complexity:'O(nd²)', difficulty:'medium', tag:'ml', available:true },
      { id:'logistic_reg', title:'Regresión Logística', desc:'Clasifica en categorías (Sí/No). Ej: spam o no spam.',          complexity:'O(nd)',  difficulty:'medium', tag:'ml', available:true },
      { id:'knn',          title:'K-Nearest Neighbors', desc:'Clasifica por los vecinos más cercanos. Por mayoría.',          complexity:'O(nd)',  difficulty:'easy',   tag:'ml', available:true },
      { id:'kmeans',       title:'K-Means Clustering',  desc:'Agrupa datos en k grupos por similitud.',                       complexity:'O(nkd)', difficulty:'medium', tag:'ml', available:true },
      { id:'dtree',        title:'Árboles de Decisión', desc:'Serie de preguntas Sí/No que llevan a una decisión.',           complexity:'O(n log n)',difficulty:'medium',tag:'ml', available:true },
      { id:'randomforest', title:'Random Forest',       desc:'Un bosque de árboles de decisión que vota por mayoría.',        complexity:'O(m n log n)',difficulty:'hard',tag:'ml', available:true },
      { id:'svm',          title:'SVM',                 desc:'Traza una línea que separa clases con el margen máximo.',       complexity:'O(n³)',  difficulty:'hard',   tag:'ml', available:true },
    ]
  },
  opt: {
    label: 'Optimización y Técnicas Especiales', sub: 'Patrones generales de diseño algorítmico',
    algorithms: [
      { id:'dp',           title:'Programación Dinámica', desc:'Divide un problema grande en subproblemas y guarda resultados.', complexity:'Varía', difficulty:'hard',   tag:'opt', available:true },
      { id:'greedy',       title:'Algoritmos Voraces',    desc:'En cada paso toma la mejor decisión local.',                    complexity:'Varía', difficulty:'medium', tag:'opt', available:true },
      { id:'backtracking', title:'Backtracking',          desc:'Prueba una solución. Si falla, retrocede y prueba otra.',       complexity:'O(bᵈ)', difficulty:'hard',   tag:'opt', available:true },
      { id:'divide',       title:'Divide y Vencerás',     desc:'Divide el problema, resuelve cada parte, combina resultados.',  complexity:'Varía', difficulty:'medium', tag:'opt', available:true },
      { id:'huffman',      title:'Compresión Huffman',    desc:'Codifica datos frecuentes con menos bits para comprimir.',      complexity:'O(n log n)',difficulty:'medium',tag:'opt', available:true },
      { id:'hashing',      title:'Hashing',               desc:'Convierte datos en una clave de longitud fija para acceso rápido.', complexity:'O(1)', difficulty:'medium', tag:'opt', available:true },
    ]
  },
  crypto: {
    label: 'Criptografía y Matemáticas', sub: 'Seguridad, números primos y fundamentos matemáticos',
    algorithms: [
      { id:'euclid', title:'Algoritmo de Euclides', desc:'Calcula el MCD usando divisiones sucesivas. Base de la criptografía.',    complexity:'O(log n)',    difficulty:'easy',   tag:'crypto', available:true },
      { id:'sieve',  title:'Criba de Eratóstenes',  desc:'Encuentra todos los primos hasta N marcando sus múltiplos.',              complexity:'O(n log log n)',difficulty:'medium', tag:'crypto', available:true },
      { id:'rsa',    title:'RSA',                   desc:'Cifrado asimétrico. Base de HTTPS e internet seguro.',                    complexity:'O(log³ n)',   difficulty:'hard',   tag:'crypto', available:true },
    ]
  }
};

// ─────────────────── STATE ───────────────────
let currentCat    = 'search';
let visualizer    = null;
let engine        = null;
let steps         = [];
let stepIndex     = 0;
let currentAlgoId = 'linear_search';

// ─────────────────── MODAL ───────────────────
function createModal() {
  const overlay = document.createElement('div');
  overlay.id = 'step-modal';
  overlay.innerHTML = `
    <div class="modal-box">
      <div class="modal-icon" id="modal-icon">🔍</div>
      <h2 id="modal-title">Paso</h2>
      <div id="modal-body" class="modal-body"></div>
      <button id="modal-close" class="ctrl-btn primary" style="margin-top:16px;">OK, entendido ✓</button>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('modal-close').addEventListener('click', hideModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) hideModal(); });
}

function showModal(step) {
  const info = STEP_MODALS[step.stateId] || { icon:'💡', title:'Paso a Paso' };
  document.getElementById('modal-icon').textContent  = info.icon;
  document.getElementById('modal-title').textContent = info.title;
  
  let body = `<p style="margin-bottom:10px; color:var(--txt);">${info.body || 'Continuando la ejecución...'}</p>`;
  if (step.narrative) {
    body += `<div style="padding:14px; background:var(--surface); border:1px solid var(--accent); border-radius:12px; text-align:left; font-size:0.9rem; line-height:1.6; color:var(--txt);">
      <strong>📝 Analizando el Detalle:</strong><br>${step.narrative}
    </div>`;
  }
  
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('step-modal').classList.add('active');
}

function hideModal() {
  const m = document.getElementById('step-modal');
  if (m) m.classList.remove('active');
}

// ─────────────────── DASHBOARD ───────────────────
function showDashboard() {
  document.getElementById('view-dashboard').classList.add('active');
  document.getElementById('view-explorer').classList.remove('active');
}

function showExplorer(algoId) {
  currentAlgoId = algoId;
  document.getElementById('view-dashboard').classList.remove('active');
  document.getElementById('view-explorer').classList.add('active');
  
  // Show Intro Modal first
  showIntroModal(algoId);
  initExplorer(algoId);
}

function showIntroModal(algoId) {
  const cfg = ALGO_CONFIG[algoId] || {};
  const meta = algorithmsMetadata[algoId] || {};
  const content = document.getElementById('intro-content');
  
  content.innerHTML = `
    <h1 style="font-size: 2rem; margin-bottom: 20px; color: var(--accent);">${meta.name || algoId}</h1>
    <div class="theory-wrapper">
      ${cfg.theory || '<p>Documentación técnica en proceso...</p>'}
    </div>
    <div class="modal-stats" style="display: flex; gap: 15px; margin-top: 25px; padding: 15px; background: rgba(255,255,255,0.05); border-radius: 12px;">
      <div style="flex:1;"><strong>Complejidad:</strong> <span style="color:var(--gold);">${meta.complexity || 'O(?)'}</span></div>
      <div style="flex:1;"><strong>Espacio:</strong> <span style="color:var(--gold);">${meta.space || 'O(1)'}</span></div>
    </div>
  `;
  document.getElementById('intro-modal').classList.add('active');
}

function hideIntroModal() {
  document.getElementById('intro-modal').classList.remove('active');
}

function renderCards(cat) {
  const data = CATEGORIES[cat];
  document.getElementById('cat-title').textContent    = data.label;
  document.getElementById('cat-subtitle').textContent = data.sub;
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';
  data.algorithms.forEach(algo => {
    const card = document.createElement('div');
    card.className = 'algo-card' + (algo.available ? '' : ' locked');
    const diffLabel = { easy:'Fácil', medium:'Medio', hard:'Difícil' }[algo.difficulty] || '';
    card.innerHTML = `
      <div class="card-tags">
        <span class="tag tag-${algo.tag}">${algo.tag.toUpperCase()}</span>
        <span class="tag tag-${algo.difficulty}">${diffLabel}</span>
        ${!algo.available ? '<span class="tag tag-locked">🔒 Próximamente</span>' : ''}
      </div>
      <div class="card-title">${algo.title}</div>
      <div class="card-desc">${algo.desc}</div>
      <div class="card-footer">
        <span class="card-complexity">${algo.complexity}</span>
        ${algo.available ? '<span class="card-cta">Explorar →</span>' : ''}
      </div>`;
    if (algo.available) card.addEventListener('click', () => showExplorer(algo.id));
    grid.appendChild(card);
  });
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    renderCards(currentCat);
  });
});

document.getElementById('btn-back').addEventListener('click', () => {
  resetExplorer(); showDashboard();
});

// ─────────────────── EXPLORER ───────────────────
function initExplorer(algoId) {
  resetExplorer();
  const cfg  = ALGO_CONFIG[algoId] || {};
  const meta = algorithmsMetadata[algoId] || {};

  // Find category label
  let catLabel = '';
  Object.values(CATEGORIES).forEach(c => {
    const found = c.algorithms.find(a => a.id === algoId);
    if (found) catLabel = c.label;
  });

  document.getElementById('exp-breadcrumb').textContent = `${catLabel} > ${meta.name || algoId}`;
  document.getElementById('exp-complexity').textContent = meta.complexity || 'O(?)';

  // Variant select
  const sel = document.getElementById('select-algo');
  sel.innerHTML = '';
  (cfg.variants || [{ value: algoId, label: 'Iterativo' }]).forEach(v => {
    const opt = document.createElement('option');
    opt.value = v.value; opt.textContent = v.label;
    sel.appendChild(opt);
  });
  sel.value = cfg.engineKey || algoId;

  if (!visualizer) visualizer = new Visualizer();
  visualizer.currentAlgo = sel.value;
  visualizer.currentLang = 'java';
  visualizer.renderCode('java', sel.value);

  updateInputVisibility(algoId);
  const initialData = getParsedData();
  visualizer.renderChests(initialData);
}

function updateInputVisibility(algoId) {
  const wrap = document.getElementById('search-target-wrap');
  if (!wrap) return;
  const isSearch = algoId.includes('search') || algoId.includes('dfs') || algoId.includes('bfs');
  wrap.style.display = isSearch ? 'flex' : 'none';
}

function getParsedData() {
  const raw = document.getElementById('input-data').value;
  // Basic parsing for arrays: comma or space separated
  return raw.split(/[\s,]+/).filter(x => x !== "").map(Number);
}

let playInterval = null;
let isPlaying = false;

function resetExplorer() {
  engine = null; steps = []; stepIndex = 0;
  isPlaying = false;
  clearInterval(playInterval);
  document.getElementById('btn-play').textContent = '▶ Reproducir';
  document.getElementById('btn-play').disabled = false;
  document.getElementById('btn-next').disabled  = true;
  document.getElementById('btn-prev').disabled  = true;
  document.getElementById('exp-ops').textContent = '0 operaciones';
  document.getElementById('step-idx').textContent = '0';
  document.getElementById('step-tot').textContent = '0';
  if (visualizer) {
    const currentData = getParsedData();
    visualizer.renderChests(currentData);
    const nt = document.getElementById('narrative-text');
    if (nt) nt.textContent = 'Selecciona un valor y presiona ▶ Reproducir.';
    ['ptr-low','ptr-mid','ptr-high'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    if (visualizer) {
      visualizer.currentLang = btn.dataset.lang;
      visualizer.renderCode(visualizer.currentLang, visualizer.currentAlgo);
    }
  });
});

document.getElementById('select-algo').addEventListener('change', e => {
  if (visualizer) { visualizer.currentAlgo = e.target.value; visualizer.renderCode(visualizer.currentLang, e.target.value); }
  resetExplorer();
});

function applyCurrentStep() {
  if (stepIndex >= steps.length) {
    pausePlayback();
    document.getElementById('btn-next').disabled = true;
    document.getElementById('btn-play').disabled = true;
    return;
  }
  const step = steps[stepIndex];
  step.algoType = document.getElementById('select-algo').value;
  if (step.array && visualizer) visualizer.renderChests(step.array);
  if (visualizer) visualizer.applyState(step);
  if (step.ops !== undefined) document.getElementById('exp-ops').textContent = `${step.ops} operaciones`;
  document.getElementById('step-idx').textContent = stepIndex + 1;
  
  // Modals for Didactic purposes
  if (isPlaying) { 
      hideModal(); 
  } else {
      showModal(step);
  }

  document.getElementById('btn-prev').disabled = (stepIndex === 0);
  document.getElementById('btn-next').disabled = (stepIndex === steps.length - 1);
}

function getDelay() {
  const v = parseInt(document.getElementById('speed-slider').value) || 3;
  return [2500, 1500, 800, 300, 50][v - 1];
}

function playPlayback() {
  isPlaying = true;
  document.getElementById('btn-play').textContent = '⏸ Pausa';
  hideModal();
  if (stepIndex >= steps.length - 1) stepIndex = 0; // restart
  
  playInterval = setInterval(() => {
    if (stepIndex < steps.length - 1) {
      stepIndex++;
      applyCurrentStep();
    } else {
      pausePlayback();
      showModal(steps[stepIndex]); // final modal
    }
  }, getDelay());
}

function pausePlayback() {
  isPlaying = false;
  clearInterval(playInterval);
  document.getElementById('btn-play').textContent = '▶ Reproducir';
}

document.getElementById('btn-play').addEventListener('click', () => {
  if (steps.length === 0) {
    const target = parseInt(document.getElementById('input-target').value) || 42;
    const algoKey = document.getElementById('select-algo').value;
    const currentData = getParsedData();
    if (visualizer) visualizer.currentAlgo = algoKey;
    engine = new AlgorithmEngine(currentData, target);
    steps  = engine.generateSteps(algoKey);
    document.getElementById('step-tot').textContent = steps.length;
    stepIndex = 0;
    applyCurrentStep();
  }
  
  if (isPlaying) pausePlayback();
  else playPlayback();
});

document.getElementById('btn-next').addEventListener('click', () => {
  if (isPlaying) pausePlayback();
  if (stepIndex < steps.length - 1) { stepIndex++; applyCurrentStep(); }
});

document.getElementById('btn-prev').addEventListener('click', () => {
  if (isPlaying) pausePlayback();
  if (stepIndex > 0) { stepIndex--; applyCurrentStep(); }
});

document.getElementById('btn-reset').addEventListener('click', () => {
  resetExplorer();
  if (visualizer) visualizer.renderCode(visualizer.currentLang, document.getElementById('select-algo').value || 'linear_search_iterative');
});

document.getElementById('speed-slider').addEventListener('input', () => {
  if (isPlaying) {
      pausePlayback();
      playPlayback(); // restart interval with new delay
  }
});

document.getElementById('btn-shuffle').addEventListener('click', () => {
  const count = 8;
  const randomArr = Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
  document.getElementById('input-data').value = randomArr.join(', ');
  resetExplorer();
});

document.getElementById('input-data').addEventListener('change', () => resetExplorer());
document.getElementById('input-target').addEventListener('change', () => resetExplorer());

// ─────────────────── BOOT ───────────────────
createModal();
renderCards('search');

// Intro Modal Listeners
document.getElementById('intro-close').addEventListener('click', hideIntroModal);
document.getElementById('intro-start').addEventListener('click', hideIntroModal);
document.getElementById('intro-modal').addEventListener('click', e => {
  if (e.target.id === 'intro-modal') hideIntroModal();
});
