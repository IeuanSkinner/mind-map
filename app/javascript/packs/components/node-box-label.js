import Node from "./node";
import NodeLabel from "./node-label";
import HideableComponent from "./hideable-component";

export default class NodeBoxLabel extends NodeLabel {
  static WIDTH = 175;
  static BORDER_RADIUS = 5;
  static BORDER_WIDTH = 3;
  static FILL = "#FFFFFF";
  static SIDE_PADDING = 15;
  static BOX_PADDING = 10;

  constructor(node, x, y, data) {
    super(node, x, y, data);
    this.x = this.x - NodeBoxLabel.WIDTH / 2;
    this.height = 0;

    this.draw();
  }

  draw() {
    this.$el = this.node.side.$el.append("g");

    this.$shape = this.$el
      .append("rect")
      .attr("width", NodeBoxLabel.WIDTH)
      .attr("height", this.height)
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("rx", NodeBoxLabel.BORDER_RADIUS)
      .attr("stroke", this.data.colour || Node.DEFAULT_COLOUR)
      .attr("stroke-width", NodeBoxLabel.BORDER_WIDTH)
      .attr("fill", NodeBoxLabel.FILL);

    this.$text = this.$el
      .append("foreignObject")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", NodeBoxLabel.WIDTH)
      .attr("height", this.height)
      .html(`<div id="${this.node.id}" class="node-label">${this.data.label}</div>`)

    this.$html = document.querySelector(`#${this.node.id}`);

    if (this.node.side.isLeft()) {
      this.$text = this.$text
        .attr("x", -(this.x + NodeBoxLabel.WIDTH))
        .attr("transform", "scale(-1, 1)");
    }

    while (this.hasYScroll()) this.setHeight(1);
    this.setHeight(NodeBoxLabel.BOX_PADDING);
    this.positionY();

    super.addClickListener();
  }

  setHeight(add) {
    this.height += add;

    this.$shape.attr("height", this.height);
    this.$text.attr("height", this.height);
  }

  positionY() {
    const y = this.y - this.height / 2;

    this.$shape.attr("y", y);
    this.$text.attr("y", y);
  }

  hasYScroll() {
    return this.$html.scrollHeight > this.height;
  }

  xOffset(onLeftSide) {
    return onLeftSide ? -NodeBoxLabel.SIDE_PADDING : this.getWidth();
  }

  erase() {
    this.height = 0;
    this.$html = null;
    super.erase();
  }

  onCtrlClick(e) {
    if (this.node.isRoot()) return;

    super.onCtrlClick();
  }

  onShiftClick(e) {
    const node = this.node;
    const mindMap = this.node.side.mindMap;

    if (node.isRoot()) {
      mindMap.hasHiddenChildren() ? mindMap.showChildren(e.ctrlKey) : mindMap.hideChildren();
    } else {
      node.hasHidden(node.children) ? node.showChildren(e.ctrlKey) : node.hideChildren();
    }
  }

  setActive() {
    if (!this.$el) return;
    
    this.$shape = this.$shape.attr("stroke", HideableComponent.ACTIVE_COLOUR);
    this.$html.classList.add("active");
  }

  setInactive() {
    if (!this.$html) return;

    this.$shape = this.$shape.attr("stroke", this.data.colour || Node.DEFAULT_COLOUR);
    this.$html.classList.remove("active");
  }
}
