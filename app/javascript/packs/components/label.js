export default class Label {
  constructor(branch, x, y, data) {
    this.id = `label_${data.id}`;
    this.type = "Label";
    this.branch = branch;
    this.side = branch.side;
    this.app = this.side.app;
    this.x = x;
    this.y = y;
    this.data = data;
    this.label = data.label;
    this.sidePadding = 10;

    this.draw();
  }

  draw() {
    this.$label = this.side.$side
      .append("text")
      .attr("id", this.id)
      .attr("class", "label")
      .attr("x", this.x + this.sidePadding)
      .attr("y", this.y)
      .text(this.label);

    if (this.side.side === "l") {
      this.$label = this.$label
        .attr("x", -(this.x + this.sidePadding + this.getWidth()))
        .attr("transform", "scale(-1, 1)");
    }

    this.$label = this.$label
      .attr("y", this.y + this.getHeight() / 4)
      .on("click", () => this.branch.toggleLinks());
  }

  position(leftSide) {
    return {
      x: leftSide
        ? this.getX() - this.sidePadding * 2
        : this.getX() + this.getWidth(),
      y: this.y,
    };
  }

  getX() {
    return this.getBoundingClientRect().x;
  }

  getWidth() {
    if (!this.$label) return 0;

    return Math.ceil(this.getBoundingClientRect().width);
  }

  getHeight() {
    if (!this.$label) return 0;

    return Math.ceil(this.getBoundingClientRect().height);
  }

  getBoundingClientRect() {
    return this.$label.node().getBoundingClientRect();
  }
}
