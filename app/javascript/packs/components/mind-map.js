import * as d3 from "d3";
import Node from "./node";

export default class MindMap {
  constructor(app, data, index) {
    this.app = app;
    this.data = data;
    this.index = index;
    this.sides = 0;

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

    // Use this.data to construct the MindMap's left/right trees.
    this.lTree = this.tree("l");
    this.rTree = this.tree("r");

    // With tree data constructed, compute layout + draw trees.
    this.lRoot = this.draw("l");
    this.rRoot = this.draw("r");

    window.mindMaps.push(this);
  }

  draw(direction) {
    if (!this.hasChildren(direction)) return;

    const $svg = this.treeSvg(direction);
    const rootNode = d3.hierarchy(this[`${direction}Tree`]);

    // d3.tree().nodeSize([15, 75])(d3.hierarchy(this[`${direction}Tree`]));
    d3.tree().size([this.height, this.width / 2])(rootNode);

    return new Node(this, $svg, rootNode);
  }

  tree(direction) {
    const children = this.data.children.filter((d) => d.position === direction);
    if (children.length > 0) this.sides++;
    return { ...this.data, children: children };
  }

  hasChildren(direction) {
    return this[`${direction}Tree`].children.length > 0;
  }

  treeSvg(direction) {
    return this.$mindMap
      .append("svg")
      .attr("width", this.width / 2)
      .attr("height", this.height)
      .attr("x", this.width / 2)
      .attr("transform", `${direction === "l" ? "scale(-1, 1)" : ""}`)
      .attr("transform-origin", "center");
  }
}
