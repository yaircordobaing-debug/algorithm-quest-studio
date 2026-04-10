class Visualizer {
    constructor() {
        this.layers = {
            array: document.getElementById('render-array'),
            graph: document.getElementById('render-graph'),
            cartesian: document.getElementById('render-cartesian'),
            tree: document.getElementById('render-tree'),
            radix: document.getElementById('render-radix'),
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

        this.treeCanvas   = document.getElementById('tree-canvas');
        this.treeCtx      = this.treeCanvas ? this.treeCanvas.getContext('2d') : null;

        this.boardGrid    = document.getElementById('board-grid');

        this.radixLayer   = document.getElementById('render-radix');
        this.radixMain    = document.getElementById('radix-main-row');
        this.radixBuckets = document.getElementById('radix-buckets');

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
            // Trigger animation
            this.narrativeText.classList.remove('narrative-text-animate');
            void this.narrativeText.offsetWidth; // trigger reflow
            this.narrativeText.classList.add('narrative-text-animate');
        }
        this.highlightLine(step.stateId);

        const r = step.renderer || 'array';
        this.switchLayer(r);

        if (r === 'array') { this._applyArrayState(step); }
        else if (r === 'graph') { this._applyGraphState(step); }
        else if (r === 'board') { this._applyBoardState(step); }
        else if (r === 'cartesian') { this._applyCartesianState(step); }
        else if (r === 'tree') { this._applyTreeState(step); }
        else if (r === 'radix') { this._applyRadixState(step); }
    }

    // ── ARRAY RENDERER ──
    renderChests(array) {
        this.chestRow.innerHTML = '';
        this.chests = [];
        this.chestRow.style.position = 'relative';
        this.chestRow.style.height = '60px';
        this.chestRow.style.width = '100%';
        this.chestRow.style.maxWidth = '700px';

        const itemWidth = 52;
        const gap = 12;
        const totalW = array.length * itemWidth + (array.length - 1) * gap;
        let startX = (this.chestRow.offsetWidth - totalW) / 2;
        if (startX < 0) startX = 0;

        array.forEach((val, idx) => {
            const el = document.createElement('div');
            el.className = 'chest';
            el.id = `chest-${idx}`;
            el.textContent = val;
            el.style.position = 'absolute';
            el.style.left = (startX + idx * (itemWidth + gap)) + 'px';
            el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.chestRow.appendChild(el);
            this.chests.push(el);
        });
        this.switchLayer('array');
    }

    _getLeft(index) {
        if (index < 0 || index >= this.chests.length) return -999;
        return parseFloat(this.chests[index].style.left) + 26; // 26 is half width
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
            
            // Update value if changed (for Radix Sort or complex swaps)
            if (state.array && state.array[idx] !== undefined) {
                ch.textContent = state.array[idx];
            }

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

    _applyTreeState(state) {
        if (!this.treeCtx) return;
        const ctx = this.treeCtx;
        const w = this.treeCanvas.width, h = this.treeCanvas.height;
        ctx.clearRect(0, 0, w, h);

        const arr = state.array || [];
        if (arr.length === 0) return;

        const nodes = [];
        const n = arr.length;
        const levels = Math.ceil(Math.log2(n + 1));
        const vSpace = h / (levels + 1);

        // Calculate positions
        for (let i = 0; i < n; i++) {
            const level = Math.floor(Math.log2(i + 1));
            const nodesInLevel = Math.pow(2, level);
            const posInLevel = i - (nodesInLevel - 1);
            const x = (w / (nodesInLevel + 1)) * (posInLevel + 1);
            const y = (level + 1) * vSpace;
            nodes.push({ x, y, val: arr[i] });
        }

        // Draw Edges
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; 
        for (let i = 0; i < n; i++) {
            const l = 2*i + 1, r = 2*i + 2;
            if (l < n) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[l].x, nodes[l].y);
                ctx.stroke();
            }
            if (r < n) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[r].x, nodes[r].y);
                ctx.stroke();
            }
        }

        // Draw Nodes
        nodes.forEach((node, idx) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 18, 0, 2*Math.PI);
            
            // Color logic
            let border = '#6366f1'; // Default (Indigo)
            let fill = '#1e1e2e'; // Surface
            
            if (state.stateId === 'swap' && (idx === state.low || idx === state.mid)) border = '#a855f7'; // Purple
            if (state.stateId === 'calcMid' && idx === state.low) border = '#f59e0b'; // Amber (Root)
            if (state.stateId === 'fixed' && idx === state.low) border = '#10b981'; // Green (Sorted)

            ctx.fillStyle = fill;
            ctx.fill();
            ctx.strokeStyle = border;
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px JetBrains Mono';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.val, node.x, node.y);
        });
    }

    _applyRadixState(state) {
        if (!this.radixLayer) return;
        
        // Setup internal buckets if empty
        if (this.radixBuckets.innerHTML.trim() === '') {
            for (let i = 0; i < 10; i++) {
                const b = document.createElement('div');
                b.className = 'radix-bucket';
                b.id = `bucket-${i}`;
                b.setAttribute('data-label', i);
                this.radixBuckets.appendChild(b);
            }
        }

        // Main Row (top array)
        this.radixMain.innerHTML = '';
        const arr = state.array || [];
        arr.forEach((val, idx) => {
            const ch = document.createElement('div');
            ch.className = 'chest radix-item';
            // Highlight if we are collecting/distributing this index
            const data = state.data || {};
            if (data.activeIdx === idx) ch.classList.add('active');
            
            ch.innerHTML = this._formatRadixValue(val, data.exp);
            this.radixMain.appendChild(ch);
        });

        // Buckets
        const buckets = state.data?.buckets || [];
        for (let i = 0; i < 10; i++) {
            const bDiv = document.getElementById(`bucket-${i}`);
            if (bDiv) {
                bDiv.innerHTML = '';
                const items = buckets[i] || [];
                items.forEach(val => {
                    const item = document.createElement('div');
                    item.className = 'chest radix-item';
                    item.innerHTML = this._formatRadixValue(val, state.data?.exp);
                    bDiv.appendChild(item);
                });
            }
        }
    }

    _formatRadixValue(val, exp) {
        if (!exp) return val;
        const s = val.toString();
        // Calculate digit position from right (1=last, 10=second last, etc.)
        const power = Math.round(Math.log10(exp));
        const idx = s.length - 1 - power;
        
        if (idx < 0 || idx >= s.length) return val;
        
        const chars = s.split('');
        chars[idx] = `<span class="digit-active">${chars[idx]}</span>`;
        return chars.join('');
    }
}
