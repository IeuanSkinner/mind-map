export default class NodeLabel {
  constructor(side, x, y, data) {
    this.side = side;
    this.data = data;
    this.label = data.label;
    this.id = `node_label_${data.id}`;
    this.width = 175;
    this.height = 0;
    this.rx = 5;
    this.x = x - this.width / 2;
    this.y = y;
    this.stroke = data.colour || "black";
    this.strokeWidth = 3;
    this.fill = "white";

    this.draw();
  }

  draw() {
    this.$group = this.side.$side.append("g");

    this.$shape = this.$group
      .append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("rx", this.rx)
      .attr("stroke", this.stroke)
      .attr("stroke-width", this.strokeWidth)
      .attr("fill", this.fill);

    this.$text = this.$group
      .append("foreignObject")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", this.width)
      .attr("height", this.height)
      .html(`<div id="${this.id}" class="node-label">${this.label}</div>`);

    this.$html = document.querySelector(`#${this.id}`);

    if (this.side.side === "l") {
      this.$text = this.$text
        .attr("x", -(this.x + this.width))
        .attr("transform", "scale(-1, 1)");
    }

    while (this.hasYScroll()) this.setHeight(1);
    this.setHeight(10); // Padding
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
}
