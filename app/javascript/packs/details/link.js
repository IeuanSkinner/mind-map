import BaseDetails from "./base";

export default class LinkDetails extends BaseDetails {
  constructor(app) {
    super(app, "link-details");

    this.$sourceNode = this.$el.querySelector(".source-node");
    this.$targetNode = this.$el.querySelector(".target-node");
    this.$list = this.$el.querySelector(".list ul");

    this.$el.addEventListener("shown.bs.offcanvas", () => {
      window.actionMenu.setStyle("margin-right", `${super.getWidth() + 15}px`);
    });

    this.$el.addEventListener("hidden.bs.offcanvas", () => { 
      app.links.forEach(link => link.setInactive());
      window.actionMenu.setStyle("margin-right", "15px");
    });
  }

  show(link) {
    // Set all links to inactive.
    this.app.links.forEach(link => link.setInactive());
    // Set this link to active.
    link.setActive();

    const data = link.data;

    this.setTitle(data.label);
    this.setColour(data.colour);

    this.setNode(this.$sourceNode, true, link.fromNode);
    this.setNode(this.$targetNode, false, link.toNode);
    
    this.addListeners("node");

    this.setList(link);

    super.show();
  }

  setNode($node, isSource, node) {
    const label = this.buildLink("node", node.id, node.label.data.label);

    $node.innerHTML = `The <strong>${isSource ? "source" : "target"}</strong> of this link is ${label}.`;
  }

  setList(link) {
    const data = link.data;

    [...this.$list.children].forEach(child => child.remove());

    data.label.split(";").forEach(concept => {
      const $listItem = document.createElement("li");
      $listItem.innerHTML = concept;

      this.$list.append($listItem);
    })
  }
}
