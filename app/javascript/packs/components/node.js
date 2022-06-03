import * as d3 from "d3";
import Branch from "./branch";
import NodeLabel from "./node-label";

export default class Node {
  constructor(mindMap, side, data) {
    this.mindMap = mindMap;
    this.side = side;
    this.data = data;

    if (this.hasChildren()) {
      this.children = this.data.children.map(
        (data) => new Node(mindMap, side, data)
      );

      const links = this.data.links().filter((l) => l.source === this.data);
      this.branches = links.map((data) => new Branch(this, data));
    } else {
      this.children = [];
      this.branches = [];
    }

    window.nodes.push(this);
  }

  draw() {
    if (this.data.depth > 0 || this.side.side !== "r") return;

    this.$label = new NodeLabel(
      this.side,
      0,
      this.mindMap.app.getHeight(),
      this.data.data
    );
  }

  hasChildren() {
    return !!this.data.children;
  }
}
