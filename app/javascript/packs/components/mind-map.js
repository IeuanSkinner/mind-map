import * as d3 from "d3";

export default class MindMap {
  constructor(
    $svg,
    data,
    i /* shouldn't need i soon enough... */,
    dx = 15,
    dy = 75
  ) {
    this.$svg = $svg;
    this.data = data;
    this.dx = dx;
    this.dy = dy;
    this.mind_map = this.$svg
      .append("g")
      .attr("transform", `translate(${(i - 1) * 750}, 0)`);

    this.build("l");
    this.build("r");
  }

  build(position) {
    this.hierarchy(position);
    this.layout(position);
    this.draw_branches(position);
  }

  tree(position) {
    return {
      ...this.data,
      children: this.data.children.filter((d) => d.position === position),
    };
  }

  hierarchy(position) {
    this[`${position}_tree`] = this.tree(position);
    this[`${position}_hierarchy`] = d3.hierarchy(this[`${position}_tree`]);
  }

  layout(position) {
    d3.tree().nodeSize([this.dx, this.dy])(this[`${position}_hierarchy`]);
  }

  draw_branches(position) {
    this.branch_config()
      .selectAll("g")
      .data(this[`${position}_hierarchy`].links())
      .join("path")
      .attr("stroke", (d) => d.target.data.colour)
      .attr(
        "d",
        d3
          .linkHorizontal()
          .x((d) => (position === "l" ? -d.y : d.y))
          .y((d) => d.x)
      );
  }

  branch_config() {
    return this.mind_map
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2);
  }
}
