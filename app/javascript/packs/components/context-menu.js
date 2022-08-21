export default class ContextMenu {
  constructor(app) {
    this.app = app;
    this.menu = document.getElementById("contextMenu");
    this.list = this.menu.querySelector("ul");

    this.app.$el.on("click", () => this.close());

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
      this.close();
    }
  }

  buildMenu(target) {
    this.clearMenu();

    const targetClasses = [...target.classList];
    const id = target.getAttribute("id");

    // Node
    if (targetClasses.includes("node-label") || targetClasses.includes("label")) {
      const node = this.app.nodes.find(node => node.id === id);
      node.buildMenu();
    // Link
    } else if (targetClasses.includes("link-label")) {
      const link = this.app.links.find(link => link.id === id);
      link.buildMenu();
    } else {
      console.error("Unknown target", target)
    }
  }

  add(icon, text, action) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "list-group-item-action");
    listItem.innerHTML = `<i class="fa fa-${icon}"></i> ${text}`;
    listItem.addEventListener("click", () => {
      action.call();
      this.close();
    });

    this.list.append(listItem);
  }

  close() {
    this.clearMenu();
    this.menu.classList.add("hidden");
  }

  clearMenu() {
    [...this.list.children].forEach(child => child.remove());
  }
}