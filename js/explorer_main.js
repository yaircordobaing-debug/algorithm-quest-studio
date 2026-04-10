document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const algoId = urlParams.get('id') || 'linear_search';
    
    // Load metadata
    const meta = algorithmsMetadata[algoId];
    if (!meta) {
        window.location.href = 'index.html';
        return;
    }

    // Inject Theory
    document.getElementById('algo-breadcrumb').textContent = `${meta.category} > ${meta.name}`;
    document.getElementById('theory-name').textContent = meta.name;
    document.getElementById('theory-body').innerHTML = meta.theory;
    document.getElementById('theory-complexity').textContent = meta.complexity;

    const visualizer = new Visualizer();
    let engine = null;
    let currentSteps = [];
    let currentStepIndex = 0;
    
    const defaultArray = [4, 8, 15, 16, 23, 42, 55, 67, 89];
    const btnStart = document.getElementById('btn-start');
    const btnNext = document.getElementById('btn-next');
    const btnReset = document.getElementById('btn-reset');
    const opsCounter = document.getElementById('ops-counter');
    const stepIndexSpan = document.getElementById('step-index');
    const stepTotalSpan = document.getElementById('step-total');
    const narrativeText = document.getElementById('narrative-text');

    // Setup initial view
    visualizer.currentAlgo = algoId + '_iterative';
    if (algoId === 'bubble_sort') visualizer.currentAlgo = 'bubble_sort';
    
    visualizer.renderCode('java', visualizer.currentAlgo);
    visualizer.renderChests(defaultArray);
    
    btnStart.addEventListener('click', () => {
        engine = new AlgorithmEngine(defaultArray, 42); // 42 is fixed target for searching for now
        currentSteps = engine.generateSteps(visualizer.currentAlgo);
        currentStepIndex = 0;
        
        btnStart.disabled = true;
        btnNext.disabled = false;
        stepTotalSpan.textContent = currentSteps.length;
        
        nextStep();
    });

    btnNext.addEventListener('click', nextStep);

    btnReset.addEventListener('click', () => {
        location.reload();
    });

    function nextStep() {
        if (currentStepIndex >= currentSteps.length) {
            btnNext.disabled = true;
            return;
        }

        const step = currentSteps[currentStepIndex];
        step.algoType = visualizer.currentAlgo;
        
        // If the step has an array (sorting), update chests
        if (step.array) {
            visualizer.renderChests(step.array);
        }

        visualizer.applyState(step);
        
        if (step.ops) opsCounter.textContent = `${step.ops} Operaciones`;
        
        currentStepIndex++;
        stepIndexSpan.textContent = currentStepIndex;

        if (currentStepIndex >= currentSteps.length) {
            btnNext.disabled = true;
        }
    }
});
