const showModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    modal.style.display = 'flex';
    setTimeout(() => {
        modalContent.classList.add('show');
    }, 10);
};

const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
};

document.querySelectorAll('.close-button')
    .forEach(button => {
        button.addEventListener('click', (event) => {
            const modalId = button.closest('.modal')
                .id;
            closeModal(modalId);
        });
    });

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('view-presets-button')
        .addEventListener('click', () => showModal('modal'));
    document.getElementById('view-notes-button')
        .addEventListener('click', () => showModal('notes-modal'));
});

const notesModal = document.getElementById('notes-modal');
const bingoNotes = document.getElementById('bingo-notes');

const saveNotes = () => {
    const currentPreset = document.getElementById('table-title')
        .textContent.trim();
    let notes = JSON.parse(localStorage.getItem('bingoNotes')) || {};
    notes[currentPreset] = bingoNotes.value;
    localStorage.setItem('bingoNotes', JSON.stringify(notes));
};

const loadNotes = () => {
    const currentPreset = document.getElementById('table-title')
        .textContent.trim();
    let notes = JSON.parse(localStorage.getItem('bingoNotes')) || {};
    bingoNotes.value = notes[currentPreset] || '';
};

document.getElementById('view-notes-button')
    .addEventListener('click', () => {
        loadNotes();
        showModal('notes-modal');
    });

bingoNotes.addEventListener('input', saveNotes);

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal(event.target.id);
    }
});
