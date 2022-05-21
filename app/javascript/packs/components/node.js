import * as d3 from "d3";
import Branch from "./branch";

export default class Node {
  constructor(mindMap, $side, data) {
    this.mindMap = mindMap;
    this.$side = $side;
    this.data = data;

    this.hasChildren = !!this.data.children;

    if (this.hasChildren) {
      this.children = this.data.children.map(
        (data) => new Node(mindMap, $side, data)
      );

      const links = this.data.links().filter((l) => l.source === this.data);
      this.branches = links.map((data) => new Branch(this, data));
    } else {
      this.children = [];
      this.branches = [];
    }

    window.nodes.push(this);
  }
}
