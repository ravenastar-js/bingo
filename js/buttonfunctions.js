const lockButton = document.getElementById('lock-button');
const clearCellsButton = document.getElementById('clear-cells-button');

const lockCells = () => {
    const cells = document.querySelectorAll('.celula');
    const anyEditable = Array.from(cells)
        .some(cell => cell.contentEditable === "true");
    
    cells.forEach(cell => {
        cell.contentEditable = anyEditable ? "false" : "true";
        if (cell.contentEditable === "false") {
            cell.classList.add('locked');
        } else {
            cell.classList.remove('locked');
        }
    });
    
    lockButton.innerHTML = anyEditable ? '<i class="fas fa-lock"></i> Bloqueado' : '<i class="fas fa-lock-open"></i> Liberado';
    lockButton.classList.toggle('locked', !anyEditable);
    lockButton.classList.toggle('unlocked', anyEditable);
};

const clearCells = () => {
    const cells = document.querySelectorAll('.celula');
    cells.forEach(cell => cell.textContent = '');
    updateClearButtonState();
    updateSaveButtonState(); // Adiciona a chamada aqui
    updateTableTitle('Título do Bingo');
};

const setupButtonFunctions = () => {
    lockButton.addEventListener('click', lockCells);
    clearCellsButton.addEventListener('click', clearCells);
};

document.addEventListener('DOMContentLoaded', setupButtonFunctions);
