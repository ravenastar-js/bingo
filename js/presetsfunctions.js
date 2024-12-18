const saveButton = document.getElementById('save-button');
const downloadButton = document.getElementById('download-presets');
const presetFileInput = document.getElementById('preset-file');
const viewPresetsButton = document.getElementById('view-presets-button');


// presetsfunctions.js
const savePreset = () => {
    const tableTitleElement = document.getElementById('table-title');
    const tableTitle = tableTitleElement.textContent.trim();
    
    const cells = document.querySelectorAll('.celula');
    const texts = Array.from(cells)
        .map(cell => cell.textContent.trim());
    
    const presetName = tableTitle;
    const notesText = bingoNotes.value;
    
    console.log("Salvando preset:", presetName);
    console.log("Conteúdo das células:", texts);
    console.log("Anotações:", notesText);
    
    let presets = JSON.parse(localStorage.getItem('bingoPresets')) || {};
    let notes = JSON.parse(localStorage.getItem('bingoNotes')) || {};
    
    presets[presetName] = texts;
    notes[presetName] = notesText;
    
    localStorage.setItem('bingoPresets', JSON.stringify(presets));
    localStorage.setItem('bingoNotes', JSON.stringify(notes));
    
    alert("Preset salvo!");
    updateDownloadButtonState();
    updateViewPresetsButtonState();
    updateSaveButtonState(); // Atualiza o estado do botão "Salvar Preset"
};




const deletePreset = (presetName) => {
    const presets = JSON.parse(localStorage.getItem('bingoPresets'));
    if (presets && presets[presetName]) {
        delete presets[presetName];
        localStorage.setItem('bingoPresets', JSON.stringify(presets));
        showPresets();
        updateDownloadButtonState(); // Chame a função aqui
        updateViewPresetsButtonState(); // Chame a função aqui
    }
};

// Verifique o arquivo inteiro para garantir que não haja múltiplas declarações

// Certifique-se de que isso está definido apenas uma vez
// Remova qualquer duplicata de declarações const, incluindo esta linha extra, se houver outra declaração de showPresets
const showPresets = () => {
    const presetList = document.getElementById('preset-list');
    const searchInput = document.getElementById('preset-search');
    
    presetList.innerHTML = '';
    const presets = JSON.parse(localStorage.getItem('bingoPresets'));
    
    if (presets) {
        Object.keys(presets)
            .forEach(presetName => {
                const li = document.createElement('li');
                li.classList.add('preset-item');
                
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-bingo-card', 'item-icon');
                li.appendChild(icon);
                
                const name = document.createElement('span');
                name.classList.add('item-name');
                name.textContent = presetName;
                li.appendChild(name);
                
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
                deleteButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    deletePreset(presetName);
                });
                li.appendChild(deleteButton);
                
                li.addEventListener('click', () => {
                    loadPreset(presetName);
                    closeModal('modal');
                });
                presetList.appendChild(li);
            });
    }
    
    // Adicione o evento de input para o campo de pesquisa
    searchInput.addEventListener('input', filterPresets);
    showModal('modal');
};



const updateViewPresetsButtonState = () => {
    const presets = JSON.parse(localStorage.getItem('bingoPresets'));
    const hasPresets = presets && Object.keys(presets)
        .length > 0;
    viewPresetsButton.disabled = !hasPresets; // Desativa o botão se não houver presets
    viewPresetsButton.classList.toggle('disabled', !hasPresets);
    viewPresetsButton.classList.toggle('green', hasPresets);
};

const updateDownloadButtonState = () => {
    const presets = JSON.parse(localStorage.getItem('bingoPresets'));
    const hasPresets = presets && Object.keys(presets)
        .length > 0;
    downloadButton.disabled = !hasPresets; // Desativa o botão se não houver presets
    downloadButton.classList.toggle('disabled', !hasPresets);
    downloadButton.classList.toggle('green', hasPresets);
    
    // Atualize o estado do botão "Ver Presets"
    updateViewPresetsButtonState();
};

const updateSaveButtonState = () => {
    const tableTitleElement = document.getElementById('table-title');
    const hasTitle = tableTitleElement.textContent.trim() !== '' && tableTitleElement.textContent.trim() !== 'Título do Bingo';
    const bingoGrid = document.getElementById('bingo-grid');
    const cells = bingoGrid.querySelectorAll('.celula');
    const anyNonEmptyCells = Array.from(cells)
        .some(cell => cell.textContent.trim() !== '');
    
    // Verifica se há título e pelo menos uma célula não vazia
    const canSave = hasTitle && anyNonEmptyCells;
    
    saveButton.disabled = !canSave; // Desativa o botão se não houver condições para salvar
    saveButton.classList.toggle('disabled', !canSave);
    saveButton.classList.toggle('green', canSave);
};




const updateTableTitle = (title) => {
    const tableTitle = document.getElementById('table-title');
    tableTitle.textContent = title || 'Título do Bingo'; // Define o título ou um padrão
};


const updateTitleInput = (title) => {
    const titleInput = document.getElementById('table-title-input');
    titleInput.value = title || ''; // Atualiza o valor do input
    
};
const setupTitleFunctions = () => {
    const tableTitle = document.getElementById('table-title');
    
    // Limpar o campo ao focar nele
    tableTitle.addEventListener('focus', (event) => {
        if (tableTitle.textContent === 'Título do Bingo') {
            tableTitle.textContent = ''; // Limpa o campo
        }
    });
    
    // Atualizar o título conforme o texto é inserido
    tableTitle.addEventListener('input', () => {
        updateTableTitle(tableTitle.textContent);
        updateSaveButtonState(); // Adiciona a chamada aqui
    });
    
    // Restaurar o título padrão se o campo estiver vazio ao desfocar
    tableTitle.addEventListener('blur', () => {
        if (tableTitle.textContent.trim() === '') {
            updateTableTitle('Título do Bingo');
        }
        updateSaveButtonState(); // Adiciona a chamada aqui
    });
};




