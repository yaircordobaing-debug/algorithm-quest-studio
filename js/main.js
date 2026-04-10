document.addEventListener('DOMContentLoaded', () => {
    // Shared state array across logic
    const defaultArray = [4, 8, 15, 16, 23, 42, 55, 67, 89, 99, 105, 112, 120];
    const inputTarget = document.getElementById('input-target');
    
    const visualizer = new Visualizer();
    let engine = null;
    let currentSteps = [];
    let currentStepIndex = 0;
    
    const btnStart = document.getElementById('btn-start');
    const btnNext = document.getElementById('btn-next');
    const btnReset = document.getElementById('btn-reset');
    const selectAlgo = document.getElementById('select-algo');
    
    // Automatically grab level parameter from current script data attribute
    const currentScript = document.querySelector('script[data-level]');
    if (currentScript && currentScript.getAttribute('data-level') === 'binary') {
        visualizer.currentAlgo = 'binary_iterative';
    } else {
        visualizer.currentAlgo = 'linear_iterative';
    }
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            visualizer.currentLang = e.target.getAttribute('data-lang');
            visualizer.renderCode(visualizer.currentLang, visualizer.currentAlgo);
            if (engine && currentStepIndex > 0) {
                visualizer.highlightLine(currentSteps[currentStepIndex - 1].stateId);
            }
        });
    });

    selectAlgo.addEventListener('change', (e) => {
        visualizer.currentAlgo = e.target.value;
        visualizer.renderCode(visualizer.currentLang, visualizer.currentAlgo);
    });
    
    function init() {
        visualizer.currentAlgo = selectAlgo.value;
        visualizer.renderCode(visualizer.currentLang, visualizer.currentAlgo);
        visualizer.renderChests(defaultArray);
        
        visualizer.valLow.textContent = '-';
        if(visualizer.valMid) visualizer.valMid.textContent = '-';
        if(visualizer.valHigh) visualizer.valHigh.textContent = '-';
        
        visualizer.ptrLow.style.display = 'none';
        visualizer.ptrMid.style.display = 'none';
        visualizer.ptrHigh.style.display = 'none';
        
        selectAlgo.disabled = false;
        inputTarget.disabled = false;
        
        setTimeout(() => { window.dispatchEvent(new Event('resize')); }, 200);
    }
    
    btnStart.addEventListener('click', () => {
        const selectedTarget = parseInt(inputTarget.value) || 0;
        visualizer.currentAlgo = selectAlgo.value;
        
        engine = new AlgorithmEngine(defaultArray, selectedTarget);
        currentSteps = engine.generateSteps(visualizer.currentAlgo);
        currentStepIndex = 0;
        
        btnStart.disabled = true;
        btnNext.disabled = false;
        selectAlgo.disabled = true;
        inputTarget.disabled = true;
        
        nextStep();
    });
    
    btnNext.addEventListener('click', () => {
        nextStep();
    });
    
    btnReset.addEventListener('click', () => {
        engine = null;
        currentStepIndex = 0;
        currentSteps = [];
        btnStart.disabled = false;
        btnNext.disabled = true;
        visualizer.highlightLine(null);
        visualizer.narrativeText.textContent = "Establece un objetivo numérico y presiona 'Iniciar Búsqueda'.";
        init();
        visualizer.chests.forEach(chest => chest.classList.remove('inactive', 'target-found'));
    });
    
    function nextStep() {
        if (!engine || currentStepIndex >= currentSteps.length) {
            btnNext.disabled = true;
            return;
        }
        
        const step = currentSteps[currentStepIndex];
        // For linear algorithms, we pass current algo to visualizer so it knows what to hide
        step.algoType = visualizer.currentAlgo;
        visualizer.applyState(step);
        currentStepIndex++;
        
        if (currentStepIndex >= currentSteps.length) {
            btnNext.disabled = true;
        }
    }
    
    window.addEventListener('resize', () => {
        if (engine && currentStepIndex > 0) {
            visualizer.applyState(currentSteps[currentStepIndex - 1]);
        }
    });

    init();
});
