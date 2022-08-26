import BaseDetails from "./base";

export default class NodeDetails extends BaseDetails {
  constructor(app) {
    super(app, "node-details");

    this.$fromLinks = this.$el.querySelector(".from-links");
    this.$toLinks = this.$el.querySelector(".to-links");

    this.$el.addEventListener("shown.bs.offcanvas", () => {
      app.setStyle("margin-left", `${super.getWidth()}px`);
      app.zoom.controls.setStyle("padding-left", `${super.getWidth() + 15}px`); // Found in SASS variables.
    });
    this.$el.addEventListener("hidden.bs.offcanvas", () =>  {
      app.setStyle("margin-left", 0);
      app.zoom.controls.setStyle("padding-left", "15px"); 
      app.nodes.forEach(node => node.setInactive());
    });
  }

  show(node) {
    // Set all nodes to inactive.
    this.app.nodes.forEach(node => node.setInactive());
    // Set this node to active.
    node.setActive();

    const data = node.data.data;

    this.setTitle(data.label);
    this.setColour(data.colour);

    this.setLinks("from", false, node);
    this.setLinks("to", true, node);
  
    this.addListeners("node");
    this.addListeners("link");

    super.show();
  }

  setLinks(type, isSource, node) {
    const label = `${type}Links`;

    this.setLinksTitle(this[`$${label}`], isSource, node[`${label}`]);
    this.setLinksList(this[`$${label}`], isSource, node[`${label}`]);
  }

  setLinksTitle($el, isSource, links) {
    const $title = $el.querySelector(".title");
    $title.innerHTML = `This node is the <strong>${isSource ? "source" : "target"}</strong> of <strong>${links.length}</strong> link${links.length === 1 ? "" : "s"}.`
  }

  setLinksList($el, isSource, links) {
    const $list = $el.querySelector(".list");
    [...$list.children].forEach(child => child.remove());

    links.forEach(link => {
      const $listItem = document.createElement("li");
      const linkLabel = this.buildLink("link", link.id, link.data.label);
      let sourceLabel = link.fromNode.data.data.label;
      let targetLabel = link.toNode.data.data.label;

      if (isSource) {
        sourceLabel = `<strong>${sourceLabel}</strong>`;
        targetLabel = this.buildLink("node", link.toNode.id, targetLabel);
      } else {
        sourceLabel = this.buildLink("node", link.fromNode.id, sourceLabel);
        targetLabel = `<strong>${targetLabel}</strong>`;
      }

      $listItem.innerHTML = `${sourceLabel} ${BaseDetails.RIGHT_ARROW} ${linkLabel} ${BaseDetails.RIGHT_ARROW} ${targetLabel}`;

      $list.append($listItem);
    });
  }
}
