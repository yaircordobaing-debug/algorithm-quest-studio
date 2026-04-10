class AlgorithmEngine {
    constructor(array, target) {
        this.array = [...array];
        this.target = target;
        this.steps = [];
        this.comparisons = 0;
    }

    generateSteps(algoType) {
        this.steps = [];
        this.comparisons = 0;
        const t = algoType;
        if (t === 'linear_search_iterative')       this._linearIter();
        else if (t === 'linear_search_recursive')  this._linearRec(0);
        else if (t === 'binary_search_iterative')  this._binaryIter();
        else if (t === 'binary_search_recursive')  this._binaryRec(0, this.array.length - 1);
        else if (t === 'bubble_sort')              this._bubbleSort();
        else if (t === 'insertion_sort')           this._insertionSort();
        else if (t === 'selection_sort')           this._selectionSort();
        else if (t === 'dfs')                      this._dfs();
        else if (t === 'quick_sort')               this._quickSort();
        else if (t === 'heap_sort')                this._heapSort();
        else if (t === 'radix_sort')               this._radixSort();
        else if (t === 'backtracking')             this._nQueens();
        else if (t === 'merge_sort')               this._mergeSort();
        else {
            this._push({ stateId:'init', narrative: 'Este algoritmo aún no tiene animaciones de nodos/arreglos implementadas. Revisa el código de la izquierda 💻.' });
        }
        return this.steps;
    }

    _push(step) { this.steps.push(step); }

    // ── Linear Search ──
    _linearIter() {
        this._push({ stateId:'init', low:0, high:null, mid:null, ops:0,
            narrative: `🚀 Iniciando Búsqueda Lineal. Nota importante: ¡En programación, los arreglos siempre inician en la posición 0!` });
        for (let i = 0; i < this.array.length; i++) {
            this.comparisons++;
            this._push({ stateId:'checkMatch', low:i, high:null, mid:i, ops:this.comparisons,
                narrative:`Posición ${i}: ¿el valor ${this.array[i]} es igual a ${this.target}?` });
            if (this.array[i] === this.target) {
                this._push({ stateId:'found', low:i, high:null, mid:i, ops:this.comparisons,
                    narrative:`¡✅ Encontrado! El valor ${this.target} está en la posición ${i}. Total de pasos: ${this.comparisons}` });
                return;
            }
        }
        this._push({ stateId:'notFound', low:null, high:null, mid:null, ops:this.comparisons,
            narrative:`😢 No encontrado. Revisé todo el arreglo y el elemento no existe.` });
    }

    _linearRec(i) {
        if (i === 0) {
            this._push({ stateId:'init', low:0, high:null, mid:null, ops:0,
                narrative: `🚀 Iniciando Búsqueda Lineal Recursiva. Empezamos preguntando por la posición 0.` });
        }
        if (i >= this.array.length) {
            this._push({ stateId:'notFound', low:i, high:null, mid:i, ops:this.comparisons,
                narrative:`⚠️ Caso base: i=${i} ya sobrepasó el arreglo. No encontrado.` });
            return;
        }
        this.comparisons++;
        this._push({ stateId:'checkMatch', low:i, high:null, mid:i, ops:this.comparisons,
            narrative:`Llamada recursiva, posición ${i}. ¿El valor ${this.array[i]} es igual a ${this.target}?` });
        if (this.array[i] === this.target) {
            this._push({ stateId:'found', low:i, high:null, mid:i, ops:this.comparisons,
                narrative:`¡✅ Encontrado! La recursión devuelve el índice ${i}.` });
            return;
        }
        this._linearRec(i + 1);
    }

    // ── Binary Search ──
    _binaryIter() {
        let low = 0, high = this.array.length - 1;
        this._push({ stateId:'init', low, high, mid:null, narrative:`🚀 Iniciando Búsqueda Binaria. Comenzamos con 'low' en 0 y 'high' en ${high}. ¡Recuerda que el índice inicia en 0!` });
        while (low <= high) {
            let mid = Math.floor(low + (high - low) / 2);
            this.comparisons++;
            this._push({ stateId:'checkMatch', low, high, mid, ops:this.comparisons,
                narrative:`Calculamos la mitad: índice ${mid}. arr[${mid}] = ${this.array[mid]}. ¿Es igual a ${this.target}?` });
            if (this.array[mid] === this.target) {
                this._push({ stateId:'found', low, high, mid, ops:this.comparisons,
                    narrative:`✅ ¡Lo encontramos en la posición ${mid}! Costó ${this.comparisons} comparaciones.` });
                return;
            }
            if (this.array[mid] < this.target) {
                this._push({ stateId:'moveLow', low:mid+1, high, mid, ops:this.comparisons,
                    narrative:`Como ${this.array[mid]} es menor que ${this.target}, descartamos toda la mitad izquierda. Movemos 'low' a ${mid+1}.` });
                low = mid + 1;
            } else {
                this._push({ stateId:'moveHigh', low, high:mid-1, mid, ops:this.comparisons,
                    narrative:`Como ${this.array[mid]} es mayor que ${this.target}, descartamos toda la mitad derecha. Movemos 'high' a ${mid-1}.` });
                high = mid - 1;
            }
        }
        this._push({ stateId:'notFound', low, high, mid:null, ops:this.comparisons,
            narrative:`😢 Los punteros se cruzaron (low > high). Significa que no existe.` });
    }

    _binaryRec(low, high) {
        if (low === 0 && high === this.array.length - 1) {
            this._push({ stateId:'init', low, high, mid:null, narrative:`🚀 Iniciando Búsqueda Binaria Recursiva. 'low' en la posición 0, 'high' en ${high}.` });
        }
        if (low > high) {
            this._push({ stateId:'notFound', low, high, mid:null, narrative:`Caso base: los límites se cruzaron. No encontrado.` });
            return;
        }
        let mid = Math.floor(low + (high - low) / 2);
        this.comparisons++;
        this._push({ stateId:'checkMatch', low, high, mid, ops:this.comparisons,
            narrative:`Recursión con low=${low}, high=${high}. Evaluando el centro en índice ${mid}: arr[${mid}] es ${this.array[mid]}.` });
        if (this.array[mid] === this.target) {
            this._push({ stateId:'found', low, high, mid, ops:this.comparisons,
                narrative:`✅ ¡Encontrado en posición ${mid}! Comparaciones totales: ${this.comparisons}.` });
            return;
        }
        if (this.array[mid] < this.target) this._binaryRec(mid + 1, high);
        else                               this._binaryRec(low, mid - 1);
    }

    // ── Bubble Sort ──
    _bubbleSort() {
        let arr = [...this.array], n = arr.length;
        this._push({ stateId:'init', array:[...arr], narrative:`🔵 Bubble Sort. ¡Nota que el arreglo comienza en la posición 0 y tiene ${n} elementos!` });
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                this.comparisons++;
                this._push({ stateId:'checkMatch', low:j, mid:j+1, array:[...arr], ops:this.comparisons,
                    narrative:`Comparando posición ${j} vs ${j+1}. ¿${arr[j]} es mayor que ${arr[j+1]}?` });
                if (arr[j] > arr[j+1]) {
                    [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
                    this._push({ stateId:'swap', low:j, mid:j+1, array:[...arr],
                        narrative:`🔄 Efectivamente. Intercambiamos ${arr[j+1]} (que estaba en pos ${j}) y ${arr[j]} (en pos ${j+1}).` });
                }
            }
            this._push({ stateId:'fixed', low:null, high:n-i-1, array:[...arr],
                narrative:`✅ Fin de la ronda. El elemento más grande burbujeó hasta el final y quedó fijo en posición ${n-i-1}.` });
        }
        this._push({ stateId:'complete', array:[...arr], narrative:`🏆 Arreglo ordenado correctamente.` });
    }

    // ── Insertion Sort ──
    _insertionSort() {
        let arr = [...this.array], n = arr.length;
        this._push({ stateId:'init', array:[...arr], narrative:`🃏 Insertion Sort. Iniciamos asumiendo que la posición 0 ya es su propia sublista ordenada.` });
        for (let i = 1; i < n; i++) {
            let key = arr[i], j = i - 1;
            this.comparisons++;
            this._push({ stateId:'checkMatch', low:i, mid:j, array:[...arr], ops:this.comparisons,
                narrative:`Tomamos la "carta" ${key} (pos ${i}). Buscamos dónde insertarla a la izquierda.` });
            while (j >= 0 && arr[j] > key) {
                arr[j+1] = arr[j];
                this._push({ stateId:'swap', low:i, mid:j, array:[...arr],
                    narrative:`${arr[j]} > ${key}: movemos ${arr[j]} a la derecha.` });
                j--;
            }
            arr[j+1] = key;
            this._push({ stateId:'fixed', low:j+1, high:i, array:[...arr],
                narrative:`✅ Insertamos ${key} en la posición ${j+1}. Parte izquierda ordenada hasta ${i}.` });
        }
        this._push({ stateId:'complete', array:[...arr], narrative:`🏆 ¡Todas las cartas ordenadas!` });
    }

    // ── Selection Sort ──
    _selectionSort() {
        let arr = [...this.array], n = arr.length;
        this._push({ stateId:'init', array:[...arr], narrative:`🔍 Selection Sort: buscamos el menor en cada ronda.` });
        for (let i = 0; i < n; i++) {
            let minIdx = i;
            for (let j = i+1; j < n; j++) {
                this.comparisons++;
                this._push({ stateId:'checkMatch', low:minIdx, mid:j, array:[...arr], ops:this.comparisons,
                    narrative:`¿arr[${j}]=${arr[j]} < mínimo actual arr[${minIdx}]=${arr[minIdx]}?` });
                if (arr[j] < arr[minIdx]) minIdx = j;
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                this._push({ stateId:'swap', low:i, mid:minIdx, array:[...arr],
                    narrative:`🔄 Menor encontrado en ${minIdx}. Intercambiamos con posición ${i}.` });
            }
            this._push({ stateId:'fixed', low:i, high:i, array:[...arr],
                narrative:`✅ Posición ${i} fija con valor ${arr[i]}.` });
        }
        this._push({ stateId:'complete', array:[...arr], narrative:`🏆 ¡Selección completada! Arreglo ordenado.` });
    }

    // ── DFS (Graph Renderer Example) ──
    _dfs() {
        // Grafo de ejemplo fijo
        const nodes = [
            { x: 300, y: 50,  label: '0' },
            { x: 150, y: 150, label: '1' },
            { x: 450, y: 150, label: '2' },
            { x: 100, y: 250, label: '3' },
            { x: 200, y: 250, label: '4' }
        ];
        const adj = [ [1, 2], [0, 3, 4], [0], [1], [1] ];
        const edges = [
            {from:0,to:1}, {from:0,to:2}, {from:1,to:3}, {from:1,to:4}
        ];
        
        let visited = [false, false, false, false, false];
        let state = () => ({
            nodes: nodes.map((n, i) => ({ ...n, visited: visited[i] })),
            edges: edges.map(e => ({ ...e, visited: (visited[e.from] && visited[e.to]) }))
        });

        this._push({ renderer: 'graph', stateId: 'init', narrative: '🚀 Empezando Búsqueda en Profundidad (DFS). Iniciaremos desde el nodo 0.', data: state() });
        this._runDfsRec(0, visited, adj, nodes, edges, state);
        this._push({ renderer: 'graph', stateId: 'complete', narrative: '🏆 Recorrido DFS completado. Todos los nodos conectados fueron visitados.', data: state() });
    }

    _runDfsRec(v, visited, adj, nodes, edges, state) {
        visited[v] = true;
        let s = state(); s.nodes[v].active = true;
        this._push({ renderer: 'graph', stateId: 'found', narrative: `Marcamos el nodo ${v} como visitado (verde).`, data: s });
        
        for (let n of adj[v]) {
            if (!visited[n]) {
                let st = state(); st.nodes[v].active = true; st.nodes[n].active = true;
                this._push({ renderer: 'graph', stateId: 'checkMatch', narrative: `Explorando vecino ${n} desde el nodo ${v}...`, data: st });
                this._runDfsRec(n, visited, adj, nodes, edges, state);
                
                let sb = state(); sb.nodes[v].active = true;
                this._push({ renderer: 'graph', stateId: 'checkMatch', narrative: `⬅️ Retrocediendo de vuelta al nodo ${v} (Backtrack).`, data: sb });
            }
        }
    }

    // ── N-Queens (Board Renderer Example) ──
    _nQueens() {
        const N = 4; // Simplificado a 4 reinas para visualización didáctica corta
        let queens = [];
        let state = () => ({ size: N, queens: [...queens.map(q => ({...q}))] });

        this._push({ renderer: 'board', stateId: 'init', narrative: `👑 Solucionando el problema de ${N}-Reinas con Backtracking.`, data: state() });
        this._solveNQRec(0, N, queens, state);
        this._push({ renderer: 'board', stateId: 'complete', narrative: `🏆 ¡Solución encontrada para ${N}-Reinas!`, data: state() });
    }

    _solveNQRec(col, N, queens, state) {
        if (col >= N) return true;
        for (let i = 0; i < N; i++) {
            this._push({ renderer: 'board', stateId: 'checkMatch', narrative: `Probando reina en fila ${i}, columna ${col}.`, data: state() });
            if (this._isSafeQueen(i, col, queens)) {
                queens.push({ r: i, c: col, active: true });
                this._push({ renderer: 'board', stateId: 'found', narrative: `✅ Es segura. Colocamos Reina temporalmente en (${i}, ${col}).`, data: state() });
                
                if (this._solveNQRec(col + 1, N, queens, state)) return true;
                
                // Backtrack
                queens.pop();
                let sb = state();
                this._push({ renderer: 'board', stateId: 'notFound', narrative: `🚫 Callejón sin salida. Hacemos BACKTRACK y quitamos la reina de (${i}, ${col}).`, data: sb });
            }
        }
        return false;
    }

    _isSafeQueen(row, col, queens) {
        for (let q of queens) {
            if (q.r === row) return false;
            // Diagonal
            if (Math.abs(q.r - row) === Math.abs(q.c - col)) return false;
        }
        return true;
    }

    // ── Linear Regression (Cartesian Renderer Example) ──
    _linearReg() {
        const points = [ {x:0.1,y:0.2}, {x:0.3,y:0.35}, {x:0.5,y:0.4}, {x:0.7,y:0.6}, {x:0.9,y:0.85} ];
        let state = (line) => ({ points, line });

        this._push({ renderer: 'cartesian', stateId: 'init', narrative: '📊 Regresión Lineal. Tenemos estos puntos (x,y) esparcidos en el plano.', data: state(null) });
        this._push({ renderer: 'cartesian', stateId: 'checkMatch', narrative: 'Empezamos iteraciones de mínimos cuadrados para encontrar la mejor pendiente.', data: state({x1:0, y1:0, x2:1, y2:0.2}) });
        this._push({ renderer: 'cartesian', stateId: 'swap', narrative: 'Ajustando pendiente... Menimizando el error cuadrático.', data: state({x1:0, y1:0.1, x2:1, y2:0.5}) });
        
        // Exact solution calculations
        let n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        points.forEach(p => { sumX += p.x; sumY += p.y; sumXY += p.x*p.y; sumXX += p.x*p.x; });
        let m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        let b = (sumY - m * sumX) / n;

        this._push({ renderer: 'cartesian', stateId: 'complete', narrative: `🏆 Convergencia. Línea óptima hallada: y = ${m.toFixed(2)}x + ${b.toFixed(2)}`, data: state({x1:0, y1:b, x2:1, y2:m*1+b}) });
    }

    // ── Merge Sort (Recursive with Steps) ──
    _mergeSort() {
        let arr = [...this.array];
        this._push({ stateId:'init', array:[...arr], narrative:'🚀 Inicia Merge Sort: El gran "Divide y Vencerás".' });
        this._mergeSortRec(arr, 0, arr.length - 1);
        this._push({ stateId:'complete', array:[...arr], narrative:'🏆 ¡Arreglo unido y ordenado perfectamente!' });
    }

    _mergeSortRec(arr, l, r) {
        if (l < r) {
            let m = Math.floor((l + r) / 2);
            this._push({ stateId:'checkMatch', low:l, high:r, mid:m, array:[...arr], 
                narrative:`Dividiendo el grupo [${l} a ${r}] en dos: [${l} a ${m}] y [${m+1} a ${r}].` });
            
            this._mergeSortRec(arr, l, m);
            this._mergeSortRec(arr, m + 1, r);
            this._merge(arr, l, m, r);
        }
    }

    _merge(arr, l, m, r) {
        let temp = [];
        let i = l, j = m + 1;
        
        this._push({ stateId:'calcMid', low:l, high:r, mid:m, array:[...arr],
            narrative:`Comparando y uniendo los dos grupos: de ${l} a ${m} y de ${m+1} a ${r}.` });

        while (i <= m && j <= r) {
            this.comparisons++;
            if (arr[i] <= arr[j]) {
                this._push({ stateId:'checkMatch', low:i, mid:j, array:[...arr], narrative:`${arr[i]} ≤ ${arr[j]}: tomamos del grupo izquierdo.` });
                temp.push(arr[i++]);
            } else {
                this._push({ stateId:'checkMatch', low:i, mid:j, array:[...arr], narrative:`${arr[i]} > ${arr[j]}: tomamos del grupo derecho.` });
                temp.push(arr[j++]);
            }
        }

        while (i <= m) temp.push(arr[i++]);
        while (j <= r) temp.push(arr[j++]);

        for (let k = 0; k < temp.length; k++) {
            arr[l + k] = temp[k];
        }
        
        this._push({ stateId:'fixed', low:l, high:r, array:[...arr], 
            narrative:`✅ Grupo entre ${l} y ${r} ha sido unido y ordenado.` });
    }

    // ── Quick Sort (Recursive with Steps) ──
    _quickSort() {
        let arr = [...this.array];
        this._push({ stateId:'init', array:[...arr], narrative:'🚀 Quick Sort: ¡Buscando al Líder (Pivote)!' });
        this._quickSortRec(arr, 0, arr.length - 1);
        this._push({ stateId:'complete', array:[...arr], narrative:'🏆 ¡Todo ordenado gracias a los pivotes!' });
    }

    _quickSortRec(arr, low, high) {
        if (low < high) {
            let pi = this._partition(arr, low, high);
            this._quickSortRec(arr, low, pi - 1);
            this._quickSortRec(arr, pi + 1, high);
        }
    }

    _partition(arr, low, high) {
        let pivot = arr[high];
        this._push({ stateId:'init', low:high, array:[...arr], 
            narrative:`🎯 Elegimos ${pivot} como líder (Pivote) del grupo de ${low} a ${high}.` });
        
        let i = low - 1;
        for (let j = low; j < high; j++) {
            this.comparisons++;
            this._push({ stateId:'checkMatch', low:j, mid:high, array:[...arr], ops:this.comparisons,
                narrative:`¿${arr[j]} es menor que el líder ${pivot}?` });
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                this._push({ stateId:'swap', low:i, mid:j, array:[...arr], 
                    narrative:`🔄 ${arr[i]} es menor, lo movemos a la zona de la izquierda.` });
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        this._push({ stateId:'fixed', low:i+1, array:[...arr], 
            narrative:`✅ Colocamos al líder ${pivot} en su lugar correcto (pos ${i+1}).` });
        
        return i + 1;
    }

    // ── Heap Sort ──
    _heapSort() {
        let arr = [...this.array], n = arr.length;
        this._push({ stateId:'init', renderer:'tree', array:[...arr], narrative:'🌳 Heap Sort: Construyendo el árbol (Max Heap).' });
        
        // Build heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this._heapify(arr, n, i);
        }

        // Extract
        for (let i = n - 1; i > 0; i--) {
            this._push({ stateId:'swap', renderer:'tree', low:0, mid:i, array:[...arr], narrative:`Moviendo la corona 👑 (${arr[0]}) al final del arreglo.` });
            [arr[0], arr[i]] = [arr[i], arr[0]];
            this._push({ stateId:'fixed', renderer:'tree', low:i, array:[...arr], narrative:`✅ El mayor quedó en su posición final.` });
            this._heapify(arr, i, 0);
        }
        this._push({ stateId:'complete', renderer:'tree', array:[...arr], narrative:'🏆 ¡Árbol ordenado perfectamente!' });
    }

    _heapify(arr, n, i) {
        let largest = i, left = 2*i + 1, right = 2*i + 2;
        this._push({ stateId:'calcMid', renderer:'tree', low:i, mid:left, high:right, array:[...arr], narrative:`Revisando nodo raíz ${arr[i]} y sus hijos.` });

        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;

        if (largest !== i) {
            this._push({ stateId:'swap', renderer:'tree', low:i, mid:largest, array:[...arr], narrative:`🔄 Hijo (${arr[largest]}) es mayor que raíz (${arr[i]}). Intercambiando.` });
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            this._heapify(arr, n, largest);
        }
    }

    // ── Radix Sort ──
    _radixSort() {
        let arr = [...this.array];
        let max = Math.max(...arr);
        this._push({ stateId:'init', array:[...arr], narrative:'🔢 Radix Sort: Iniciamos el ordenamiento por dígitos.' });

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            this._push({ stateId:'calcMid', array:[...arr], narrative: `Ordenando por el dígito de las ${exp === 1 ? 'Unidades' : exp === 10 ? 'Decenas' : 'Centenas'}.` });
            this._countSortForRadix(arr, exp);
            this._push({ stateId:'fixed', array:[...arr], narrative: `✅ Ronda terminada para el dígito ${exp}.` });
        }
        this._push({ stateId:'complete', array:[...arr], narrative:'🏆 ¡Radix Sort completado! Números ordenados por partes.' });
    }

    _countSortForRadix(arr, exp) {
        let n = arr.length, output = new Array(n), count = new Array(10).fill(0);
        for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;
        for (let i = 1; i < 10; i++) count[i] += count[i - 1];

        for (let i = n - 1; i >= 0; i--) {
            let digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
            // Narrative step for placing
            this._push({ stateId:'checkMatch', low:i, array:[...output], narrative: `Colocando ${arr[i]} en su nueva posición basada en el dígito.` });
        }
        for (let i = 0; i < n; i++) arr[i] = output[i];
    }
}
