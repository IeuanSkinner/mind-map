import * as d3 from "d3";

export default class MindMap {
  constructor(app, data, index) {
    this.app = app;
    this.data = data;
    this.index = index;
    this.sides = 0;
    // Use this.data to construct the MindMap's left/right trees.
    this.tree("l");
    this.tree("r");

    this.priorMindMap = index > 0 ? this.app.mindMaps[index - 1] : null;
    this.x = this.priorMindMap
      ? this.priorMindMap.x + this.priorMindMap.width + this.app.gap
      : 0;
    this.width = this.app.maxWidth;
    this.height = this.app.height;

    this.$mindMap = this.app.$svg
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("x", this.x);

    this.draw("l");
    this.draw("r");
  }

  draw(position) {
    if (!this.hasChildren(position)) return;

    this.hierarchy(position);
    this.layout(position);
    this.branchSvg(position);
    this.drawBranches(position);
  }

  tree(position) {
    const children = this.data.children.filter((d) => d.position === position);
    this[`${position}Tree`] = {
      ...this.data,
      children: children,
    };
    if (children.length > 0) this.sides++;
  }

  hasChildren(position) {
    return this[`${position}Tree`].children.length > 0;
  }

  hierarchy(position) {
    this[`${position}Hierarchy`] = d3.hierarchy(this[`${position}Tree`]);
  }

  layout(position) {
    // d3.tree().nodeSize([15, 75])(this[`${position}Hierarchy`]);
    d3.tree().size([this.height, this.width / 2])(this[`${position}Hierarchy`]);
  }

  drawBranches(position) {
    this[`$${position}BranchSvg`]
      .selectAll("g")
      .data(this[`${position}Hierarchy`].links())
      .join("path")
      .attr("stroke", (d) => d.target.data.colour)
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => (position === "l" ? d.y : d.y))
          .y((d) => (!d.depth ? this.height / 2 : d.x)) // Always place the root node at half screen-height.
      );
  }

  branchSvg(position) {
    this[`$${position}BranchSvg`] = this.$mindMap
      .append("svg")
      .attr("width", this.width / 2)
      .attr("height", this.height)
      .attr("x", this.width / 2)
      .attr("transform", `${position === "l" ? "scale(-1, 1)" : ""}`)
      .attr("transform-origin", "center")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2);
  }

  addGridPoint(position, x, y) {
    this[`$${position}BranchSvg`]
      .append("circle")
      .attr("r", 1)
      .attr("cx", x)
      .attr("cy", y);
  }

  drawGrid() {
    for (let i = 0; i < this.width; i = i + 10) {
      for (let j = 0; j < this.height; j = j + 10) {
        this.addGridPoint("l", i, j);
        this.addGridPoint("r", i, j);
      }
    }
  }
}
