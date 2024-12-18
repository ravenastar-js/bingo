document.addEventListener('DOMContentLoaded', () => {
    setupGridFunctions();
    setupPresetFunctions();
    setupButtonFunctions();
    setupNavbarFunctions();
    setupTitleFunctions();
    updateButtonStates();
});

const updateButtonStates = () => {
    updateClearButtonState();
    updateDownloadButtonState();
};
