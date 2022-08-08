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
    d3
      .tree()
      .size([this.getAppHeight(), this.app.sideWidth * hierarchy.height])(
      hierarchy
    );
    this.root = new Node(this, hierarchy, null);
  }

  hasChildren() {
    return !!this.data.children;
  }

  getWidth() {
    if (!this.$side) return 0;

    return Math.ceil(this.getBoundingClientRect().width);
  }

  getHeight() {
    if (!this.$side) return 0;

    return Math.ceil(this.getBoundingClientRect().height);
  }

  getAppHeight() {
    return 2000; // this.app.getHeight() * 3 // Is it possible to calculate this given the number of leaf nodes in a given side?
  }

  getMidPoint() {
    console.log(this.getAppHeight());
    return this.getAppHeight() / 2;
  }

  getBoundingClientRect() {
    return this.$side.node().getBoundingClientRect();
  }
}
