import * as d3 from "d3";
import Branch from "./branch";

export default class Node {
  constructor(mindMap, $svg, data) {
    this.mindMap = mindMap;
    this.$svg = $svg;
    this.data = data;

    this.hasChildren = !!this.data.children;

    if (this.hasChildren) {
      this.children = this.data.children.map(
        (data) => new Node(mindMap, $svg, data)
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
