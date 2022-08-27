import NodeLabel from "./node-label";
import Colour from "../colour";

export default class NodeLeafLabel extends NodeLabel {
  static PADDING = 10;
  static LEFTSIDE = -(NodeLeafLabel.PADDING) * 2
  
  constructor(node, x, y, data) {
    super(node, x, y, data);
    this.initWidth; // Hack

    this.draw();
  }

  draw() {
    this.$el = this.node.side.$el
      .append("text")
      .attr("id", this.node.id)
      .attr("class", "label")
      .attr("x", this.x + NodeLeafLabel.PADDING)
      .attr("y", this.y)
      .text(this.data.label);

    if (!this.initWidth) this.initWidth = this.getWidth();

    if (this.node.side.isLeft()) {
      this.$el = this.$el
        .attr("x", -(this.x + (NodeLeafLabel.PADDING * 2) + this.initWidth))
        .attr("transform", "scale(-1, 1)");
    }

    this.$el = this.$el.attr("y", this.y + this.getHeight() / 4);

    super.addClickListener();
  }

  onCtrlClick() {
    this.node.hide();
  }

  xOffset(onLeftSide) {
    return onLeftSide ? NodeLeafLabel.LEFTSIDE : this.initWidth + NodeLeafLabel.PADDING;
  }

  setActive() {
    if (!this.$el) return;

    this.$el.attr("fill", Colour.ACTIVE);
  }

  setInactive() {
    if (!this.$el) return;

    this.$el.attr("fill", Colour.BLACK);
  }
}
