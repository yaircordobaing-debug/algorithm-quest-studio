const algorithmsMetadata = {
    'linear_search': {
        name: 'Linear Search', category: 'Searching', complexity: 'O(n)', space: 'O(1)',
        theory: '<h3>Búsqueda Lineal</h3><p>Recorre el arreglo posición por posición hasta encontrar el objetivo o agotar el arreglo.</p>'
    },
    'binary_search': {
        name: 'Binary Search', category: 'Searching', complexity: 'O(log n)', space: 'O(1)',
        theory: '<h3>Búsqueda Binaria</h3><p>Divide el espacio de búsqueda a la mitad en cada paso. <strong>Requiere arreglo ordenado.</strong></p>'
    },
    'bubble_sort': {
        name: 'Bubble Sort', category: 'Sorting', complexity: 'O(n²)', space: 'O(1)',
        theory: '<h3>Bubble Sort</h3><p>Compara pares adyacentes. Los valores mayores "burbujean" hacia el final en cada pasada.</p>'
    },
    'quick_sort': {
        name: 'Quick Sort',
        category: 'Sorting',
        complexity: 'O(n log n)',
        space: 'O(log n)',
        theory: '<h3>🚀 Quick Sort (Dummies)</h3><p>Imagina una fila de números. Escoges a uno como "líder" (pivote). Los menores van a la izquierda y los mayores a la derecha. ¡Repites y listo!</p>',
        steps: [
            "Escoge el último elemento como pivote",
            "Mueve los menores a la izquierda",
            "Coloca el pivote en su lugar correcto",
            "Repite recursivamente"
        ]
    },
    'merge_sort': {
        name: 'Merge Sort', 
        category: 'Sorting', 
        complexity: 'O(n log n)', 
        space: 'O(n)',
        theory: '<h3>🚀 Merge Sort (Dummies)</h3><p>Imagina que tienes muchas cartas desordenadas. Las divides en montoncitos hasta que queda 1 sola carta. Luego, las unes ordenadamente. ¡Divide, Ordena y Une!</p>'
    },
    'insertion_sort': { name: 'Insertion Sort', category: 'Sorting',   complexity: 'O(n²)',      space: 'O(1)' },
    'selection_sort': { name: 'Selection Sort', category: 'Sorting',   complexity: 'O(n²)',      space: 'O(1)' },
    'heap_sort':      { name: 'Heap Sort',      category: 'Sorting',   complexity: 'O(n log n)', space: 'O(1)' },
    'radix_sort':     { name: 'Radix Sort',     category: 'Sorting',   complexity: 'O(nk)',      space: 'O(n+k)' },
    'counting_sort':  { name: 'Counting Sort',  category: 'Sorting',   complexity: 'O(n+k)',     space: 'O(k)' },
    'dfs':            { name: 'DFS',            category: 'Graphs',    complexity: 'O(V+E)',     space: 'O(V)' },
    'bfs':            { name: 'BFS',            category: 'Graphs',    complexity: 'O(V+E)',     space: 'O(V)' },
    'dijkstra':       { name: 'Dijkstra',       category: 'Graphs',    complexity: 'O(V²)',      space: 'O(V)' },
    'bellman_ford':   { name: 'Bellman-Ford',   category: 'Graphs',    complexity: 'O(VE)',      space: 'O(V)' },
    'floyd_warshall': { name: 'Floyd-Warshall', category: 'Graphs',    complexity: 'O(V³)',      space: 'O(V²)' },
    'prim':           { name: 'Prim (MST)',      category: 'Graphs',    complexity: 'O(E log V)', space: 'O(V)' },
    'kruskal':        { name: 'Kruskal (MST)',   category: 'Graphs',    complexity: 'O(E log E)', space: 'O(V)' },
    'topo_sort':      { name: 'Topological Sort',category: 'Graphs',    complexity: 'O(V+E)',     space: 'O(V)' },
    'linear_reg':     { name: 'Regresión Lineal',   category: 'ML', complexity: 'O(nd²)', space: 'O(d)' },
    'logistic_reg':   { name: 'Regresión Logística',category: 'ML', complexity: 'O(nd)',  space: 'O(d)' },
    'knn':            { name: 'K-Nearest Neighbors', category: 'ML', complexity: 'O(nd)', space: 'O(nd)' },
    'kmeans':         { name: 'K-Means',         category: 'ML', complexity: 'O(nkd)',  space: 'O(n+k)' },
    'dtree':          { name: 'Decision Tree',    category: 'ML', complexity: 'O(n log n)', space: 'O(n)' },
    'randomforest':   { name: 'Random Forest',    category: 'ML', complexity: 'O(m n log n)', space: 'O(mn)' },
    'svm':            { name: 'SVM',              category: 'ML', complexity: 'O(n³)',  space: 'O(n)' },
    'dp':             { name: 'Prog. Dinámica',   category: 'Optimization', complexity: 'Varía',    space: 'Varía' },
    'greedy':         { name: 'Algoritmos Voraces',category: 'Optimization', complexity: 'Varía',    space: 'Varía' },
    'backtracking':   { name: 'Backtracking',     category: 'Optimization', complexity: 'O(bᵈ)',    space: 'O(d)' },
    'huffman':        { name: 'Huffman',          category: 'Optimization', complexity: 'O(n log n)', space: 'O(n)' },
    'euclid':         { name: 'Algoritmo de Euclides', category: 'Crypto', complexity: 'O(log n)',   space: 'O(1)' },
    'sieve':          { name: 'Criba de Eratóstenes', category: 'Crypto', complexity: 'O(n log log n)', space: 'O(n)' },
    'rsa':            { name: 'RSA',              category: 'Crypto',  complexity: 'O(log³ n)',  space: 'O(log n)' },
};
