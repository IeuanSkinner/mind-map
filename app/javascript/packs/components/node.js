import * as d3 from "d3";
import Label from "./label";
import NodeLabel from "./node-label";

export default class Node {
  constructor(side, data, parentNode) {
    this.parentNode = parentNode;
    this.id = this.isRoot() ? `${side.mindMap.id}_${side.side}_node_1`: data.id;
    this.side = side;
    this.data = data;

    // Parent relationship
    this.branch = this.isRoot() ? null : this.data.branch;
    this.branchColour = this.isRoot() ? null : this.data.data.colour || "#000000";

    // Child relationship
    this.children = []; // Should be an array of Node.

    // Links
    this.fromLinks = [];
    this.toLinks = [];

    this.contextMenuActions = [
      { name: "Hide", action: this.hide, icon: "eye-slash" }, 
      { name: "Show From Links", action: this.showFromLinks, icon: "arrow-left" }, 
      { name: "Show To Links", action: this.showToLinks, icon: "arrow-right" }
    ];
    
    if (this.hasChildren()) {
      const childBranches = this.data.links().filter((l) => l.source === this.data);

      this.children = this.data.children.map((data, index) => {
        data["id"] = `${this.id}_${index}`;
        data["branch"] = childBranches[index];
        return new Node(side, data, this);
      });
    }

    if (parentNode) {
      this.drawBranch();
    }

    this.label();

    window.nodes.push(this);
  }

  drawBranch() {
    this.$branch = this.side.$side
      .selectAll(null)
      .data([this.branch])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", this.branchColour)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.y)
          .y((d) => (!d.depth ? this.side.getMidPoint() : d.x))
      );
  }

  label() {
    if (this.isRoot() && this.side.side !== "r") return;

    if (this.hasChildren()) {
      this.label = new NodeLabel(this, 
                                 this.isRoot() ? 0 : this.data.y, 
                                 this.isRoot() ? this.side.getMidPoint() : this.data.x, 
                                 this.data.data)
    } else {
      this.label = new Label(this, this.data.y, this.data.x, this.data.data);
    }
  }

  isRoot() {
    return !this.parentNode;
  }

  hasChildren() {
    return !!this.data.children;
  }

  showFromLinks() {
    this.toggleLinks(this.fromLinks);
  }

  showToLinks() {
    this.toggleLinks(this.toLinks);
  }

  toggleLinks(links) {
    links.forEach((link) => {
      if (link.hidden) {
        link.show();
      } else {
        link.hide();
      }
    });
  }
}
