import { tickStep } from "d3";

export default class Label {
  constructor(side, x, y, data) {
    this.side = side;
    this.x = x;
    this.y = y;
    this.data = data;
    this.label = data.label.join(" ");
    this.sidePadding = 10;

    this.draw();
  }

  draw() {
    this.$label = this.side.$side
      .append("text")
      .attr("x", this.x + this.sidePadding)
      .attr("y", this.y)
      .text(this.label);

    if (this.side.side === "l") {
      this.$label = this.$label
        .attr("x", -(this.x + this.sidePadding + this.getWidth()))
        .attr("transform", "scale(-1, 1)");
    }

    this.$label = this.$label.attr("y", this.y + this.getHeight() / 4);
  }

  getWidth() {
    if (!this.$label) return 0;

    return this.getBoundingClientRect().width;
  }

  getHeight() {
    if (!this.$label) return 0;

    return this.getBoundingClientRect().height;
  }

  getBoundingClientRect() {
    return this.$label.node().getBoundingClientRect();
  }
}
