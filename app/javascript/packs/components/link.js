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

    console.log(this.fromBranch.target);
    console.log(this.toBranch.target);

    const fromBranch = this.fromBranch.$branch.node().getBoundingClientRect();
    const toBranch = this.toBranch.$branch.node().getBoundingClientRect();

    this.data = {
      source: {
        x: fromBranch.x + fromBranch.width,
        y: fromBranch.y,
      },
      target: {
        x: toBranch.x,
        y: toBranch.y,
      },
    };

    this.draw();
  }

  draw() {
    console.log(this.data);
    const colour = this.colour || this.defaultColour;

    console.log(`url(#arrowhead-${colour.replace("#", "")})`);

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
