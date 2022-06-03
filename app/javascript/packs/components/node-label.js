export default class NodeLabel {
  constructor(side, x, y, data) {
    this.side = side;
    this.data = data;
    this.label = data.label;

    // TODO: Calculate more accurately?
    this.width = 150;
    if (this.label.length > 1) console.log(this.label);

    this.height = this.label.length * 25;
    this.rx = 5;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
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
      .html(`<div class="node-label">${this.label.join(" ")}</div>`);

    if (this.side.side === "l") {
      this.$text = this.$text
        .attr("x", -(this.x + this.width))
        .attr("transform", "scale(-1, 1)");
    }
  }
}
