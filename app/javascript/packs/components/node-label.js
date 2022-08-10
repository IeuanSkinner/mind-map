import Node from "./node";
import Component from "./component";

export default class NodeLabel extends Component {
  static WIDTH = 175;
  static BORDER_RADIUS = 5;
  static BORDER_WIDTH = 3;
  static FILL = "#FFFFFF";
  static SIDE_PADDING = 15;
  static BOX_PADDING = 10;

  constructor(node, x, y, data) {
    super(node.side.$el.append("g"));
    this.node = node;
    this.data = data;
    this.type = "NodeLabel";
    this.height = 0;
    this.x = x - NodeLabel.WIDTH / 2;
    this.y = y;

    if (data.id === "node_1") {
      console.log("HERE");
    }

    this.draw();
  }

  draw() {
    this.$shape = this.$el
      .append("rect")
      .attr("width", NodeLabel.WIDTH)
      .attr("height", this.height)
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("rx", NodeLabel.BORDER_RADIUS)
      .attr("stroke", this.data.colour || Node.DEFAULT_COLOUR)
      .attr("stroke-width", NodeLabel.BORDER_WIDTH)
      .attr("fill", NodeLabel.FILL);

    this.$text = this.$el
      .append("foreignObject")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", NodeLabel.WIDTH)
      .attr("height", this.height)
      .html(`<div id="${this.node.id}" class="node-label">${this.data.label}</div>`)

    this.$html = document.querySelector(`#${this.node.id}`);

    if (this.node.side.isLeft()) {
      this.$text = this.$text
        .attr("x", -(this.x + NodeLabel.WIDTH))
        .attr("transform", "scale(-1, 1)");
    }

    while (this.hasYScroll()) this.setHeight(1);
    this.setHeight(NodeLabel.BOX_PADDING);
    this.positionY();
  }

  setHeight(add) {
    this.height += add;

    this.$shape.attr("height", this.height);
    this.$text.attr("height", this.height);
  }

  positionY() {
    this.y = this.y - this.height / 2;

    this.$shape.attr("y", this.y);
    this.$text.attr("y", this.y);
  }

  hasYScroll() {
    return this.$html.scrollHeight > this.height;
  }

  position(onLeftSide) {
    return {
      x: this.getX() + (onLeftSide ? -NodeLabel.SIDE_PADDING : this.getWidth()),
      y: this.y + this.height / 2,
    };
  }
}
