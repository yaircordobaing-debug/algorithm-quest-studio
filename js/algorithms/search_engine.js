class AlgorithmEngine {
    constructor(array, target) {
        this.array = array;
        this.target = target;
        this.steps = []; 
        this.comparisons = 0;
    }
    
    getComplexityMetadata(algoType) {
        const metadata = {
            'linear_iterative': { notation: 'O(n)', name: 'Lineal', description: 'Revisa cada elemento una vez.' },
            'linear_recursive': { notation: 'O(n)', name: 'Lineal (Recursiva)', description: 'Usa la pila de llamadas para recorrer el arreglo.' },
            'binary_iterative': { notation: 'O(log n)', name: 'Logarítmica', description: 'Divide el espacio de búsqueda a la mitad en cada paso.' },
            'binary_recursive': { notation: 'O(log n)', name: 'Logarítmica (Recursiva)', description: 'Divide recursivamente el espacio de búsqueda.' }
        };
        return metadata[algoType] || { notation: '?', name: 'Desconocido', description: '' };
    }

    generateSteps(algoType) {
        this.steps = [];
        this.comparisons = 0;
        if (algoType === 'linear_iterative') this._generateLinearIter();
        if (algoType === 'linear_recursive') this._generateLinearRec(0);
        if (algoType === 'binary_iterative') this._generateBinaryIter();
        if (algoType === 'binary_recursive') this._generateBinaryRec(0, this.array.length - 1);
        return this.steps;
    }

    // --- Lineal Básico --- //
    _generateLinearIter() {
        const metadata = this.getComplexityMetadata('linear_iterative');
        this.steps.push({stateId: 'init', low: 0, high: null, mid: null, complexity: metadata.notation, narrative: "Iteración Iniciada: El bucle for avanza 1 por 1."});
        for (let i = 0; i < this.array.length; i++) {
            this.comparisons++;
            this.steps.push({stateId: 'checkMatch', low: i, high: null, mid: i, ops: this.comparisons, narrative: `¿Contiene el cofre ${i} el valor ${this.target}? (Tiene ${this.array[i]})`});
            if (this.array[i] === this.target) {
                this.steps.push({stateId: 'found', low: i, high: null, mid: i, found: true, ops: this.comparisons, narrative: `¡Hallado en cofre ${i}! Total de comparaciones: ${this.comparisons}`});
                return;
            }
        }
        this.steps.push({stateId: 'notFound', low: this.array.length, high: null, mid: null, found: false, ops: this.comparisons, narrative: "Bucle finalizado. Tesoro no encontrado."});
    }

    _generateLinearRec(i) {
        const metadata = this.getComplexityMetadata('linear_recursive');
        this.steps.push({stateId: 'call', low: i, high: null, mid: i, complexity: metadata.notation, narrative: `[Llamada de Pila] searchRec(i=${i})`});
        
        if (i >= this.array.length) {
            this.steps.push({stateId: 'basecase', low: i, high: null, mid: i, found: false, ops: this.comparisons, narrative: "Caso Base: Superamos el límite de cofres. ¡Retorno fallido!"});
            return;
        }

        this.comparisons++;
        this.steps.push({stateId: 'checkMatch', low: i, high: null, mid: i, ops: this.comparisons, narrative: `Verificando arr[${i}] == ${this.target}... (Tiene ${this.array[i]})`});
        
        if (this.array[i] === this.target) {
            this.steps.push({stateId: 'found', low: i, high: null, mid: i, found: true, ops: this.comparisons, narrative: `¡Condición cumplida! Hallado en la llamada recursiva actual. Total comparaciones: ${this.comparisons}`});
            return;
        }

        this.steps.push({stateId: 'recurse', low: i+1, high: null, mid: i+1, narrative: `No encontrado. Abrimos una nueva capa recursiva (Pila) con i=${i+1}`});
        this._generateLinearRec(i + 1);
    }

    // --- Binario --- //
    _generateBinaryIter() {
        let low = 0;
        let high = this.array.length - 1;
        let mid = -1;
        const metadata = this.getComplexityMetadata('binary_iterative');
        
        this.steps.push({stateId: 'init', low, high, mid: null, complexity: metadata.notation, narrative: "Empezamos bucle while: fijando límites Low y High."});

        while (low <= high) {
            this.steps.push({stateId: 'whileCondition', low, high, mid: null, narrative: `¿Es Low (${low}) <= High (${high})? Sí.`});
            mid = Math.floor(low + (high - low) / 2);
            this.steps.push({stateId: 'calcMid', low, high, mid, narrative: `Calculamos el cofre central: Índice ${mid}.`});
            
            this.comparisons++;
            this.steps.push({stateId: 'checkMatch', low, high, mid, ops: this.comparisons, narrative: `¿Contiene el cofre ${mid} el valor ${this.target}? (Tiene ${this.array[mid]})`});

            if (this.array[mid] === this.target) {
                this.steps.push({stateId: 'found', low, high, mid, found: true, ops: this.comparisons, narrative: `¡Encontrado en cofre ${mid}! Total de comparaciones: ${this.comparisons}`});
                return;
            } 
            
            this.steps.push({stateId: 'checkGreater', low, high, mid, narrative: `¿Es el valor (${this.array[mid]}) MENOR que el objetivo ${this.target}?`});
            
            if (this.array[mid] < this.target) {
                low = mid + 1;
                this.steps.push({stateId: 'moveLow', low, high, mid, narrative: `¡Sí! Subimos el límite Low a ${low}.`});
            } else {
                high = mid - 1;
                this.steps.push({stateId: 'moveHigh', low, high, mid, narrative: `¡No! Bajamos el límite High a ${high}.`});
            }
        }
        
        this.steps.push({stateId: 'notFound', low, high, mid: null, found: false, ops: this.comparisons, narrative: "Low cruzó a High. ¡El tesoro no existe!"});
    }

    _generateBinaryRec(low, high) {
        const metadata = this.getComplexityMetadata('binary_recursive');
        this.steps.push({stateId: 'call', low, high, mid: null, complexity: metadata.notation, narrative: `[Llamada Pila] searchRec(low=${low}, high=${high})`});
        
        if (low > high) {
            this.steps.push({stateId: 'basecase', low, high, mid: null, found: false, ops: this.comparisons, narrative: "Caso Base (Cruce): Low > High. Retornamos fallo."});
            return;
        }

        let mid = Math.floor(low + (high - low) / 2);
        this.steps.push({stateId: 'calcMid', low, high, mid, narrative: `Partimos a la mitad: Índice ${mid}.`});
        
        this.comparisons++;
        this.steps.push({stateId: 'checkMatch', low, high, mid, ops: this.comparisons, narrative: `¿Cofre ${mid} equivale a ${this.target}?`});
        if (this.array[mid] === this.target) {
            this.steps.push({stateId: 'found', low, high, mid, found: true, ops: this.comparisons, narrative: `¡Exacto! Termina la recursión de golpe. Total comparaciones: ${this.comparisons}`});
            return;
        }

        this.steps.push({stateId: 'checkGreater', low, high, mid, narrative: `No. ¿${this.array[mid]} < ${this.target}?`});
        
        if (this.array[mid] < this.target) {
            this.steps.push({stateId: 'moveLow', low: mid+1, high, mid, narrative: `Subimos Low y llamamos recursivamente (Descartando Izq).`});
            this._generateBinaryRec(mid + 1, high);
        } else {
            this.steps.push({stateId: 'moveHigh', low, high: mid-1, mid, narrative: `Bajamos High y llamamos recursivamente (Descartando Der).`});
            this._generateBinaryRec(low, mid - 1);
        }
    }
}
