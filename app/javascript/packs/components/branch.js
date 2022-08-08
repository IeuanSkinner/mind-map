import * as d3 from "d3";
import Label from "./label";
import NodeLabel from "./node-label";

export default class Branch {
  constructor(sourceNode, data) {
    this.sourceNode = sourceNode;
    this.side = this.sourceNode.side;
    this.mindMap = this.sourceNode.mindMap;
    this.data = data;
    this.source = data.source;
    this.target = data.target;
    this.sourceId = this.source.data.id;
    this.targetId = this.target.data.id;
    this.id = `branch_${this.sourceId}_${this.targetId}`;
    this.colour = this.target.data.colour || "#000000";
    this.fromLinks = [];
    this.toLinks = [];
    this.linksHidden = true;

    this.draw();
    this.label();

    window.branches.push(this);
  }

  draw() {
    this.$branch = this.side.$side
      .selectAll(null)
      .data([this.data])
      .join("path")
      .attr("id", this.id)
      .attr("fill", "none")
      .attr("stroke", this.colour)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.y)
          .y((d) => (!d.depth ? this.side.getMidPoint() : d.x))
      );
  }

  label() {
    const data = this.target.data;

    if (this.target.children) {
      this.label = new NodeLabel(this, this.target.y, this.target.x, data);
    } else {
      this.label = new Label(this, this.target.y, this.target.x, data);
    }
  }

  toggleLink(links) {
    links.forEach((link) => {
      if (link.hidden) {
        link.show();
      } else {
        link.hide();
      }
    });
  }

  toggleLinks() {
    this.linksHidden = !this.linksHidden;

    this.toggleLink(this.toLinks);
  }
}
