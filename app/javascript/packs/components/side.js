import * as d3 from "d3";
import Node from "./node";

export default class Side {
  constructor(mindMap, data, side) {
    this.mindMap = mindMap;
    this.app = this.mindMap.app;
    this.data = {
      ...data,
      children: data.children.filter((d) => d.position === side),
    };
    this.side = side;

    if (this.hasChildren()) {
      this.draw();
    }
  }

  draw() {
    this.$side = this.mindMap.$mindMap.append("g");

    this.$side.attr("transform", `${this.side === "l" ? "scale(-1, 1)" : ""}`);

    const hierarchy = d3.hierarchy(this.data);
    d3.tree().size([this.app.height, this.app.sideWidth])(hierarchy);
    this.root = new Node(this.mindMap, this.$side, hierarchy);
  }

  hasChildren() {
    return this.data.children.length > 0;
  }

  getWidth() {
    if (!this.$side) return 0;

    return Math.ceil(this.getBoundingClientRect().width);
  }

  getHeight() {
    if (!this.$side) return 0;

    return Math.ceil(this.getBoundingClientRect().height);
  }

  getBoundingClientRect() {
    return this.$side.node().getBoundingClientRect();
  }
}
