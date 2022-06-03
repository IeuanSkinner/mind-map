import * as d3 from "d3";
import NodeLabel from "./node-label";

export default class Branch {
  constructor(sourceNode, data) {
    this.sourceNode = sourceNode;
    this.side = this.sourceNode.side;
    this.data = data;
    this.id = `branch_${data.source.data.id}_${data.target.data.id}`;
    this.midPoint = this.sourceNode.mindMap.app.getHeight();

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
      .attr("id", this.id)
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

  label() {
    const target = this.data.target;
    const data = target.data;

    if (target.children) {
      this.$label = new NodeLabel(this.side, target.y, target.x, data);
    } else {
      const labelPadding = 10;

      this.$label = this.side.$side
        .append("text")
        .attr("y", target.x)
        .text(data.label.join(" "));

      console.log(data.label);

      if (this.side.side === "l") {
        this.$label = this.$label
          .attr("x", -(target.y + this.getLabelWidth() + labelPadding))
          .attr("transform", "scale(-1, 1)");
      } else {
        this.$label = this.$label.attr("x", target.y + labelPadding);
      }
    }
  }

  getLabelWidth() {
    const $label = this.$label.node();

    if (!$label) return 0;

    const labelBoundingClientRect = $label.getBoundingClientRect();

    return labelBoundingClientRect.width;
  }
}
