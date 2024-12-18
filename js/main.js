document.addEventListener('DOMContentLoaded', () => {
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
