class ActionMenu {
    constructor() {
        this.$actionMenu = document.getElementById("action-menu");
        this.$motivationBtn = this.$actionMenu.querySelector("#motivation-btn");

        this.addListeners();
    }

    addListeners() {
        this.$motivationBtn.addEventListener("click", () => window.motivationsModal.show());
    }
}

window.actionMenu = new ActionMenu();
