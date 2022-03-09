import * as d3 from "d3";

export default class Branch {
  constructor(sourceNode, data) {
    this.sourceNode = sourceNode;
    this.$svg = this.sourceNode.$svg;
    this.data = data;
    this.midPoint = this.sourceNode.mindMap.height / 2;

    this.defaultColour = "#000";
    this.colour = this.data.target.data.colour;

    this.draw();

    window.branches.push(this);
  }

  draw() {
    this.$branch = this.$svg
      .selectAll("svg")
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
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => (!d.depth ? this.midPoint : d.x))
      );
  }
}
