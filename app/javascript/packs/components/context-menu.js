export default class ContextMenu {
    constructor(app) {
        this.app = app;
        this.menu = document.getElementById("contextMenu");

        // this.app.$svg.addEventListener("click", () => this.hide());

        document.oncontextmenu = (e) => this.onRightClick(e);
    }

    onRightClick(e) {
        e.preventDefault();

        console.log("here");

        this.menu.classList.remove("hidden");
        this.menu.focus();
    }

    hide() {
        this.menu.classList.add("hidden")
    }
}