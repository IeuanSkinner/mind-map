import * as d3 from "d3";

// From-Branch >> Link >> To-Branch

export default class Link {
  constructor(app, data) {
    this.app = app;
    this.fromBranchId = data.from_branch_id;
    this.toBranchId = data.to_branch_id;
    this.id = `link_${this.fromBranchId}_${this.toBranchId}`;
    this.label = data.label;
    this.colour = data.colour || "#000000";

    this.fromBranch = window.branches.find(
      (branch) => branch.targetId === this.fromBranchId
    );
    this.toBranch = window.branches.find(
      (branch) => branch.targetId === this.toBranchId
    );

    this.fromBranch.toLinks.push(this);
    this.toBranch.fromLinks.push(this);

    const fromPosition = this.fromBranch.label.linkPosition(
      this.toBranch.label
    );
    const toPosition = this.toBranch.label.linkPosition(this.fromBranch.label);

    this.data = {
      source: fromPosition,
      target: toPosition,
    };

    this.draw();
  }

  draw() {
    const colour = this.colour || this.defaultColour;

    this.$link = this.app.$links
      .selectAll(null)
      .data([this.data])
      .join("path")
      .attr("id", this.id)
      .attr("fill", "none")
      .attr("stroke", colour)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr("marker-end", `url(#arrowhead-${colour.replace("#", "")})`)
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.x)
          .y((d) => d.y)
      );
  }
}
