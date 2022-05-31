import * as d3 from "d3";

export default class Branch {
  constructor(sourceNode, data) {
    this.sourceNode = sourceNode;
    this.side = this.sourceNode.side;
    this.data = data;
    this.midPoint = this.sourceNode.mindMap.app.getHeight() / 2;

    this.defaultColour = "#000";
    this.colour = this.data.target.data.colour;

    this.draw();

    window.branches.push(this);
  }

  draw() {
    this.$branch = this.side.$side
      .selectAll("g")
      .data([this.data])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", this.colour || this.defaultColour)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.y)
          .y((d) => (!d.depth ? this.midPoint : d.x))
      );
  }
}
