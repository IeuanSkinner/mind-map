class ActionMenu {
    constructor() {
        this.$actionMenu = document.getElementById("action-menu");
        this.$motivationsBtn = this.$actionMenu.querySelector("#motivations-btn");
        this.$informationBtn = this.$actionMenu.querySelector("#information-btn");
        this.$shortcutsBtn = this.$actionMenu.querySelector("#shortcuts-btn");

        this.addListeners();
    }

    addListeners() {
        this.$motivationsBtn.addEventListener("click", () => window.motivationsModal.show());
        this.$informationBtn.addEventListener("click", () => window.informationModal.show());
        this.$shortcutsBtn.addEventListener("click", () => window.shortcutsModal.show());
    }
}

window.actionMenu = new ActionMenu();
