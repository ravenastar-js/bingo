const toggleNavbarButton = document.getElementById('toggle-navbar');
const navbar = document.getElementById('navbar');

navbar.style.display = 'none';

const toggleNavbar = () => {
    if (navbar.style.display === 'none' || navbar.style.display === '') {
        navbar.style.display = 'flex';
        navbar.style.gap = '10px';
        navbar.style.alignItems = 'center';
        navbar.style.flexWrap = 'wrap';
        toggleNavbarButton.innerHTML = '<i class="fas fa-arrow-down"></i> Ocultar Opções';
    } else {
        navbar.style.display = 'none';
        toggleNavbarButton.innerHTML = '<i class="fas fa-arrow-up"></i> Mostrar Opções';
    }
    updateToggleButtonPosition();
};

const updateToggleButtonPosition = () => {
    toggleNavbarButton.style.bottom = `${navbar.clientHeight + 10}px`;
};

const observer = new MutationObserver(() => {
    updateToggleButtonPosition();
});

const setupNavbarFunctions = () => {
    toggleNavbarButton.addEventListener('click', toggleNavbar);
    observer.observe(navbar, { attributes: true, attributeFilter: ['style'] });
    document.getElementById('grid-rows')
        .addEventListener('change', updateToggleButtonPosition);
    document.getElementById('grid-cols')
        .addEventListener('change', updateToggleButtonPosition);
};

const TNB = document.getElementById('TNB');
const tNavbar = document.getElementById('toggle-navbar');
const tNotes = document.getElementById('view-notes-button');

TNB.addEventListener('click', () => {
    if (toggleNavbarButton.style.display === 'none') {
        tNotes.style.display = '';
        toggleNavbarButton.style.display = '';
        TNB.innerHTML = '<i class="fas fa-toggle-on"></i>';
        return;
    } else if (tNavbar.style.display === '' || tNotes.style.display === '') {
        tNotes.style.display = 'none';
        toggleNavbarButton.style.display = 'none';
        TNB.innerHTML = '<i class="fas fa-toggle-off"></i>';
        return;
    } else {
        tNotes.style.display = '';
        toggleNavbarButton.style.display = '';
        TNB.innerHTML = '<i class="fas fa-toggle-on"></i>';
        return;
    }
});


document.addEventListener('DOMContentLoaded', () => {
    setupNavbarFunctions();
});