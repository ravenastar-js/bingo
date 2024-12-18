const adjustGridSize = () => {
    const grid = document.getElementById('bingo-grid');
    const rows = parseInt(grid.style.getPropertyValue('--rows'));
    const cols = parseInt(grid.style.getPropertyValue('--cols'));
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
};

window.addEventListener('resize', adjustGridSize);
document.addEventListener('DOMContentLoaded', adjustGridSize);


const updateClearButtonState = () => {
    const clearCellsButton = document.getElementById('clear-cells-button');
    const cells = document.querySelectorAll('.celula');
    const anyNonEmpty = Array.from(cells)
        .some(cell => cell.textContent.trim() !== '');
    clearCellsButton.disabled = !anyNonEmpty;
    clearCellsButton.classList.toggle('disabled', !anyNonEmpty);
    clearCellsButton.classList.toggle('red', !anyNonEmpty);
    clearCellsButton.classList.toggle('green', anyNonEmpty);
};


const createGrid = (rows, cols) => {
    const bingoGrid = document.getElementById('bingo-grid');
    bingoGrid.innerHTML = '';
    bingoGrid.style.setProperty('--rows', rows);
    bingoGrid.style.setProperty('--cols', cols);
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('celula');
        cell.contentEditable = "true";
        
        cell.addEventListener('click', () => {
            if (cell.contentEditable === "false") {
                cell.classList.toggle('selected');
            }
            updateClearButtonState();
        });
        
        cell.addEventListener('focus', (event) => {
            const range = document.createRange();
            range.selectNodeContents(cell);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });
        
        cell.addEventListener('input', () => {
            updateClearButtonState();
            updateSaveButtonState(); // Adiciona a chamada aqui
        });
        
        bingoGrid.appendChild(cell);
    }
    adjustGridSize();
    updateClearButtonState();
    updateSaveButtonState(); // Adiciona a chamada aqui
};

const applySizeButton = document.getElementById('apply-size');
applySizeButton.addEventListener('click', () => {
    let rows = parseInt(document.getElementById('grid-rows')
        .value);
    let cols = parseInt(document.getElementById('grid-cols')
        .value);
    
    if (document.getElementById('grid-rows')
        .value === 'custom') {
        rows = parseInt(document.getElementById('custom-rows')
            .value);
    }
    if (document.getElementById('grid-cols')
        .value === 'custom') {
        cols = parseInt(document.getElementById('custom-cols')
            .value);
    }
    
    createGrid(rows, cols);
});





const setupGridFunctions = () => {
    createGrid(4, 4);
};