const loadPreset = (presetName) => {
    const presets = JSON.parse(localStorage.getItem('bingoPresets'));
    const notes = JSON.parse(localStorage.getItem('bingoNotes'));
    if (presets && presets[presetName]) {
        const texts = presets[presetName];
        const cells = document.querySelectorAll('.celula');
        texts.forEach((text, index) => {
            if (cells[index]) {
                cells[index].textContent = text === '*' ? '' : text; // Substitui asteriscos por campos vazios
            }
        });
        updateTableTitle(presetName); // Atualiza o título com o nome do preset carregado
        
        // Carregar as anotações associadas ao preset
        bingoNotes.value = notes[presetName] || '';
    }
    updateClearButtonState();
};

const loadPresetsFromFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const content = event.target.result;
        const presetSections = content.split(/#\d+/)
            .filter(section => section.trim() !== '');
        
        let presets = JSON.parse(localStorage.getItem('bingoPresets')) || {};
        let notes = JSON.parse(localStorage.getItem('bingoNotes')) || {};
        
        presetSections.forEach((section, index) => {
            const [titleLine, ...lines] = section.trim()
                .split('\n')
                .map(text => text.trim());
            const titleMatch = titleLine.match(/^\((.+)\)$/);
            const title = titleMatch ? titleMatch[1] : `Preset ${index + 1}`;
            
            let texts = [];
            let annotationStarted = false;
            let annotations = [];
            
            lines.forEach(line => {
                if (line.startsWith('|')) {
                    annotationStarted = !annotationStarted; // Alternar flag de anotação
                } else if (annotationStarted) {
                    annotations.push(line);
                } else {
                    texts.push(line === '*' ? '' : line); // Substitui asteriscos por campos vazios
                }
            });
            
            presets[title] = texts;
            notes[title] = annotations.join('\n'); // Salva as anotações
        });
        
        localStorage.setItem('bingoPresets', JSON.stringify(presets));
        localStorage.setItem('bingoNotes', JSON.stringify(notes));
        alert("Presets carregados com sucesso!");
        updateClearButtonState();
        updateDownloadButtonState();
        updateViewPresetsButtonState();
        showPresets();
    };
    reader.readAsText(file);
};


const downloadPresets = () => {
    const presets = JSON.parse(localStorage.getItem('bingoPresets'));
    const notes = JSON.parse(localStorage.getItem('bingoNotes'));
    if (presets) {
        let formattedText = '';
        let presetCount = 1;
        for (const [key, value] of Object.entries(presets)) {
            formattedText += `#${presetCount} (${key})\n`;
            const processedTexts = value.map(text => text.trim() === '' ? '*' : text);
            formattedText += `${processedTexts.join('\n')}\n`;
            
            // Add the notes if available
            if (notes && notes[key]) {
                formattedText += `| ${notes[key].split('\n').join('\n')} |\n`;
            }
            
            formattedText += `\n`;
            presetCount++;
        }
        const blob = new Blob([formattedText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bingo_presets.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else {
        alert("Nenhum preset salvo encontrado.");
    }
};

const setupPresetFunctions = () => {
    const presetFileInput = document.getElementById('preset-file');
    const viewPresetsButton = document.getElementById('view-presets-button');
    
    // Certifique-se de que não há duplicatas
    saveButton.addEventListener('click', () => {
        console.log("Botão Salvar Preset clicado"); // Log para depuração
        savePreset();
    });
    
    presetFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            loadPresetsFromFile(file);
            event.target.value = null;
        }
    });
    
    viewPresetsButton.addEventListener('click', showPresets);
    
    tableTitleElement.addEventListener('input', updateSaveButtonState); // Adiciona a lógica para atualizar o estado do botão em tempo real
    bingoNotes.addEventListener('input', updateSaveButtonState); // Caso as anotações também sejam consideradas
    
    updateViewPresetsButtonState();
    updateSaveButtonState(); // Adiciona a lógica para atualizar o estado do botão "Salvar Preset"
};

const filterPresets = () => {
    const searchInput = document.getElementById('preset-search')
        .value.toLowerCase();
    const presetItems = document.querySelectorAll('.preset-item');
    
    presetItems.forEach(item => {
        const text = item.querySelector('.item-name')
            .textContent.toLowerCase();
        const match = text.includes(searchInput);
        item.style.display = match ? '' : 'none'; // Mostra ou oculta o item com base na pesquisa
    });
};

document.getElementById('preset-search')
    .addEventListener('input', filterPresets);


const updateButtonsState = () => {
    updateViewPresetsButtonState();
    updateDownloadButtonState();
    updateSaveButtonState();
};

// Chamar `updateButtonsState` a cada X milissegundos (por exemplo, 10 segundos)
const intervalTime = 1000; // 10000 milissegundos = 10 segundos
setInterval(updateButtonsState, intervalTime);


document.addEventListener('DOMContentLoaded', () => {
    setupPresetFunctions();
    setupTitleFunctions();
    updateClearButtonState();
    updateDownloadButtonState();
});