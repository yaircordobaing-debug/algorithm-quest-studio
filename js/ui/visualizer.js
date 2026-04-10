class Visualizer {
    constructor() {
        this.layers = {
            array: document.getElementById('render-array'),
            graph: document.getElementById('render-graph'),
            cartesian: document.getElementById('render-cartesian'),
            board: document.getElementById('render-board')
        };
        this.chests       = [];
        this.chestRow     = document.getElementById('chest-row');
        this.ptrLow       = document.getElementById('ptr-low');
        this.ptrMid       = document.getElementById('ptr-mid');
        this.ptrHigh      = document.getElementById('ptr-high');
        
        this.graphCanvas  = document.getElementById('graph-canvas');
        this.graphCtx     = this.graphCanvas ? this.graphCanvas.getContext('2d') : null;
        
        this.cartCanvas   = document.getElementById('cartesian-canvas');
        this.cartCtx      = this.cartCanvas ? this.cartCanvas.getContext('2d') : null;
        
        this.boardGrid    = document.getElementById('board-grid');

        this.narrativeText= document.getElementById('narrative-text');
        this.codeDisplay  = document.getElementById('code-display');
        this.currentLang  = 'java';
        this.currentAlgo  = 'linear_search_iterative';
        this.activeLayer  = 'array';
    }

    renderCode(lang, algo) {
        if (!codeSnippets || !codeSnippets[algo] || !codeSnippets[algo][lang]) {
            if (this.codeDisplay) this.codeDisplay.innerHTML = '<span class="code-line" style="color:#555">// Snippet próximamente</span>';
            return;
        }
        const lines = codeSnippets[algo][lang].split('\n');
        this.codeDisplay.innerHTML = '';
        lines.forEach((line, i) => {
            const span = document.createElement('span');
            span.className = 'code-line';
            span.id = `code-line-${i}`;
            span.textContent = line || ' ';
            this.codeDisplay.appendChild(span);
            this.codeDisplay.appendChild(document.createElement('br'));
        });
    }

    highlightLine(stateId) {
        document.querySelectorAll('.code-line').forEach(el => el.classList.remove('highlight'));
        if (!stateId || !lineHighlights || !lineHighlights[this.currentAlgo]) return;
        const map = lineHighlights[this.currentAlgo][this.currentLang];
        if (!map || !map[stateId]) return;
        map[stateId].forEach(idx => {
            const el = document.getElementById(`code-line-${idx}`);
            if (el) {
                el.classList.add('highlight');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    switchLayer(layerName) {
        if (!layerName) layerName = 'array';
        Object.values(this.layers).forEach(l => { if (l) l.classList.remove('active'); });
        if (this.layers[layerName]) {
            this.layers[layerName].classList.add('active');
            this.activeLayer = layerName;
        }
    }

    applyState(step) {
        if (step.narrative && this.narrativeText) {
            this.narrativeText.textContent = step.narrative;
        }
        this.highlightLine(step.stateId);

        const r = step.renderer || 'array';
        this.switchLayer(r);

        if (r === 'array') { this._applyArrayState(step); }
        else if (r === 'graph') { this._applyGraphState(step); }
        else if (r === 'board') { this._applyBoardState(step); }
        else if (r === 'cartesian') { this._applyCartesianState(step); }
    }

    // ── ARRAY RENDERER ──
    renderChests(array) {
        this.chestRow.innerHTML = '';
        this.chests = [];
        array.forEach((val, idx) => {
            const el = document.createElement('div');
            el.className = 'chest';
            el.id = `chest-${idx}`;
            el.textContent = val;
            this.chestRow.appendChild(el);
            this.chests.push(el);
        });
        this.switchLayer('array');
    }

    _getLeft(index) {
        if (index < 0 || index >= this.chests.length) return -999;
        const cr = this.chestRow.getBoundingClientRect();
        const er = this.chests[index].getBoundingClientRect();
        return (er.left - cr.left) + er.width / 2;
    }

    _applyArrayState(state) {
        const type     = state.algoType || this.currentAlgo;
        const isLinear = type.includes('linear');
        const isBinary = type.includes('binary');
        const isSort   = type.includes('sort') && !type.includes('topo');

        const showPtr = (el, idx) => {
            if (el && idx !== null && idx !== undefined && idx >= 0 && idx < this.chests.length) {
                el.style.display = 'block';
                el.style.left    = this._getLeft(idx) + 'px';
            } else if (el) { el.style.display = 'none'; }
        };

        showPtr(this.ptrLow,  state.low);
        showPtr(this.ptrHigh, (!isLinear && !isSort) ? state.high : null);
        showPtr(this.ptrMid,  (!isLinear || isSort)  ? state.mid  : null);

        this.chests.forEach((ch, idx) => {
            ch.classList.remove('active', 'inactive', 'found', 'sorted', 'swap-hi');
            ch.style.border = '';
            if (isBinary) {
                if (state.low  != null && idx < state.low)  ch.classList.add('inactive');
                if (state.high != null && idx > state.high) ch.classList.add('inactive');
                if (idx === state.mid) ch.classList.add('active');
            } else if (isLinear) {
                if (state.low != null && idx < state.low) ch.classList.add('inactive');
                if (idx === state.low)                    ch.classList.add('active');
            } else if (isSort) {
                if (idx === state.low) ch.classList.add('active');
                if (idx === state.mid) ch.classList.add('swap-hi');
            }
        });

        if (state.stateId === 'found' && state.mid != null && this.chests[state.mid]) {
            this.chests[state.mid].classList.add('found');
        }
        if (state.stateId === 'found' && state.low != null && isLinear && this.chests[state.low]) {
            this.chests[state.low].classList.add('found');
        }

        if (isSort) {
            // Quick Sort pivot high
            if (type === 'quick_sort' && state.stateId === 'init' && state.low != null) {
                if (this.chests[state.low]) this.chests[state.low].classList.add('active');
            }

            if (state.stateId === 'fixed') {
                if (state.low != null && state.high != null) {
                    const isBubble = type.includes('bubble');
                    const start = isBubble ? state.high : state.low;
                    for (let k = start; k < (isBubble ? this.chests.length : state.high + 1); k++) {
                        if (this.chests[k]) this.chests[k].classList.add('sorted');
                    }
                } else if (state.low != null) {
                   if (this.chests[state.low]) this.chests[state.low].classList.add('sorted');
                }
            }
            if (state.stateId === 'complete') {
                this.chests.forEach(c => c.classList.add('sorted'));
            }
        }
    }

    // ── GRAPH RENDERER ──
    _applyGraphState(state) {
        if (!this.graphCtx) return;
        const ctx = this.graphCtx;
        const w = this.graphCanvas.width, h = this.graphCanvas.height;
        ctx.clearRect(0, 0, w, h);
        
        const nodes = state.data.nodes || [];
        const edges = state.data.edges || [];
        
        ctx.lineWidth = 2;
        edges.forEach(e => {
            const n1 = nodes[e.from], n2 = nodes[e.to];
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = e.visited ? 'var(--green)' : 'var(--txt3)';
            ctx.stroke();
        });

        nodes.forEach((n, i) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 16, 0, 2*Math.PI);
            ctx.fillStyle = n.active ? 'var(--accent)' : (n.visited ? 'var(--green)' : 'var(--surface2)');
            ctx.fill();
            ctx.strokeStyle = 'var(--border)';
            ctx.stroke();
            ctx.fillStyle = '#fff';
            ctx.font = '12px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(n.label || i, n.x, n.y);
        });
    }

    // ── BOARD RENDERER ──
    _applyBoardState(state) {
        if (!this.boardGrid) return;
        const size = state.data.size || 8;
        const queens = state.data.queens || []; 
        this.boardGrid.style.gridTemplateColumns = `repeat(${size}, 30px)`;
        this.boardGrid.style.gridTemplateRows = `repeat(${size}, 30px)`;
        this.boardGrid.innerHTML = '';
        
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                const cell = document.createElement('div');
                cell.className = 'board-cell ' + ((r + c) % 2 === 1 ? 'black' : '');
                
                // Check if queen is here
                const hasQueen = queens.find(q => q.r === r && q.c === c);
                if (hasQueen) {
                    cell.textContent = '♛';
                    cell.style.color = hasQueen.active ? 'var(--accent)' : '#000';
                    cell.classList.add('queen');
                }
                this.boardGrid.appendChild(cell);
            }
        }
    }

    // ── CARTESIAN RENDERER ──
    _applyCartesianState(state) {
        if (!this.cartCtx) return;
        const ctx = this.cartCtx;
        const w = this.cartCanvas.width, h = this.cartCanvas.height;
        ctx.clearRect(0, 0, w, h);
        
        const points = state.data.points || [];
        const line = state.data.line || null;

        // Draw axes
        ctx.strokeStyle = 'var(--border)';
        ctx.beginPath(); ctx.moveTo(20, h-20); ctx.lineTo(w-20, h-20); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20, h-20); ctx.lineTo(20, 20); ctx.stroke();

        // Points
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(20 + p.x * (w-40), h - 20 - p.y * (h-40), 4, 0, 2*Math.PI);
            ctx.fillStyle = p.highlight ? 'var(--accent)' : 'var(--txt2)';
            ctx.fill();
        });

        // Regression line
        if (line) {
            ctx.strokeStyle = 'var(--accent)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(20 + line.x1 * (w-40), h - 20 - line.y1 * (h-40));
            ctx.lineTo(20 + line.x2 * (w-40), h - 20 - line.y2 * (h-40));
            ctx.stroke();
        }
    }
}
