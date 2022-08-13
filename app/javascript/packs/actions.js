class ActionMenu {
    constructor() {
        this.$actionMenu = document.getElementById("action-menu");
        this.$motivationsBtn = this.$actionMenu.querySelector("#motivations-btn");
        this.$instructionsBtn = this.$actionMenu.querySelector("#instructions-btn")

        this.addListeners();
    }

    addListeners() {
        this.$motivationsBtn.addEventListener("click", () => window.motivationsModal.show());
        this.$instructionsBtn.addEventListener("click", () => window.instructionsModal.show());
    }
}

window.actionMenu = new ActionMenu();
