// Setup input listeners
inputEl.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const cmd = inputEl.value;
        if (cmd) {
            logCommand(cmd);
            handleCommand(cmd);
            inputEl.value = "";
        }
    }
});

// Setup specific command overrides
window.useInventoryItem = useInventoryItem;
window.selectClass = selectClass;
window.setLanguage = setLanguage;

// Start Game
initDungeon();
const savedLang = localStorage.getItem("moc_lang");
if (savedLang) {
    setLanguage(savedLang);
} else {
    renderBootArt();
    updateUI();
}
