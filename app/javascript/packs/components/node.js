import Branch from "./branch";
import NodeLabel from "./node-label";

export default class Node {
  constructor(mindMap, side, data) {
    this.mindMap = mindMap;
    this.side = side;
    this.data = data;
    this.children = [];
    this.branches = [];
    this.fromLinks = [];
    this.toLinks = [];

    this.contextMenuActions = [
      { name: "Hide", action: this.hide, icon: "eye-slash" }, 
      { name: "Show From Links", action: this.showFromLinks, icon: "arrow-left" }, 
      { name: "Show To Links", action: this.showToLinks, icon: "arrow-right" }
    ];
    
    if (this.hasChildren()) {
      this.children = this.data.children.map(
        (data) => new Node(mindMap, side, data)
      );

      const links = this.data.links().filter((l) => l.source === this.data);
      this.branches = links.map((data) => new Branch(this, data));
    }
    this.label();

    window.nodes.push(this);
  }

  label() {
    if (this.data.depth > 0 || this.side.side !== "r") return;

    this.$label = new NodeLabel(
      this,
      0,
      this.side.getMidPoint(),
      this.data.data
    );
  }

  hasChildren() {
    return !!this.data.children;
  }
}
