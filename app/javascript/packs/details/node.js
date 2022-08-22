import BaseDetails from "./base";

export default class NodeDetails extends BaseDetails {
  constructor(app) {
    super(app, "node-details");

    this.$fromLinks = this.$el.querySelector(".from-links");
    this.$toLinks = this.$el.querySelector(".to-links");
  }

  show(node) {
    const data = node.data.data;

    this.setTitle(data.label);
    this.setColour(data.colour);

    this.setFromLinks(node);
    this.setToLinks(node);

    super.show();
  }

  setFromLinks(node) {
    this.setLinksTitle(this.$fromLinks, false, node.fromLinks);
    this.setLinksList(this.$fromLinks, false, node.fromLinks);
  }

  setToLinks(node) {
    this.setLinksTitle(this.$toLinks, true, node.toLinks);
    this.setLinksList(this.$toLinks, true, node.toLinks);
  }

  setLinksTitle($el, isSource, links) {
    const $title = $el.querySelector(".title");
    $title.innerHTML = `This node is the ${isSource ? "source" : "target"} of ${links.length} link${links.length === 1 ? "" : "s"}.`
  }

  setLinksList($el, isSource, links) {
    const $list = $el.querySelector(".list");
    [...$list.children].forEach(child => child.remove());

    links.forEach(link => {
      const $listItem = document.createElement("li");
      const linkLabel = link.data.label;
      let sourceLabel = link.fromNode.data.data.label;
      let targetLabel = link.toNode.data.data.label;

      if (isSource) {
        sourceLabel = `<strong>${sourceLabel}</strong>`
      } else {
        targetLabel = `<strong>${targetLabel}</strong>`
      }

      $listItem.innerHTML = `${sourceLabel} ${BaseDetails.RIGHT_ARROW} ${linkLabel} ${BaseDetails.RIGHT_ARROW} ${targetLabel}`;

      $list.append($listItem);
    })
  }
}
