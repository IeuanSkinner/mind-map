export default class ContextMenu {
    constructor(app) {
        this.app = app;
        this.menu = document.getElementById("contextMenu");
        this.list = this.menu.querySelector("ul");

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
            this.buildMenu(e.target);

            this.menu.style.top = `${e.clientY}px`;
            this.menu.style.left = `${e.clientX}px`;
            this.menu.classList.remove("hidden");
            this.menu.focus();
        } else {
            this.hide();
        }
    }

    buildMenu(target) {
        this.clearMenu();

        const targetClasses = [...target.classList];
        const id = target.getAttribute("id");

        // Node
        if (targetClasses.includes("node-label") || targetClasses.includes("label")) {
            const node = window.branches.find(branch => branch.label.id === id).sourceNode;

            node.contextMenuActions.forEach(action => {
                const listItem = document.createElement('li');
                listItem.classList.add("list-group-item", "list-group-item-action");
                listItem.innerHTML = `<i class="fa fa-${action.icon}"></i> ${action.name}`;
                listItem.addEventListener("click", action.action);

                this.list.append(listItem);
            })
        // Link
        } else if (targetClasses.includes("link-lable")) {

        } else {
            console.error("Unknown target", target)
        }
    }

    clearMenu() {
        [...this.list.children].forEach(child => child.remove());
    }

    hide() {
        this.menu.classList.add("hidden")
    }
}