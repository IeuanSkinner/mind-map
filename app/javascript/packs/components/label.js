import Component from "./component";

export default class Label extends Component {
  static PADDING = 10;
  
  constructor(node, x, y, data) {
    super();
    this.node = node;
    this.x = x;
    this.y = y;
    this.data = data;
    this.type = "Label";

    this.draw();
  }

  draw() {
    this.$el = this.node.side.$el
      .append("text")
      .attr("id", this.node.id)
      .attr("class", "label")
      .attr("x", this.x + Label.PADDING)
      .attr("y", this.y)
      .text(this.data.label);

    if (this.node.side.isLeft()) {
      this.$el = this.$el
        .attr("x", -(this.x + Label.PADDING + this.getWidth()))
        .attr("transform", "scale(-1, 1)");
    }

    this.$el = this.$el.attr("y", this.y + this.getHeight() / 4)
  }

  position(onLeftSide) {
    return {
      x: this.getX() + (onLeftSide ? -(Label.PADDING * 2) : this.getWidth()),
      y: this.y,
    };
  }
}
