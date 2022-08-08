export default class ContextMenu {
    constructor(app) {
        this.app = app;
        this.menu = document.getElementById("contextMenu");

        this.app.$svg.on("click", () => this.hide());

        document.oncontextmenu = (e) => this.onRightClick(e);
    }

    onRightClick(e) {
        e.preventDefault();
        const targetClasses = [...e.target.classList];

        if (!targetClasses.includes("hidden") && 
            (targetClasses.includes("label") || 
            targetClasses.includes("node-label") || 
            targetClasses.includes("link-label"))) {
            this.menu.style.top = `${e.clientY}px`;
            this.menu.style.left = `${e.clientX}px`;
            this.menu.classList.remove("hidden");
            this.menu.focus();
        } else {
            this.hide();
        }
    }

    hide() {
        this.menu.classList.add("hidden")
    }
}